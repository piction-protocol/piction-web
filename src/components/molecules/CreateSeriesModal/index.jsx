import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import Modal from 'components/externals/Modal';
import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';
import ErrorMessage from 'components/atoms/ErrorMessage';
import Input from 'components/atoms/Input';

const Styled = {
  Text: styled.p`
    margin-bottom: 24px;
    text-align: center;
  `,
  Submit: styled(PrimaryButton)`
    margin: 16px 0 8px;
  `,
  ErrorMessage: styled(ErrorMessage)`
    margin-top: 16px;
  `,
};

function CreateSeriesModal({
  projectId, close, callback, ...props
}) {
  const [API] = useAPI();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async () => {
    try {
      const response = await API.series(projectId).create({ name });
      await callback(prev => ([...prev, response.data]));
      close();
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Modal close={close} {...props}>
      <Styled.Text>
        새 시리즈 추가
      </Styled.Text>
      <Input
        value={name}
        onChange={event => setName(event.target.value)}
        invalid={!!errorMessage}
      />
      {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
      <Styled.Submit onClick={handleCreate}>
        확인
      </Styled.Submit>
      <TertiaryButton onClick={close}>
        취소
      </TertiaryButton>
    </Modal>
  );
}

CreateSeriesModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  callback: PropTypes.func,
};

export default CreateSeriesModal;
