import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { MainGrid } from 'styles/Grid';
import media from 'styles/media';

import FullscreenPopup from 'components/atoms/FullscreenPopup';
import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';

import { ReactComponent as WarningIcon } from 'images/ic-warning-white.svg';

const Styled = {
  FullscreenPopup: styled(FullscreenPopup)`
    display: flex;
    background-color: rgba(0, 0, 0, .85);
    color: var(--white);
  `,
  Grid: styled(MainGrid).attrs({
    as: 'section',
  })`
    --row-gap: 8px;
    margin: auto;
    text-align: center;
    > * {
      grid-column: 1 / -1;
    }
  `,
  WarningIcon: styled(WarningIcon)`
    width: 104px;
    height: auto;
    margin: 0 auto;
  `,
  Heading: styled.h1`
    font-size: var(--font-size--large);
    font-weight: bold;
  `,
  Description: styled.p`
    grid-column: 2 / -2;
    width: 100%;
    margin-bottom: 16px;
    font-size: var(--font-size--small);
    text-align: center;
  `,
  Buttons: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: 2 / -2;
    ${media.desktop`
      grid-column: 5 / -5;
      flex-flow: row wrap;
      > * {
        flex: 1;
      }
    `}
  `,
  Link: styled(PrimaryButton).attrs({
    as: Link,
  })`
    ${media.mobile`
      margin-top: 16px;
    `}
    ${media.desktop`
      margin-left: 20px;
    `}
  `,
};

function AdultPopup({ close, ...props }) {
  return (
    <Styled.FullscreenPopup {...props}>
      <Styled.Grid>
        <Styled.WarningIcon />
        <Styled.Heading>WARNING</Styled.Heading>
        <Styled.Description>
          해당 프로젝트에는 민감한 콘텐츠가 포함되어 있을 수 있습니다.
          <br />
          19세 미만 청소년의 이용을 금합니다.
        </Styled.Description>
        <Styled.Buttons>
          <TertiaryButton onClick={close}>
            프로젝트 확인하기
          </TertiaryButton>
          <Styled.Link to="/">
            홈으로 돌아가기
          </Styled.Link>
        </Styled.Buttons>
      </Styled.Grid>
    </Styled.FullscreenPopup>
  );
}

export default AdultPopup;

AdultPopup.propTypes = {
  close: PropTypes.func.isRequired,
};
