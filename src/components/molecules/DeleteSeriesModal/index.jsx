import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import Modal from 'components/externals/Modal';
import { PrimaryButton, TertiaryButton } from 'components/atoms/Button';

const Styled = {
  Text: styled.p`
    margin-bottom: 24px;
    line-height: var(--line-height--content);
    text-align: center;
  `,
  Submit: styled(PrimaryButton)`
    margin-bottom: 8px;
  `,
};

function DeleteSeriesModal({
  projectId, seriesId, callback, close, ...props
}) {
  const [API] = useAPI();

  const handleDelete = async () => {
    try {
      await API.series(projectId).delete({ seriesId });
      await callback(prev => prev.filter(series => series.id !== seriesId));
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal close={close} {...props}>
      <Styled.Text>
        선택한 시리즈를 삭제하시겠습니까?
        <br />
        (포스트는 삭제되지 않습니다.)
      </Styled.Text>
      <Styled.Submit onClick={handleDelete}>
        확인
      </Styled.Submit>
      <TertiaryButton onClick={close} autoFocus>
        취소
      </TertiaryButton>
    </Modal>
  );
}

DeleteSeriesModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  seriesId: PropTypes.number,
  callback: PropTypes.func,
  close: PropTypes.func.isRequired,
};

export default DeleteSeriesModal;
