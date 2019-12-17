import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import useSWR from 'swr';

import Grid, { MainGrid } from 'styles/Grid';
import media from 'styles/media';
import placeholder from 'styles/placeholder';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';

import { ReactComponent as CategoryIcon } from 'images/ic-category.svg';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-flow: column;
    width: 100%;
    margin: 40px 0;
    ${media.desktop`
      position: relative;
      margin: 30px 0 60px;
    `}
  `,
  Texts: styled.div`
    grid-column: 1 / -1;
    text-align: center;
  `,
  New: styled.p`
    color: var(--blue);
    font-family: var(--poppins);
    font-size: var(--font-size--small);
    ${media.desktop`
      font-size: 16px;
    `}
  `,
  Title: styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px 0 6px;
    font-family: var(--poppins);
    font-size: 24px;
    letter-spacing: 6px;
    ${media.desktop`
      font-size: 28px;
    `}
  `,
  CategoryIcon: styled(CategoryIcon)`
    width: 20px;
    height: 20px;
    margin-right: 4px;
    ${media.desktop`
      width: 24px;
      height: 24px;
      margin-right: 8px;
    `}
  `,
  SubTitle: styled.p`
    color: #999999;
    ${media.desktop`
      font-size: var(--font-size--small);
    `}
  `,
  List: styled(Grid).attrs(() => ({
    columns: 5,
    as: 'ul',
  }))`
    grid-column: 1 / -1;
    ${media.mobile`
      --column-gap: 16px;
      grid-template-columns: auto;
      grid-auto-flow: column;
      grid-auto-columns: 180px;
      margin: 0 calc(-1 * var(--outer-gap));
      padding: 20px 0;
      overflow-x: scroll;
      scroll-snap-type: x proximity;
      scroll-padding: var(--column-gap);
      -webkit-overflow-scrolling: touch;
      &::before, &::after {
        content: '';
        width: 1px;
      }
    `}
    ${media.desktop`
      --column-gap: 36px;
      margin-top: 28px;
    `}
  `,
  ListItem: styled.li`
    scroll-snap-align: start;
    overflow: hidden;
    text-align: center;
    ${media.desktop`
      grid-column: span 1;
    `}
  `,
  Thumbnail: styled(Thumbnail)`
    margin-bottom: 16px;
    border-radius: 50%;
  `,
  CategoryName: styled.p`
    ${placeholder}
    margin-bottom: 4px;
    font-size: var(--font-size--base);
    font-weight: bold;
  `,
  Count: styled.p`
    ${placeholder}
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

const Category = (props) => {
  const { data: categories } = useSWR('/categories/', { revalidateOnFocus: false });

  return (
    <Styled.Container {...props}>
      <MainGrid>
        <Styled.Texts>
          <Styled.New>New</Styled.New>
          <Styled.Title>
            <Styled.CategoryIcon />
            CATEGORY
          </Styled.Title>
          <Styled.SubTitle>
             원하는 카테고리로 픽션 프로젝트를 탐색해 보세요.
          </Styled.SubTitle>
        </Styled.Texts>
        <Styled.List>
          {categories ? categories.map(category => (
            <Styled.ListItem key={category.id}>
              <Link to={`/category/${category.id}`}>
                <Styled.Thumbnail image={category.thumbnail} />
                <Styled.CategoryName>
                  {category.name}
                </Styled.CategoryName>
                <Styled.Count>
                  {`${category.categorizedCount} 프로젝트 `}
                </Styled.Count>
              </Link>
            </Styled.ListItem>
          )) : [...new Array(5)].map(() => (
            <Styled.ListItem>
              <Styled.Thumbnail />
              <Styled.CategoryName isPlaceholder>
                category.name
              </Styled.CategoryName>
              <Styled.Count isPlaceholder>
                0 프로젝트
              </Styled.Count>
            </Styled.ListItem>
          ))}
        </Styled.List>
      </MainGrid>
    </Styled.Container>
  );
};


export default Category;
