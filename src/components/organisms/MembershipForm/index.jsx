import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import useAPI from 'hooks/useAPI';

import Grid from 'styles/Grid';

import ErrorMessage from 'components/atoms/ErrorMessage';
import InputGroup from 'components/molecules/InputGroup';
import Label from 'components/atoms/Label';
import Heading from 'components/atoms/Heading';
import Checkbox from 'components/atoms/Checkbox';
import { PrimaryButton, SecondaryButton, TertiaryButton } from 'components/atoms/Button';
import Modal, { ModalBody } from 'components/externals/Modal';

import { ReactComponent as TrashbinIcon } from './ic-trashbin.svg';

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
  SponsorLimit: styled.label`
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
  DeleteMembershipButton: styled(TertiaryButton).attrs(() => ({
    type: 'button',
  }))`
    display: flex;
    margin-left: auto;
    color: var(--red);
    font-weight: normal;
  `,
  DangerousButton: styled(PrimaryButton)`
    background-color: var(--red);
  `,
};

function MembershipForm({
  title,
  projectId,
  membershipId,
}) {
  const { data: fees } = useSWR(`projects/${projectId}/fees`, {
    revalidateOnFocus: false,
  });

  const {
    data: defaultValues = {
      price: 0,
      sponsorLimit: 0,
    },
  } = useSWR(() => (membershipId ? `/projects/${projectId}/memberships/${membershipId}` : null), { suspense: true });

  const {
    register,
    errors,
    setError,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues,
  });
  const watchingPrice = watch('price');

  const [settlementAmount, setSettlementAmount] = useState(0);
  const [isUnlimited, setIsUnlimited] = useState(!defaultValues.sponsorLimit);
  const [isDeletingMembership, setIsDeletingMembership] = useState(false);
  const [canDeleteMembership, setCanDeleteMembership] = useState(true);

  // Compute settlement amount when watching price or fees changed
  useEffect(() => {
    if (!fees) return;

    const value = watchingPrice * (1 - fees.contentsDistributorRate / 100);
    setSettlementAmount(parseFloat(value.toFixed(2)));
  }, [watchingPrice, fees]);

  const [API] = useAPI();
  // FIXME: history에 대한 직접 접근 제거
  const history = useHistory();

  const deleteMembership = async () => {
    try {
      await API.membership.delete({ projectId, membershipId });
      history.push(`/dashboard/${projectId}/memberships/`);
    } catch (ex) {
      setCanDeleteMembership(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (membershipId) {
        await API.membership.update({
          ...data,
          projectId,
          membershipId,
          sponsorLimit: isUnlimited ? null : data.sponsorLimit,
        });
      } else {
        await API.membership.create({
          ...data,
          projectId,
          sponsorLimit: isUnlimited ? null : data.sponsorLimit,
        });
      }
      history.push(`/dashboard/${projectId}/memberships/`);
    } catch (error) {
      setError(error?.response?.data?.field, 'validation', error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>{title}</Heading>
      {membershipId && (
        <div>
          <Label>
            티어
          </Label>
          <Styled.Level>
            {defaultValues.level > 0 ? `티어 ${defaultValues.level}` : '무료 티어'}
          </Styled.Level>
        </div>
      )}
      <Styled.InputGroup inputRef={register} name="name" label="상품명" required>
        {errors.name && (
          <ErrorMessage>
            {errors.name.message}
          </ErrorMessage>
        )}
      </Styled.InputGroup>
      {(!membershipId || defaultValues.level > 0) && (
        <Styled.InputGroup
          inputRef={register({
            min: {
              value: 1,
              message: '1 이상 99,999 이하의 숫자를 입력해 주세요.',
            },
            max: {
              value: 99999,
              message: '1 이상 99,999 이하의 숫자를 입력해 주세요.',
            },
          })}
          name="price"
          type="number"
          label="가격"
          columns={3}
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
                {` ${settlementAmount} PXL`}
              </strong>
              {`(기본 수수료 ${fees.contentsDistributorRate}% 제외)`}
            </Styled.Fee>
          )}
          {errors.price && (
            <ErrorMessage>
              {errors.price.message}
            </ErrorMessage>
          )}
        </Styled.InputGroup>
      )}
      <Styled.InputGroup
        inputRef={register({
          maxLength: {
            value: 100,
            message: '설명은 최대 100자까지 입력 가능합니다.',
          },
        })}
        name="description"
        label="설명"
        placeholder="최대 100자"
      >
        {errors.description && (
          <ErrorMessage>
            {errors.description.message}
          </ErrorMessage>
        )}
      </Styled.InputGroup>
      {(!membershipId || defaultValues.level > 0) && (
        <Styled.InputGroup
          type="number"
          inputRef={register}
          name="sponsorLimit"
          label="후원자 수 제한"
          required={!isUnlimited}
          placeholder="0"
          columns={2}
          disabled={isUnlimited}
          style={{
            gridRow: 3,
          }}
        >
          <Styled.SponsorLimit>
            <Checkbox
              checked={isUnlimited}
              onChange={() => setIsUnlimited(prev => !prev)}
              style={{ marginRight: 16 }}
            />
            제한 없음
          </Styled.SponsorLimit>
        </Styled.InputGroup>
      )}
      <Styled.SubmitGroup style={{ display: 'flex' }}>
        <Styled.Submit value="저장" />
        <SecondaryButton
          as={Link}
          to={`/dashboard/${projectId}/memberships/`}
        >
          취소
        </SecondaryButton>
        {/* membershipId가 없는 경우는 신규 플랜 작성으로 볼 수 있으며 이 경우 삭제 버튼을 감춥니다. */}
        {membershipId && (
          <Styled.DeleteMembershipButton onClick={() => setIsDeletingMembership(true)}>
            <TrashbinIcon />
            플랜 삭제
          </Styled.DeleteMembershipButton>
        )}
      </Styled.SubmitGroup>

      {isDeletingMembership && (
        <Modal close={() => setIsDeletingMembership(false)}>
          {canDeleteMembership ? (
            <>
              <ModalBody>선택한 후원 플랜을 삭제하시겠습니까?</ModalBody>
              <Styled.DangerousButton onClick={deleteMembership}>삭제</Styled.DangerousButton>
              <TertiaryButton onClick={() => setIsDeletingMembership(false)}>취소</TertiaryButton>
            </>
          ) : (
            <>
              <ModalBody>선택한 후원 플랜을 삭제할 수 없습니다. 해당 플랜과 연결된 포스트가 있거나 1명 이상의 후원자가 있는 경우, 또는 제일 높은 티어의 플랜이 아닌 경우 삭제할 수 없습니다.</ModalBody>
              <PrimaryButton onClick={() => setIsDeletingMembership(false)}>확인</PrimaryButton>
            </>
          )}
        </Modal>
      )}
    </Styled.Form>
  );
}

MembershipForm.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  membershipId: PropTypes.string,
};

export default MembershipForm;
