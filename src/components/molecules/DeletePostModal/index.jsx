import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import Modal from 'components/externals/Modal';
import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';

const Styled = {
  Text: styled.p`
    margin-bottom: 24px;
    text-align: center;
  `,
  Submit: styled(PrimaryButton)`
    margin-bottom: 8px;
  `,
};

function DeletePostModal({
  projectId, postId, close, ...props
}) {
  const [API] = useAPI();

  const handleDelete = async () => {
    try {
      await API.post(projectId).delete({ postId });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal close={close} {...props}>
      <Styled.Text>
        선택한 포스트를 삭제하시겠습니까?
      </Styled.Text>
      <Styled.Submit onClick={handleDelete}>
        확인
      </Styled.Submit>
      <TertiaryButton onClick={close}>
        취소
      </TertiaryButton>
    </Modal>
  );
}

DeletePostModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
};

export default DeletePostModal;
