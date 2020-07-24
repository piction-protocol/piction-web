import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';


import { useDrag, useDrop } from 'react-dnd';

import { ReactComponent as deletemark } from 'images/ic-delete.svg';

const Styled = {
  Img: styled.div`
    margin-top: 25px;
    margin-left: 17px;
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
  previewImg, id, imgBase64, setImgBase64, findImg, moveImg,
}) {
  const originalIndex = findImg(id).index;
  const [, drop] = useDrop({
    accept: 'image',
    canDrop: () => false,
    hover({ id: draggedId }) {
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
    setImgBase64(imgBase64.filter(img => img !== imgBase64[id]));
  };

  return (
    <div
      ref={node => preview(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <Styled.Img
        previewImg={previewImg}
        ref={drag}
      >
        <Styled.Delete onClick={() => deleteImg(id)} />
      </Styled.Img>
    </div>
  );
}

MultiImageItem.propTypes = {
  previewImg: PropTypes.string,
  id: PropTypes.number,
  imgBase64: PropTypes.string,
  setImgBase64: PropTypes.string,
  findImg: PropTypes.func,
  moveImg: PropTypes.func,
};

export default MultiImageItem;
