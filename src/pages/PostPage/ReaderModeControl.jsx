import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/atoms/Button';

import { ReactComponent as AlignIcon } from './ic-align-left.svg';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 24px;
  `,
  Label: styled.span`
    color: #bfbfbf;
    font-size: 14px;
    margin-right: 16px;
    display: flex;
  `,
  ReaderModeToggle: styled(Button)`
    padding: 6px 20px;
    font-size: 12px;
    font-weight: normal;
    color: var(--gray--dark);
    background-color: var(--white);
    box-shadow: 0 1px 2px 0 var(--shadow-color);
    &:hover {
      box-shadow: 0 2px 4px 0 var(--shadow-color);
    }
  `,
  AlignIcon: styled(AlignIcon)`
    margin-right: 8px;
  `,
};

const ReaderModeControl = ({ readerMode, onToggle }) => (
  <Styled.Wrapper>
    <Styled.Label>
      <Styled.AlignIcon />
      읽기모드
    </Styled.Label>
    <Styled.ReaderModeToggle
      style={{
        backgroundColor: (readerMode ? null : 'var(--gray--light)'),
      }}
      size="mini"
      onClick={() => onToggle(false)}
    >
      일반
    </Styled.ReaderModeToggle>
    <Styled.ReaderModeToggle
      style={{
        backgroundColor: (readerMode ? 'var(--gray--light)' : null),
      }}
      size="mini"
      onClick={() => onToggle(true)}
    >
      읽기
    </Styled.ReaderModeToggle>
  </Styled.Wrapper>
);

ReaderModeControl.propTypes = {
  readerMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ReaderModeControl;
