import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, navigate } from '@reach/router';
import useSWR from 'swr';
import useForm from 'react-hook-form';

import useAPI from 'hooks/useAPI';

import Grid from 'styles/Grid';

import InputGroup from 'components/molecules/InputGroup';
import Label from 'components/atoms/Label';
import Heading from 'components/atoms/Heading';
import Checkbox from 'components/atoms/Checkbox';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

const Styled = {
  Form: styled(Grid).attrs({
    as: 'form',
    columns: 9,
  })`
    flex: 1;
    align-self: flex-start;
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
    > * {
      grid-column: 1 / -1;
    }
  `,
  Level: styled.p`
    margin: 8px 0 var(--row-gap);
    font-size: var(--font-size--base);
  `,
  InputGroup: styled(InputGroup)`
    ${({ columns }) => columns && `
      grid-column: span ${columns};
      grid-template-columns: repeat(${columns}, 1fr);
    `}
    display: grid;
    column-gap: var(--column-gap);
    margin-bottom: var(--row-gap);
    white-space: nowrap;
  `,
  Unit: styled.span`
    display: flex;
    grid-row: 2;
    grid-column: 3 / -1;
    align-items: center;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
  `,
  Fee: styled.p`
    grid-row: 3;
    grid-column : 1 / -1;
    color: var(--blue);
  `,
  SubscriptionLimit: styled.label`
    display: flex;
    grid-row: 2;
    align-items: center;
    margin-bottom: 8px;
  `,
  SubmitGroup: styled.div`
    grid-column: 1 / -1;
    padding-top: var(--row-gap);
    border-top: 1px solid var(--gray--light);
  `,
  Submit: styled(PrimaryButton).attrs(() => ({
    as: 'input',
    type: 'submit',
  }))`
    margin-right: 16px;
  `,
};

function FanPassForm({
  title,
  projectId,
  fanPassId,
}) {
  const { data: fees } = useSWR(`projects/${projectId}/fees`, {
    revalidateOnFocus: false,
  });

  const {
    data: defaultValues = {
      subscriptionPrice: 0,
      subscriptionLimit: 0,
    },
  } = useSWR(() => (fanPassId ? `/projects/${projectId}/fan-pass/${fanPassId}` : null), { suspense: true });

  const { register, getValues, handleSubmit } = useForm({
    defaultValues,
  });

  const [amount, setAmount] = useState(0);
  const [isUnlimited, setIsUnlimited] = useState(!defaultValues.subscriptionLimit);

  const handleAmount = () => {
    const value = getValues().subscriptionPrice * (1 - fees.contentsDistributorRate / 100);
    setAmount(parseFloat(value.toFixed(2)));
  };

  const [API] = useAPI();

  const onSubmit = async (data) => {
    try {
      if (fanPassId) {
        await API.fanPass.update({
          ...data,
          projectId,
          fanPassId,
          subscriptionLimit: isUnlimited ? null : data.subscriptionLimit,
        });
      } else {
        await API.fanPass.create({
          ...data,
          projectId,
          subscriptionLimit: isUnlimited ? null : data.subscriptionLimit,
        });
      }
      navigate(`/dashboard/${projectId}/fanpass/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>{title}</Heading>
      {fanPassId && (
        <div>
          <Label>
            티어
          </Label>
          <Styled.Level>
            {defaultValues.level > 0 ? `티어 ${defaultValues.level}` : '무료 티어'}
          </Styled.Level>
        </div>
      )}
      <Styled.InputGroup inputRef={register} name="name" label="상품명" required />
      {(!fanPassId || defaultValues.level > 0) && (
        <Styled.InputGroup
          inputRef={register}
          name="subscriptionPrice"
          type="number"
          label="가격"
          columns={3}
          onBlur={handleAmount}
          style={{
            gridColumn: '1 / -2',
          }}
        >
          <Styled.Unit>
            PXL
          </Styled.Unit>
          {fees && (
            <Styled.Fee>
              상품 판매 시 정산 금액 :
              <strong>
                {` ${amount} PXL`}
              </strong>
              {`(기본 수수료 ${fees.contentsDistributorRate}% 제외)`}
            </Styled.Fee>
          )}
        </Styled.InputGroup>
      )}
      <Styled.InputGroup inputRef={register} name="description" label="설명" placeholder="최대 100자" />
      {(!fanPassId || defaultValues.level > 0) && (
        <Styled.InputGroup
          type="number"
          inputRef={register}
          name="subscriptionLimit"
          label="구독자 수 제한"
          required={!isUnlimited}
          placeholder="0"
          columns={2}
          disabled={isUnlimited}
          style={{
            gridRow: 3,
          }}
        >
          <Styled.SubscriptionLimit>
            <Checkbox
              checked={isUnlimited}
              onChange={() => setIsUnlimited(prev => !prev)}
              style={{ marginRight: 16 }}
            />
            제한 없음
          </Styled.SubscriptionLimit>
        </Styled.InputGroup>
      )}
      <Styled.SubmitGroup>
        <Styled.Submit value="저장" />
        <SecondaryButton
          as={Link}
          to={`/dashboard/${projectId}/fanpass/`}
        >
          취소
        </SecondaryButton>
      </Styled.SubmitGroup>
    </Styled.Form>
  );
}

FanPassForm.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  fanPassId: PropTypes.string,
};

export default FanPassForm;
