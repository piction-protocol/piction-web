import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { MainGrid } from 'styles/Grid';
import media from 'styles/media';

import moment from 'moment';
import 'moment/locale/ko';

const Styled = {
  Section: styled.section`
    display: flex;
    background-color: var(--gray--pale);
  `,
  Wrapper: styled(MainGrid)`
    align-items: flex-start;
    max-width: var(--max-width);
    margin: 0 auto;
    padding-top: 24px;
    padding-bottom: 24px;
    ${media.desktop`
      padding-top: 40px;
      padding-bottom: 40px;
    `}
  `,
  Picture: styled.div`
    grid-column: span 1;
    padding-top: 100%;
    border-radius: 50%;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
  `,
  User: styled.div`
    grid-column: 2 / -1;
  `,
  Name: styled.h1`
    font-size: var(--font-size--base);
    ${media.desktop`
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      font-size: var(--font-size--large);
    `}
  `,
  ID: styled.p`
    margin: 2px 0;
    color: var(--gray);
    font-size: var(--font-size--small);
    font-weight: bold;
    ${media.desktop`
      margin-left: 8px;
      font-size: var(--font-size--base);
    `}
  `,
  Description: styled.p`
    color: var(--gray);
    font-size: var(--font-size--small);
    ${media.desktop`
      font-size: var(--font-size--base);
    `}
  `,
};

function UserInfo({
  picture = '', username, loginId, createdAt, children = null,
}) {
  const { t } = useTranslation();
  return (
    <Styled.Section>
      <Styled.Wrapper>
        <Styled.Picture src={picture} />
        <Styled.User>
          <Styled.Name>
            {username}
            <Styled.ID>
              {`@${loginId}`}
            </Styled.ID>
          </Styled.Name>
          {children || (
            <Styled.Description>
              {`${t('가입일')} : ${moment(createdAt).format('ll')} (D+${moment().diff(moment(createdAt), 'days')})`}
            </Styled.Description>
          )}
        </Styled.User>
      </Styled.Wrapper>
    </Styled.Section>
  );
}

UserInfo.propTypes = {
  picture: PropTypes.string,
  username: PropTypes.string.isRequired,
  loginId: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default UserInfo;
