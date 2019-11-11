import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import Grid, { MainGrid } from 'styles/Grid';
import media from 'styles/media';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-flow: column;
    width: 100%;
    padding-top: 16px;
    ${media.desktop`
      position: relative;
      margin-bottom: 120px;
      padding-top: 80px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: -1;
        height: 235px;
        background-color: #f1f9ff;
      }
    `}
  `,
  MainImage: styled(Thumbnail)`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: 1 / 5;
      grid-row: span 2;
      box-shadow: 0 9px 12px 0 rgba(0, 0, 0, .15);
    `}
  `,
  Texts: styled.div`
    ${media.mobile`
      z-index: 1;
      grid-column: 1 / -1;
      margin: -64px var(--outer-gap) 20px;
      padding-top: 20px;
      background-color: var(--white);
      text-align: center;
    `}
    ${media.desktop`
      grid-column: 5 / -1;
      margin: 18px 0px 40px 20px;
    `}
  `,
  Name: styled.p`
    margin-bottom: 8px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    ${media.desktop`
      font-size: 16px;
    `}
  `,
  Title: styled.h2`
    margin-bottom: 8px;
    font-size: var(--font-size--base);
    ${media.desktop`
      margin-bottom: 12px;
      font-size: var(--font-size--large);
    `}
  `,
  SubTitle: styled.p`
    color: #999999;
    ${media.desktop`
      font-size: var(--font-size--small);
    `}
  `,
  ProjectList: styled(Grid).attrs(() => ({
    columns: 8,
    as: 'ul',
  }))`
    ${media.mobile`
      --column-gap: 12px;
      grid-column: 1 / -1;
      grid-template-columns: auto;
      grid-auto-flow: column;
      grid-auto-columns: calc(50% - var(--outer-gap) - var(--column-gap));
      margin: 0 calc(-1 * var(--outer-gap)) 16px;
      padding-bottom: 24px;
      overflow-x: scroll;
      scroll-snap-type: x proximity;
      scroll-padding: var(--column-gap);
      -webkit-overflow-scrolling: touch;
      &::before, &::after {
        content: '';
        width: calc(var(--outer-gap) - var(--column-gap));
      }
    `}
    ${media.desktop`
      grid-column: 5 / -1;
    `}
  `,
  ProjectListItem: styled.li`
    scroll-snap-align: start;
    ${media.desktop`
      grid-column: span 2;
    `}
  `,
  Project: styled(Link)`
    display: flex;
    flex-flow: column;
    ${media.desktop`
      margin-left: 20px;
    `}
  `,
  ProjectTitle: styled.span`
    margin-top: 12px;
    overflow: hidden;
    font-size: var(--font-size--small);
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${media.desktop`
      margin-top: 16px;
    `}
  `,
};

const Choice = (props) => {
  const [collection, setCollection] = useState(null);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    async function fetchProject() {
      const { data } = await API.collection.getActive({ params: { size: 4 } });
      setCollection(data);
    }

    fetchProject();
  }, [API]);

  return collection ? (
    <Styled.Container {...props}>
      <MainGrid>
        <Styled.MainImage
          image={collection.thumbnail}
        />
        <Styled.Texts>
          <Styled.Name>
            Piction’s Choice
          </Styled.Name>
          <Styled.Title>
            {collection.title}
          </Styled.Title>
          <Styled.SubTitle>
            {collection.subTitle}
          </Styled.SubTitle>
        </Styled.Texts>
        <Styled.ProjectList>
          {collection.projects.map(project => (
            <Styled.ProjectListItem key={project.id}>
              <Styled.Project to={`/project/${project.uri}`}>
                <Thumbnail image={project.thumbnail} />
                <Styled.ProjectTitle>{project.title}</Styled.ProjectTitle>
              </Styled.Project>
            </Styled.ProjectListItem>
          ))}
        </Styled.ProjectList>
      </MainGrid>
    </Styled.Container>
  ) : null;
};

export default Choice;
