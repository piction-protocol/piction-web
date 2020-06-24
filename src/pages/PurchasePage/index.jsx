import React, {
  useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useLocation } from '@reach/router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import moment from 'moment';
import 'moment/locale/ko';
import { useTranslation, Trans } from 'react-i18next';
import i18n from 'language/i18n';

import media, { mediaQuery } from 'styles/media';
import placeholder from 'styles/placeholder';

import useMedia from 'hooks/useMedia';
import useProjectLayout from 'hooks/useNavigationLayout';
import useAPI from 'hooks/useAPI';

import withLoginChecker from 'components/LoginChecker';


import ErrorMessage from 'components/atoms/ErrorMessage';
import GridTemplate from 'components/templates/GridTemplate';
import LinkaPayment from 'components/molecules/LinkaPayment';
import WideThumbnail from 'components/atoms/ContentImage/WideThumbnail';
import Checkbox from 'components/atoms/Checkbox';
import Heading from 'components/atoms/Heading';
import { PrimaryButton } from 'components/atoms/Button';
import Alert from 'components/externals/Alert';

import { ReactComponent as LinkaPayIcon } from 'images/ic-linkapay.svg';

const Styled = {
  WideThumbnail: styled(WideThumbnail)`
    background-color: var(--gray--pale);
    ${media.desktop`
      max-height: 450px;
    `}
  `,
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    margin-bottom: 16px;
    font-family: var(--poppins);
    font-size: var(--font-size--large);
  `,
  Wrapper: styled.form`
    grid-column: 1 / -1;
    padding: 32px 8px;
    ${media.desktop`
      grid-column: 4 / -4;
      margin-top: 40px;
      padding: 40px;
      border: 1px solid #e8e8e8;
    `}
  `,
  Section: styled.section`
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--gray--pale);
  `,
  SectionTitle: styled.h2`
    margin-bottom: 4px;
    color: var(--gray);
    font-size: var(--font-size--small);
    font-weight: normal;
  `,
  SectionLabel: styled.h2`
    margin-bottom: 4px;
    color: var(--gray);
    font-size: var(--font-size--base);
  `,
  Name: styled.p`
    margin-bottom: 16px;
    font-size: var(--font-size--base);
    font-weight: bold;
    ${placeholder}
  `,
  Description: styled.p`
    margin-top: 16px;
    color: var(--gray);
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
  Price: styled.p`
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
    font-size: var(--font-size--tiny);
  `,
  CheckboxLabel: styled.label`
    display: flex;
    align-items: center;
    margin-top: var(--row-gap);
    font-size: var(--font-size--small);
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
  `,
  Ul: styled.ul`
    padding: 16px;
  `,
  Li: styled.li`
    color: var(--gray);
    list-style: disc;
    & + & {
      margin-top: 8px;
    }
  `,
  Em: styled.em`
    color: #bf1113;
    font-style: normal;
  `,
  PaymentBy: styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    color: var(--gray);
    font-size: var(--font-size--tiny);
  `,
  LinkaPayIcon: styled(LinkaPayIcon)`
    margin-left: 6px;
    width: auto;
    height: 10px;
  `,
  TextBox: styled.textarea`
    width: 100%;
    height: 80px;
    outline: none;
    resize: none;
    border: 1px solid var(--gray);
  `,
};

function PurchasePage({
  projectId, membershipId,
}) {
  const isDesktop = useMedia(mediaQuery.desktop);
  const [isAgreed, setIsAgreed] = useState(false);
  const [API] = useCallback(useAPI(), [projectId, membershipId]);
  const [alert, setAlert] = useState(null);
  const [linkaPayment, setLinkaPayment] = useState(null);
  const location = useLocation();
  const redirectPage = location.state.redirectTo;
  const { t } = useTranslation();
  const PageLanguage = i18n.language;

  const { data: project } = useSWR(`/projects/${projectId}`, { revalidateOnFocus: false });
  useProjectLayout(project);

  const { data: membership } = useSWR(`/projects/${projectId}/memberships/${membershipId}`);
  const { data: fees } = useSWR(`projects/${projectId}/fees`, {
    revalidateOnFocus: false,
  });

  const {
    register,
    errors,
    handleSubmit,
  } = useForm();

  const handleError = (error) => {
    setAlert({ text: error.response.data.message, type: 'error' });
  };

  const handleSubscribe = async (data) => {
    try {
      const { data: paymentData } = await API.linka.getLinkaPayment({
        projectId,
        membershipId,
        sponsorshipPrice: membership.price,
        nextUrl: redirectPage,
        ...data,
      });
      setLinkaPayment(paymentData);
    } catch (error) {
      handleError(error);
    } finally {
      setLinkaPayment(null);
    }
  };

  const projectUserName = project?.user?.username;

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
        <Styled.Wrapper onSubmit={handleSubmit(handleSubscribe)}>
          <Styled.Heading>
            {t('후원 플랜 결제')}
          </Styled.Heading>
          <Styled.Section>
            <Styled.SectionTitle>
              {t('선택한 후원 플랜')}
            </Styled.SectionTitle>
            {membership ? (
              <>
                <Styled.Name>
                  {`${t('티어')} ${membership.level} - ${membership.name}`}
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
                  {t('티어')}
                  {' '}
                  level - name
                </Styled.Name>
                <Styled.Description isPlaceholder>
                  description
                </Styled.Description>
              </>
            )}
          </Styled.Section>
          <Styled.Section>
            <Styled.SectionLabel>
              {t('혜택 제공 기간')}
            </Styled.SectionLabel>
            <Styled.Date>
              {
                ((PageLanguage === 'ko') || (PageLanguage === 'undefined')) ? moment().add(30, 'days').format(' YYYY년 MM월 DD일까지 (30일)') : moment().add(30, 'days').format('[Until] YYYY-MM-DD [(30days)]')
              }
            </Styled.Date>
            <Styled.SectionLabel>
              {t('결제 금액')}
            </Styled.SectionLabel>
            {membership ? (
              <Styled.Price>
                {`${membership.price} PXL`}
              </Styled.Price>
            ) : (
              <Styled.Price isPlaceholder>
                1000 PXL
              </Styled.Price>
            )}
          </Styled.Section>
          {fees && project && membership && (
            <Styled.Section>
              <Styled.Fees>
                <Styled.FeesTitle>{t('송금 안내')}</Styled.FeesTitle>
                <Styled.Ul>
                  <Styled.Li>
                    {`${t('기본 수수료')} ${fees.contentsDistributorRate}%`}
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
                  <Trans i18nKey="결제 완료">
                    결제 완료 시 결제 금액이 즉시
                    {' '}
                    <strong>
                      {{ projectUserName }}
                    </strong>
                    {' '}
                    님의 계좌로 송금되며,
                    {' '}
                    <Styled.Em>
                      환불은 불가능합니다.
                    </Styled.Em>
                  </Trans>
                </Styled.Notice>
              </Styled.Fees>
            </Styled.Section>
          )}
          {fees && project && membership && (
          <Styled.Section>
            <Styled.Fees>
              <Styled.FeesTitle>
                <Trans i18nKey="작가님에게 후원의 메세지를 전달하세요.">
                  {project.user.username}
                  {' '}
                  작가님에게 후원의 메세지를 전달하세요.
                </Trans>
              </Styled.FeesTitle>
              <br />
              <Styled.TextBox
                placeholder={t('후원 메세지')}
                name="messageOfSponsorship"
                ref={register({
                  maxLength: {
                    value: 1000,
                    message: `${t('후원 감사메세지는 최대 1000자까지 입력 가능합니다.')}`,
                  },
                })}
              />
              {errors.meesageOfSponsorship && (
                <ErrorMessage>
                  {errors.meesageOfSponsorship.message}
                </ErrorMessage>
              )}
            </Styled.Fees>
          </Styled.Section>
          )}
          <Styled.CheckboxLabel>
            <Styled.Checkbox checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} />
            {t('상품 설명 및 환불에 대한 내용을 확인하였으며, 이에 동의합니다.')}
          </Styled.CheckboxLabel>
          <Styled.Submit value="결제" disabled={!isAgreed} />
          <Styled.PaymentBy>
            Payment by
            <Styled.LinkaPayIcon />
          </Styled.PaymentBy>
        </Styled.Wrapper>
      </GridTemplate>
      {alert && (
        <Alert type={alert.type}>
          {alert.text}
        </Alert>
      )}
      {linkaPayment && (
        <LinkaPayment {...linkaPayment} />
      )}
    </>
  );
}

export default withLoginChecker(PurchasePage);

PurchasePage.propTypes = {
  projectId: PropTypes.string.isRequired,
  membershipId: PropTypes.string.isRequired,
  location: PropTypes.object,
  redirectTo: PropTypes.object,
};
