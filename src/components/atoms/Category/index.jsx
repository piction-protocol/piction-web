import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { ReactComponent as CategoryIcon } from 'images/ic-category.svg';

const Styled = {
  Category: styled(Link)`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #ddefff;
    color: var(--blue);
    font-size: var(--font-size--small);
  `,
  CategoryIcon: styled(CategoryIcon)`
    width: 18px;
    height: 18px;
    margin-right: 4px;
  `,
};

const Category = ({ id, children, ...props }) => (
  <Styled.Category to={`/category/${id}`} {...props}>
    <Styled.CategoryIcon />
    {children}
  </Styled.Category>
);

Category.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Category;
