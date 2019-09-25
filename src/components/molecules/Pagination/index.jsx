import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Pagination: styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    > *:not(:last-child) {
      margin-right: 12px;
    }
  `,
  Page: styled.button`
    width: 24px;
    height: 24px;
    cursor: pointer;
    ${({ isCurrent }) => isCurrent && `
      background-color: var(--black);
      color: var(--white);
    `}
  `,
};

function Pagination({
  number, totalPages, delta, setPage, ...props
}) {
  const currentPage = number + 1;
  const start = currentPage <= delta
    ? 1
    : currentPage > (totalPages - delta)
      ? totalPages - delta * 2
      : currentPage - delta;
  const length = totalPages > delta * 2 + 1 ? delta * 2 + 1 : totalPages;
  const pages = [...Array(length)].map((_, i) => i + (start > 1 ? start : 1));

  return (
    <Styled.Pagination {...props}>
      {pages.map(page => (
        <Styled.Page onClick={() => setPage(page)} key={page} isCurrent={page === currentPage}>
          {page}
        </Styled.Page>
      ))}
    </Styled.Pagination>
  );
}

export default Pagination;

Pagination.propTypes = {
  number: PropTypes.number,
  totalPages: PropTypes.number,
  delta: PropTypes.number,
  setPage: PropTypes.func,
};
