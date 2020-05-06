import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDrag, useDrop } from 'react-dnd';

import { ReactComponent as DragIndicatorIcon } from 'images/ic-drag-indicator.svg';
import { ReactComponent as EditIcon } from 'images/ic-edit.svg';
import { ReactComponent as DeleteIcon } from 'images/ic-delete.svg';

const Styled = {
  Item: styled.div`
    display: flex;
    align-items: center;
    border: 2px solid var(--gray);
    font-size: var(--font-size--small);
  `,
  Indicator: styled.div`
    display: flex;
    padding: 10px;
    border-right: 2px solid var(--gray);
    cursor: move;
  `,
  Name: styled.span`
    margin: 0 16px;
    font-weight: bold;
  `,
  Buttons: styled.div`
    display: flex;
    margin-left: auto;
  `,
  Button: styled.button.attrs({
    type: 'button',
  })`
    display: flex;
    padding: 10px;
    border-left: 2px solid var(--gray);
    cursor: pointer;
  `,
};

function SeriesItem({
  id, name, handleUpdate, handleDelete, moveSeries, findSeries, ...props
}) {
  const originalIndex = findSeries(id).index;
  const [, drop] = useDrop({
    accept: 'series',
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: hoverIndex } = findSeries(id);
        moveSeries(draggedId, hoverIndex);
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'series', id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Styled.Item
      ref={node => preview(drop(node))}
      style={{ opacity: isDragging ? 0 : 1 }}
      {...props}
    >
      <Styled.Indicator ref={drag}>
        <DragIndicatorIcon />
      </Styled.Indicator>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Buttons>
        <Styled.Button onClick={handleUpdate}>
          <EditIcon />
        </Styled.Button>
        <Styled.Button onClick={handleDelete}>
          <DeleteIcon />
        </Styled.Button>
      </Styled.Buttons>
    </Styled.Item>
  );
}

SeriesItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  moveSeries: PropTypes.func,
  findSeries: PropTypes.func,
};

export default SeriesItem;
