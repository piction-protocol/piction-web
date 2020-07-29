import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';

import { ReactComponent as deletemark } from 'images/ic-cancel.svg';

const Styled = {
  ImgWrap: styled.div`
    margin-top: 25px;
    margin-left: 17px;
  `,
  Img: styled.div`
    width: 144px;
    height: 144px;
    border: 1px solid gray;
    position: relative;
    background: url(${props => props.previewImg});
    background-size: cover;
  `,
  Delete: styled(deletemark)`
    width: 32px;
    height: 32px;
    background-color: black;
    position: absolute;
    right: 0;
    cursor: pointer;
  `,
};

function MultiImageItem({
  previewImg, indexId, imgUrl, setImgUrl, findImg, moveImg, id,
}) {
  const originalIndex = findImg(id).index;
  const [, drop] = useDrop({
    accept: 'image',
    drop: ({ id: draggedId }) => {
      if (draggedId !== id) {
        const { index: hoverIndex } = findImg(id);
        moveImg(draggedId, hoverIndex);
      }
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'image', id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const deleteImg = () => {
    imgUrl.splice(indexId, 1);
    setImgUrl(imgUrl.filter(img => img !== imgUrl));
  };

  return (
    <Styled.ImgWrap
      ref={node => preview(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <Styled.Img ref={drag} previewImg={previewImg}>
        <Styled.Delete onClick={() => deleteImg(indexId)} />
      </Styled.Img>
    </Styled.ImgWrap>
  );
}

MultiImageItem.propTypes = {
  previewImg: PropTypes.string,
  indexId: PropTypes.number,
  id: PropTypes.string,
  imgUrl: PropTypes.array,
  setImgUrl: PropTypes.func,
  findImg: PropTypes.func,
  moveImg: PropTypes.func,
};

export default MultiImageItem;
