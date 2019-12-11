import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import media from 'styles/media';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';
import useCPR from 'hooks/useCPR';
import { ReactComponent as CPRIcon } from './ic-cpr.svg';

const Styled = {
  Item: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    background-color: var(--white);
  `,
  Text: styled.div`
    display: flex;
    flex: 1;
    flex-flow: column;
    padding: 16px 0 0;
    ${media.desktop`
      padding: 16px 0;
    `}
  `,
  Title: styled.h3`
    margin-bottom: 4px;
    font-size: var(--font-size--small);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${media.desktop`
      margin-bottom: 8px;
      font-size: var(--font-size--base);
    `}
  `,
  Labels: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    font-family: var(--poppins);
    ${media.mobile`
      > div:not(:first-child) {
        display: none;
      }
    `}
  `,
  UpdateLabel: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    background-color: rgba(51, 51, 51, 0.95);
    color: var(--white);
    font-size: var(--font-size--small);
  `,
  CPRLabel: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    background-color: rgba(255, 96, 118, 0.95);
    color: var(--white);
    font-size: var(--font-size--small);
    > svg {
      margin-right: 4px;
    }
  `,
};

function ProjectCard({
  uri, title, thumbnail, lastPublishedAt, children, ...props
}) {
  const isCPRProject = useCPR(uri);

  return (
    <Styled.Item
      {...props}
    >
      <Thumbnail image={thumbnail} />
      <Styled.Text>
        <Styled.Title>{title}</Styled.Title>
        {children}
        <Styled.Labels>
          {moment().diff(lastPublishedAt, 'days') < 1 && (
            <Styled.UpdateLabel>
              UPDATE
            </Styled.UpdateLabel>
          )}
          {isCPRProject && (
            <Styled.CPRLabel>
              <CPRIcon />
              <span>CPR</span>
            </Styled.CPRLabel>
          )}
        </Styled.Labels>
      </Styled.Text>
    </Styled.Item>
  );
}

const Placeholder = {
  Title: styled(Styled.Title)`
    background-color: var(--gray--light);
    color: var(--gray--light);
  `,
};

ProjectCard.Placeholder = () => (
  <Styled.Item>
    <Thumbnail />
    <Styled.Text>
      <Placeholder.Title>Project</Placeholder.Title>
    </Styled.Text>
  </Styled.Item>
);

ProjectCard.propTypes = {
  uri: PropTypes.string,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  lastPublishedAt: PropTypes.number,
  children: PropTypes.node,
};

export default ProjectCard;
