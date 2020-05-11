import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';

import Grid, { MainGrid } from 'styles/Grid';
import media from 'styles/media';

import usePictionChoices from 'hooks/usePictionChoices';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';

import { ReactComponent as HelpIcon } from 'images/ic-help.svg';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-flow: column;
    width: 100%;
    padding-top: 16px;
    ${media.desktop`
      position: relative;
      margin-bottom: 60px;
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
  MainImage: styled(Link)`
    grid-column: 1 / -1;
    background-color: var(--gray--pale);
    ${media.mobile`
      margin: calc( -1 * var(--outer-gap));
    `}
    ${media.desktop`
      grid-column: 1 / 5;
      grid-row: span 2;
      margin-bottom: auto;
      box-shadow: 0 9px 12px 0 rgba(0, 0, 0, .15);
    `}
  `,
  Texts: styled.div`
    position: relative;
    ${media.mobile`
      z-index: 1;
      grid-column: 1 / -1;
      margin: -64px 0 20px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    font-family: var(--poppins);
    font-size: 14px;
    ${media.desktop`
      justify-content: flex-start;
      font-size: 16px;
    `}
  `,
  HelpButton: styled.button`
    display: flex;
    width: 16px;
    height: 16px;
    margin-left: 4px;
    color: var(--gray);
    cursor: pointer;
    ${media.desktop`
      width: 20px;
      height: 20px;
    `}
    svg {
      width: 100%;
      height: 100%;
    }
  `,
  Tooltip: styled.div`
    position: absolute;
    z-index: 10;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 var(--shadow-color);
    background-color: rgba(255, 255, 255, .9);
    font-size: var(--font-size--tiny);
    ${media.mobile`
      top: -50px;
      right: 0;
    `}
    ${media.desktop`
      top: -72px;
      left: 56px;
      text-align: center;
    `}
  `,
  PXL: styled.strong`
    color: var(--blue);
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
    overflow: hidden;
    list-style: none;
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
  const { collection } = usePictionChoices();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return collection ? (
    <Styled.Container {...props}>
      <MainGrid>
        <Styled.MainImage to={collection.uri ? `/project/${collection.uri}` : ''}>
          <Thumbnail image={collection.thumbnail} />
        </Styled.MainImage>
        <Styled.Texts>
          <Styled.Name>
            Piction’s Choice
            <Styled.HelpButton onClick={() => setIsTooltipVisible(prev => !prev)}>
              <HelpIcon />
            </Styled.HelpButton>
          </Styled.Name>
          <Styled.Title>
            {collection.title}
          </Styled.Title>
          <Styled.SubTitle>
            {collection.subTitle}
          </Styled.SubTitle>
          {isTooltipVisible && (
            <Styled.Tooltip onClick={() => setIsTooltipVisible(false)}>
              매주 화, 금요일마다 선정된
              <br />
              5명의 창작자에게
              {' '}
              <Styled.PXL>500PXL</Styled.PXL>
              을 드려요!
            </Styled.Tooltip>
          )}
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
  ) : <Choice.Placeholder {...props} />;
};

const Placeholder = {
  ProjectTitle: styled(Styled.ProjectTitle)`
    background-color: var(--gray--pale);
    color: var(--gray--pale);
  `,
};

Choice.Placeholder = props => (
  <Styled.Container {...props}>
    <MainGrid>
      <Styled.MainImage to="#">
        <Thumbnail />
      </Styled.MainImage>
      <Styled.Texts />
      <Styled.ProjectList>
        {[...new Array(4)].map(() => (
          <Styled.ProjectListItem>
            <Styled.Project to="#">
              <Thumbnail />
              <Placeholder.ProjectTitle>project.title</Placeholder.ProjectTitle>
            </Styled.Project>
          </Styled.ProjectListItem>
        ))}
      </Styled.ProjectList>
    </MainGrid>
  </Styled.Container>
);

export default Choice;
