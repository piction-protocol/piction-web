import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import useAPI from 'hooks/useAPI';
import useForm from 'hooks/useForm';
import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';
import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';

import GridTemplate from 'components/templates/GridTemplate';
import Heading from 'components/atoms/Heading';
import ContentImage from 'components/atoms/ContentImage';
import Checkbox from 'components/atoms/Checkbox';
import ErrorMessage from 'components/atoms/ErrorMessage';
import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  BluredImage: styled.div.attrs({
    role: 'img',
  })`
    display: flex;
    position: relative;
    height: 100px;
    margin-bottom: -52px;
    overflow: hidden;
    ${media.desktop`
      height: 120px;
      margin-bottom: var(--row-gap);
    `}
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background-image: url(${({ image }) => image}), linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--white));
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-blend-mode: overlay;
      transform: scale(1.1);
      filter: blur(6px);
      ${media.desktop`
        background-image: url(${({ image }) => image});
        filter: blur(8px);
      `}
    }
  `,
  Thumbnail: styled(ContentImage)`
    grid-column: 3 / 5;
    border: 3px solid var(--black);
    ${media.desktop`
      grid-row: 2;
      grid-column: 1 / 3;
    `}
  `,
  Text: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    border-bottom: 1px solid var(--gray--light);
    text-align: center;
    ${media.desktop`
      text-align: left;
      border-color: var(--black);
    `}
  `,
  Heading: styled(Heading)`
    margin-bottom: 8px;
    ${media.desktop`
      margin-bottom: var(--row-gap);
    `}
  `,
  Title: styled.p`
    padding-bottom: var(--row-gap);
    font-size: var(--font-size--small);
    ${media.desktop`
      display: none;
    `}
  `,
  Membership: styled.div`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: 3 / 10;
      grid-row: 2 / 4;
    `}
  `,
  PXL: styled.p`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: var(--font-size--large);
    font-weight: bold;
  `,
  DesktopTitle: styled.p`
    padding-bottom: 8px;
    font-weight: bold;
    ${media.mobile`
      display: none;
    `}
  `,
  Period: styled.span`
    margin-left: 8px;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    font-weight: normal;
  `,
  ExpireDate: styled.p`
    color: var(--blue);
    font-size: var(--font-size--small);
  `,
  Synopsis: styled.p`
    margin-top: 8px;
    color: var(--gray--dark);
    line-height: var(--line-height--content);
    ${media.mobile`
      display: none;
    `}
  `,
  Purchase: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    > * {
      margin-bottom: var(--row-gap);
    }
    ${media.desktop`
      grid-column: 10 / -1;
      grid-row: 2 / 4;
    `}
  `,
  Terms: styled.div`
    padding: 16px;
    background-color: var(--gray--light);
    font-size: var(--font-size--small);
  `,
  Bold: styled.b`
    margin: 0 4px;
    font-weight: bold;
  `,
  Label: styled.label`
    display: flex;
    align-items: flex-start;
    flex-flow: row;
    font-size: var(--font-size--small);
  `,
  Checkbox: styled(Checkbox)`
    flex: 0 0 auto;
    margin-top: 4px;
    margin-right: 8px;
  `,
};

function MembershipPage({ location, projectId }) {
  const [formData, { handleChange }] = useForm({
    agree: false,
  });
  const [project, setProject] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [API] = useCallback(useAPI(), []);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    const getMembership = async () => {
      try {
        const { data } = await API.project.get({ projectId });
        await setProject(data);
        setIsLoaded(true);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    const checkIsSubscribing = async () => {
      const { data } = await API.project.getSubscription({ projectId });
      if (data.subscribing) navigate('./');
    };

    if (currentUser) {
      getMembership();
      checkIsSubscribing();
    } else {
      navigate('/login', { state: { redirectTo: location.pathname }, replace: true });
    }
  }, [API, projectId, currentUser, location.pathname]);

  const handleSubmit = async () => {
    try {
      await API.project.subscribe({
        projectId,
        subscriptionPrice: project.subscriptionPrice,
      });
      navigate(location.state.redirectTo || '/');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return isLoaded && (
    <GridTemplate
      hero={(
        <Styled.BluredImage
          image={project.wideThumbnail || dummyWideThumbnailImage}
        />
      )}
    >
      <Styled.Thumbnail
        ratio={500 / 500}
        image={project.thumbnail || dummyThumbnailImage}
      />
      <Styled.Text>
        <Styled.Heading>멤버십 구매</Styled.Heading>
        <Styled.Title>{`${project.title} 멤버십`}</Styled.Title>
      </Styled.Text>
      <Styled.Membership>
        <Styled.PXL>
          {`${project.subscriptionPrice} PXL`}
          <Styled.Period>
            / 30일 간
          </Styled.Period>
        </Styled.PXL>
        <Styled.DesktopTitle>{`${project.title} 멤버십`}</Styled.DesktopTitle>
        <Styled.ExpireDate>
          {`▪ ${moment().add(30, 'days').format('ll')}까지 구독 가능합니다.`}
        </Styled.ExpireDate>
        <Styled.Synopsis>
          {project.synopsis}
        </Styled.Synopsis>
      </Styled.Membership>
      <Styled.Purchase>
        <Styled.Terms>
          멤버십 상품 구매 시 네트워크 수수료 10%, 생태계 수수료 10%, 사용자 보상 풀 2%를 제외한
          <Styled.Bold>{project.subscriptionPrice * 0.78}</Styled.Bold>
          PXL의 금액이
          <Styled.Bold>{`@${project.user.loginId}`}</Styled.Bold>
          님에게 즉시 송금되며, 환불은 불가능합니다.
        </Styled.Terms>
        <Styled.Label>
          <Styled.Checkbox name="agree" onChange={handleChange} />
          상품 설명 및 환불에 대한 내용을 확인하였으며, 이에 동의합니다.
        </Styled.Label>
        {errorMessage && (
          <ErrorMessage>
            {errorMessage}
          </ErrorMessage>
        )}
        <PrimaryButton onClick={handleSubmit} disabled={!formData.agree}>
          멤버십 구매
        </PrimaryButton>
      </Styled.Purchase>
    </GridTemplate>
  );
}

export default MembershipPage;

MembershipPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
