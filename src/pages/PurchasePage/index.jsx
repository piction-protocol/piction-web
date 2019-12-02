import React, {
  useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import useSWR from 'swr';
import moment from 'moment';
import 'moment/locale/ko';

import media from 'styles/media';
import placeholder from 'styles/placeholder';

import useProjectLayout from 'hooks/useNavigationLayout';
import useAPI from 'hooks/useAPI';

import withLoginChecker from 'components/LoginChecker';

import GridTemplate from 'components/templates/GridTemplate';
import Checkbox from 'components/atoms/Checkbox';
import Radio from 'components/atoms/Radio';
import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    grid-row: 1;
    margin-top: 24px;
    font-family: var(--poppins);
    font-size: 36px;
    text-align: center;
    ${media.desktop`
      font-size: 40px;
    `}
  `,
  Section: styled.section`
    grid-column: 1 / -1;
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
    ${media.desktop`
      grid-column: 3 / 7;
    `}
  `,
  SectionTitle: styled.h2`
    margin-bottom: var(--row-gap);
    font-size: 20px;
    font-weight: bold;
  `,
  Name: styled.p`
    font-size: 16px;
    ${placeholder}
  `,
  Description: styled.p`
    margin-top: 16px;
    color: #999999;
    font-size: var(--font-size--small);
    ${placeholder}
  `,
  Amount: styled.p`
    margin-top: 8px;
    padding-left: 24px;
    color: #999999;
    font-size: var(--font-size--tiny);
    font-weight: bold;
  `,
  Purchase: styled.section`
    grid-column: 1 / -1;
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
    ${media.desktop`
      grid-column: 7 / -3;
      grid-row: 2 / 5;
      margin-bottom: auto;
      border: 1px solid var(--gray--light);
      padding: 40px;
    `}
  `,
  Subscription: styled.div`
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
  `,
  Price: styled.p`
    margin-bottom: 8px;
    font-family: var(--poppins);
    ${placeholder}
  `,
  Date: styled.p`
    color: #999999;
    font-size: var(--font-size--small);
  `,
  Notice: styled.p`
    font-size: var(--font-size--tiny);
  `,
  CheckboxLabel: styled.label`
    display: flex;
    margin-top: var(--row-gap);
  `,
  Checkbox: styled(Checkbox)`
    flex: 0 0 auto;
    margin-right: 8px;
  `,
  Submit: styled(PrimaryButton).attrs(() => ({
    as: 'input',
    type: 'submit',
  }))`
    width: 100%;
    margin-top: var(--row-gap);
  `,
  Fees: styled.section`
    grid-column: 1 / -1;
    color: #999999;
    font-size: var(--font-size--small);
    ${media.desktop`
      grid-column: 3 / 7;
    `}
  `,
  FeesTitle: styled.h2`
    font-size: var(--font-size--small);
  `,
  FeesAmount: styled.b`
    margin-left: 8px;
    font-size: var(--font-size--tiny);
  `,
  Ul: styled.ul`
    padding: 16px;
  `,
  Li: styled.li`
    list-style: disc;
    & + & {
      margin-top: 8px;
    }
  `,
};

function PurchasePage({ projectId, fanPassId, redirect }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [API] = useCallback(useAPI(), [projectId, fanPassId]);

  const { data: project } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  useProjectLayout(project);

  const { data: fanPass } = useSWR(`/projects/${projectId}/fan-pass/${fanPassId}`);
  const { data: wallet = { amount: 0 } } = useSWR('/my/wallet');
  const { data: fees } = useSWR(`projects/${projectId}/fees`, {
    revalidateOnFocus: false,
  });

  const handleError = (error) => {
    alert(error.response.data.message);
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    try {
      await API.fanPass.subscribe({
        projectId,
        fanPassId,
        subscriptionPrice: fanPass.subscriptionPrice,
      });
      navigate(redirect || `/project/${projectId}`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <GridTemplate>
      <Styled.Heading>
       FAN PASS 구매
      </Styled.Heading>
      <Styled.Section>
        <Styled.SectionTitle>
          선택한 구독 상품
        </Styled.SectionTitle>
        {fanPass ? (
          <>
            <Styled.Name>
              {`티어 ${fanPass.level} - ${fanPass.name}`}
            </Styled.Name>
            {fanPass.description && (
              <Styled.Description>
                {fanPass.description}
              </Styled.Description>
            )}
          </>
        ) : (
          <>
            <Styled.Name isPlaceholder>
              티어 level - name
            </Styled.Name>
            <Styled.Description isPlaceholder>
              description
            </Styled.Description>
          </>
        )}
      </Styled.Section>
      <Styled.Section>
        <Styled.SectionTitle>
          결제 방법
        </Styled.SectionTitle>
        <Radio defaultChecked>픽션 지갑</Radio>
        <Styled.Amount>
          {`${wallet.amount} PXL 보유 중`}
        </Styled.Amount>
      </Styled.Section>
      <Styled.Purchase>
        <form onSubmit={handleSubscribe}>
          <Styled.SectionTitle>
            결제 금액
          </Styled.SectionTitle>
          {fanPass ? (
            <Styled.Subscription>
              <Styled.Price>
                {`${fanPass.subscriptionPrice} PXL`}
              </Styled.Price>
              <Styled.Date>
                <b>제공 기간</b>
                {moment().add(30, 'days').format(' YYYY년 MM월 DD일까지 (30일)')}
              </Styled.Date>
            </Styled.Subscription>
          ) : (
            <Styled.Price isPlaceholder>
              1000 PXL
            </Styled.Price>
          )}
          <Styled.CheckboxLabel>
            <Styled.Checkbox checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} />
            <Styled.Notice>
              상품 설명 및 환불에 대한 내용을 확인하였으며, 이에 동의합니다.
            </Styled.Notice>
          </Styled.CheckboxLabel>
          <Styled.Submit value="구매" disabled={!isAgreed} />
        </form>
      </Styled.Purchase>
      {fees && project && fanPass && (
        <Styled.Fees>
          <Styled.FeesTitle>송금 안내</Styled.FeesTitle>
          <Styled.Ul>
            <Styled.Li>
              {project.user.username}
              <Styled.FeesAmount>
                {`${fanPass.subscriptionPrice * (100 - fees.contentsDistributorRate) / 100} PXL`}
              </Styled.FeesAmount>
            </Styled.Li>
            <Styled.Li>
              {`기본 수수료 ${fees.contentsDistributorRate}%`}
              <Styled.FeesAmount>
                {`${fanPass.subscriptionPrice * (fees.contentsDistributorRate) / 100} PXL`}
              </Styled.FeesAmount>
            </Styled.Li>
          </Styled.Ul>
          <Styled.Notice>
            결제 완료 시 결제 금액이 즉시
            {' '}
            <strong>
              {project.user.username}
            </strong>
            님의 계좌로 송금되며, 환불은 불가능합니다.
          </Styled.Notice>
        </Styled.Fees>
      )}
    </GridTemplate>
  );
}

export default withLoginChecker(PurchasePage);

PurchasePage.propTypes = {
  projectId: PropTypes.string.isRequired,
  fanPassId: PropTypes.string.isRequired,
  redirect: PropTypes.string,
};
