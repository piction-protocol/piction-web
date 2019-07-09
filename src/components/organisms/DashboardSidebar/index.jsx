import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useCurrentUser from 'hooks/useCurrentUser';

import { TertiaryButton } from 'components/atoms/Button';

import { ReactComponent as ExpandIcon } from 'images/ic-expand-more.svg';

const Styled = {
  Sidebar: styled.section`
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: var(--gray--light);
  `,
  Header: styled.header`
    padding: 24px;
    background-color: var(--blue);
    color: var(--white);
    font-weight: bold;
  `,
  Title: styled.h2`
    margin-bottom: 4px;
    font-size: var(--font-size--normal);
  `,
  Name: styled.p`
    font-size: var(--font-size--small);
  `,
  Project: styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    cursor: pointer;
    text-align: left;
    ${({ isSelected }) => isSelected && `
      background-color: var(--white);
      font-weight: bold;
      > svg {
        transform: rotate(180deg);
      }
    `}
  `,
  Link: styled(Link)`
    display: flex;
    padding: 12px 40px;
    color: var(--gray--dark);
    &[aria-current] {
      color: var(--black);
    }
  `,
  Button: styled(TertiaryButton)`
    margin: 24px;
    text-align: center;
  `,
};

const isPartiallyActive = ({
  isPartiallyCurrent,
}) => (isPartiallyCurrent
  ? { 'aria-current': true } : null
);

function DashboardSidebar({ projects, ...props }) {
  const { currentUser } = useCurrentUser();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (projects.length) {
      setSelected(projects[0].uri);
    }
  }, [projects]);

  return (
    <Styled.Sidebar {...props}>
      <Styled.Header>
        <Styled.Title>크리에이터 대시보드</Styled.Title>
        <Styled.Name>{currentUser.username}</Styled.Name>
      </Styled.Header>
      {projects.map(project => (
        <React.Fragment key={project.uri}>
          <Styled.Project
            isSelected={project.uri === selected}
            onClick={() => setSelected(project.uri)}
          >
            {project.title}
            <ExpandIcon />
          </Styled.Project>
          {project.uri === selected && (
            <>
              <Styled.Link
                getProps={isPartiallyActive}
                to={`/dashboard/${project.uri}/posts`}
              >
                포스트 관리
              </Styled.Link>
              <Styled.Link to={`/dashboard/${project.uri}/info`}>프로젝트 정보 수정</Styled.Link>
              <Styled.Link to={`/project/${project.uri}`}>프로젝트로 이동</Styled.Link>
            </>
          )}
        </React.Fragment>
      ))}
      <Styled.Button as={Link} to="new-project">
        새 프로젝트 만들기
      </Styled.Button>
    </Styled.Sidebar>
  );
}

DashboardSidebar.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default DashboardSidebar;
