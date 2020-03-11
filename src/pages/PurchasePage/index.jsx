import React, {
  useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import moment from 'moment';
import 'moment/locale/ko';

import media, { mediaQuery } from 'styles/media';
import placeholder from 'styles/placeholder';

import useMedia from 'hooks/useMedia';
import useProjectLayout from 'hooks/useNavigationLayout';
import useAPI from 'hooks/useAPI';

import withLoginChecker from 'components/LoginChecker';

import GridTemplate from 'components/templates/GridTemplate';
import WideThumbnail from 'components/atoms/ContentImage/WideThumbnail';
import Checkbox from 'components/atoms/Checkbox';
import Radio from 'components/atoms/Radio';
import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';
import Alert from 'components/externals/Alert';

const Styled = {
  WideThumbnail: styled(WideThumbnail)`
    grid-column: 1 / -1;
    grid-row: 1;
    background-color: var(--gray--light);
    ${media.desktop`
      max-height: 450px;
    `}
  `,
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    grid-row: 1;
    margin-top: 24px;
    font-family: var(--poppins);
    font-size: var(--font-size--large);
  `,
  Section: styled.section`
    grid-column: 1 / -1;
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
    ${media.desktop`
      grid-column: 1 / 7;
    `}
  `,
  SectionTitle: styled.h2`
    color: #bababa;
    font-size: var(--font-size--small);
    font-weight: normal;
  `,
  SectionLabel: styled.h2`
    color: #bababa;
    font-size: var(--font-size--base);
    margin-bottom: 4px;
  `,
  Name: styled.p`
    margin-bottom: 16px;
    font-size: var(--font-size--base);
    font-weight: bold;
    ${placeholder}
  `,
  Description: styled.p`
    margin-top: 16px;
    color: #bababa;
    font-size: var(--font-size--small);
    ${placeholder}
  `,
  Amount: styled.p`
    margin: 8px 0;
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
      grid-column: 7 / -1;
      grid-row: 2 / 5;
      margin-bottom: auto;
      border: 1px solid var(--gray--light);
      padding: 40px;
    `}
  `,
  PurchaseTitle: styled.p`
  `,
  Subscription: styled.div`
    padding-bottom: var(--row-gap);
    border-bottom: 1px solid var(--gray--light);
  `,
  Price: styled.p`
    margin-bottom: 8px;
    font-size: var(--font-size--large);
    font-family: var(--poppins);
    ${placeholder}
  `,
  Date: styled.p`
    color: var(--black);
    font-weight: bold;
    font-size: var(--font-size--base);
    margin-bottom: 16px;
  `,
  Notice: styled.p`
    font-size: var(--font-size--small);
  `,
  CheckboxLabel: styled.label`
    display: flex;
    align-items: center;
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
      grid-column: 1 / 7;
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

function PurchasePage({ projectId, membershipId, redirect = `/project/${projectId}` }) {
  const isDesktop = useMedia(mediaQuery.desktop);
  const [isAgreed, setIsAgreed] = useState(false);
  const [API] = useCallback(useAPI(), [projectId, membershipId]);
  const [alert, setAlert] = useState(null);
  const [payment, setPayment] = useState('piction');
  const [linkaPayment, setLinkaPayment] = useState(null);

  const { data: project } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  useProjectLayout(project);

  const { data: membership } = useSWR(`/projects/${projectId}/memberships/${membershipId}`);
  const { data: wallet = { amount: 0 } } = useSWR('/my/wallet');
  const { data: fees } = useSWR(`projects/${projectId}/fees`, {
    revalidateOnFocus: false,
  });

  const handleError = (error) => {
    setAlert({ text: error.response.data.message, type: 'error' });
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (payment === 'linka') {
      try {
        const { data } = await API.linka.getLinkaPayment({
          projectId,
          membershipId,
          sponsorshipPrice: membership.price,
          nextUrl: redirect,
        });
        setLinkaPayment(data);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    } else {
      try {
        await API.membership.subscribe({
          projectId,
          membershipId,
          sponsorshipPrice: membership.price,
        });
        navigate(redirect);
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <>
      <Styled.WideThumbnail
        {...(isDesktop ? {
          width: null, height: null,
        } : {
          width: 720, height: 360,
        })}
        image={project?.wideThumbnail}
      />
      <GridTemplate>
        <Styled.Heading>
          후원 플랜 결제
        </Styled.Heading>
        <Styled.Section>
          <Styled.SectionTitle>
            선택한 후원 플랜
          </Styled.SectionTitle>
          {membership ? (
            <>
              <Styled.Name>
                {`티어 ${membership.level} - ${membership.name}`}
              </Styled.Name>
              {membership.description && (
                <Styled.Description>
                  {membership.description}
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
          <Styled.Name>
            결제 방법
          </Styled.Name>
          <Radio
            name="payment"
            value="piction"
            checked={payment === 'piction'}
            onChange={() => setPayment('piction')}
          >
            픽션 지갑
          </Radio>
          <Styled.Amount>
            {`${wallet.amount.toLocaleString()} PXL 보유 중`}
          </Styled.Amount>
          <Radio
            name="payment"
            value="linka"
            checked={payment === 'linka'}
            onChange={() => setPayment('linka')}
          >
            신용카드
          </Radio>
        </Styled.Section>
        <Styled.Purchase>
          <form onSubmit={handleSubscribe}>
            <Styled.SectionLabel>
              혜택 제공 기간
            </Styled.SectionLabel>
            <Styled.Date>
              {moment().add(30, 'days').format(' YYYY년 MM월 DD일까지 (30일)')}
            </Styled.Date>
            <Styled.SectionLabel>
              결제 금액
            </Styled.SectionLabel>
            {membership ? (
              <Styled.Subscription>
                <Styled.Price>
                  {`${membership.price} PXL`}
                </Styled.Price>
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
        {fees && project && membership && (
          <Styled.Fees>
            <Styled.FeesTitle>송금 안내</Styled.FeesTitle>
            <Styled.Ul>
              <Styled.Li>
                {`기본 수수료 ${fees.contentsDistributorRate}%`}
                <Styled.FeesAmount>
                  {`${membership.price * (fees.contentsDistributorRate) / 100} PXL`}
                </Styled.FeesAmount>
              </Styled.Li>
              <Styled.Li>
                {project.user.username}
                <Styled.FeesAmount>
                  {`${membership.price * (100 - fees.contentsDistributorRate) / 100} PXL`}
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
      {alert && (
        <Alert type={alert.type}>
          {alert.text}
        </Alert>
      )}
      {linkaPayment && (
        <form method="post" action={linkaPayment.requestUrl}>
          {Object.entries(linkaPayment.linkaPaymentFormView).map(([key, value]) => (
            <input type="hidden" name={key} value={value} key={key} />
          ))}
          <input type="submit" value="test" />
        </form>
      )}
    </>
  );
}

export default withLoginChecker(PurchasePage);

PurchasePage.propTypes = {
  projectId: PropTypes.string.isRequired,
  membershipId: PropTypes.string.isRequired,
  redirect: PropTypes.string,
};
