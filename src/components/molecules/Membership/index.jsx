import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useTranslation, Trans } from 'react-i18next';

import media from 'styles/media';
import placeholder from 'styles/placeholder';

import { ReactComponent as UnlockIcon } from 'images/ic-unlock.svg';

const Styled = {
  Item: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    padding: 24px;
    border: 1px solid #e8e8e8;
    background-color: var(--white);
    font-size: var(--font-size--small);
    ${media.desktop`
      padding: 40px;
    `}
  `,
  Level: styled.p`
    margin-bottom: 8px;
    color: #999999;
    ${placeholder}
  `,
  Name: styled.h2`
    margin-bottom: 8px;
    font-size: var(--font-size--large);
    font-weight: bold;
    ${placeholder}
  `,
  PostCount: styled.p`
    color: var(--blue);
  `,
  UnlockIcon: styled(UnlockIcon)`
    margin-right: 4px;
    vertical-align: text-top;
  `,
  Description: styled.p`
    margin-top: 16px;
    color: #999999;
    ${placeholder}
  `,
};

function Membership({
  level, name, postCount, description, className, children, sponsorLimit,
}) {
  const { t } = useTranslation();
  return (
    <Styled.Item
      className={className}
    >
      <Styled.Level>
        {level ? `${t('티어')} ${level} ${sponsorLimit ? `- ${sponsorLimit}${t('명 한정')}` : ''} ` : `${t('무료 티어')}`}
      </Styled.Level>
      <Styled.Name>
        {name}
      </Styled.Name>
      <Styled.PostCount>
        <Styled.UnlockIcon />
        <Trans i18nKey="포스트 조회 가능">
          {`${postCount}`}
          {' '}
          {'포스트 조회 가능'}
        </Trans>
      </Styled.PostCount>
      {description && (
        <Styled.Description>
          {description}
        </Styled.Description>
      )}
      {children}
    </Styled.Item>
  );
}

Membership.propTypes = {
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  postCount: PropTypes.number,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  sponsorLimit: PropTypes.number,
};

Membership.Placeholder = ({ className, children }) => (
  <Styled.Item
    className={className}
  >
    <Styled.Level isPlaceholder>
      무료 티어
    </Styled.Level>
    <Styled.Name isPlaceholder>
      name
    </Styled.Name>
    <Styled.PostCount>
      <Styled.UnlockIcon />
      - 포스트 조회 가능
    </Styled.PostCount>
    <Styled.Description isPlaceholder>
      description
    </Styled.Description>
    {children}
  </Styled.Item>
);

Membership.Placeholder.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Membership;
