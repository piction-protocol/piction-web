import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as UnlockIcon } from 'images/ic-unlock.svg';

const Styled = {
  Item: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    padding: 40px;
    border: 1px solid #e8e8e8;
    background-color: var(--white);
  `,
  Level: styled.p`
    margin-bottom: 8px;
    color: #999999;
  `,
  Name: styled.h2`
    margin-bottom: 8px;
    font-size: var(--font-size--big);
    font-weight: bold;
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
  `,
};

function FanPass({
  level, name, postCount, description, className, children,
}) {
  return (
    <Styled.Item
      className={className}
    >
      <Styled.Level>
        {level ? `티어 ${level}` : '무료 티어'}
      </Styled.Level>
      <Styled.Name>
        {name}
      </Styled.Name>
      <Styled.PostCount>
        <Styled.UnlockIcon />
        {`${postCount} 포스트 조회 가능`}
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

FanPass.propTypes = {
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  postCount: PropTypes.number,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default FanPass;
