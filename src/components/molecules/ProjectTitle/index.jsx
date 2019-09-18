import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import media from 'styles/media';

import { ReactComponent as Logo } from 'images/piction-symbol.svg';
import { ReactComponent as PeopleIcon } from 'images/ic-people.svg';

const Styled = {
  Logo: styled(Logo)`
    display: flex;
    width: 15px;
    height: 20px;
    ${media.desktop`
      width: 30px;
      height: 40px;
    `}
  `,
  Title: styled.h1`
    margin-left: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${media.mobile`
      margin: 0 16px;
      font-size: var(--font-size--small);
    `}
  `,
  SubscriptionCount: styled.div`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    margin: 0 24px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${media.mobile`
      display: none;
    `}
  `,
  PeopleIcon: styled(PeopleIcon)`
    width: 20px;
    height: 20px;
    margin-right: 4px;

    path {
      fill: currentColor;
    }
  `,
};

function ProjectTitle({ project = {} }) {
  return (
    <>
      <Link to="/">
        <Styled.Logo />
      </Link>
      <Styled.Title>
        <Link to={`/project/${project.uri}`}>
          {project.title}
        </Link>
      </Styled.Title>
      <Styled.SubscriptionCount>
        <Styled.PeopleIcon />
        {`구독자 수 ${project.subscriptionUserCount}`}
      </Styled.SubscriptionCount>
    </>
  );
}

ProjectTitle.propTypes = {
  project: PropTypes.object,
};

export default ProjectTitle;
