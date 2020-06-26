import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

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
    color: var(--gray);
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

const ReaderModeControl = ({ readerMode, onToggle }) => {
  const { t } = useTranslation();
  return (
    <Styled.Wrapper>
      <Styled.Label>
        <Styled.AlignIcon />
        {t('읽기모드')}
      </Styled.Label>
      <Styled.ReaderModeToggle
        style={{
          backgroundColor: (readerMode ? null : 'var(--gray--pale)'),
        }}
        size="mini"
        onClick={() => onToggle(false)}
      >
        {t('일반')}
      </Styled.ReaderModeToggle>
      <Styled.ReaderModeToggle
        style={{
          backgroundColor: (readerMode ? 'var(--gray--pale)' : null),
        }}
        size="mini"
        onClick={() => onToggle(true)}
      >
        {t('읽기')}
      </Styled.ReaderModeToggle>
    </Styled.Wrapper>
  );
};

ReaderModeControl.propTypes = {
  readerMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ReaderModeControl;
