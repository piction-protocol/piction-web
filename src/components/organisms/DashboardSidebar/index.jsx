import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

import { TertiaryButton } from 'components/atoms/Button';

import { ReactComponent as ExpandIcon } from 'images/ic-expand-more.svg';

const Styled = {
  Sidebar: styled.section`
    display: flex;
    flex-flow: column;
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

function DashboardSidebar() {
  const { currentUser, accessToken } = useCurrentUser();
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await axios.get('http://api-iro.piction.network/my/projects', {
          headers: {
            'X-Auth-Token': accessToken,
          },
        });
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, [accessToken]);

  return (
    <Styled.Sidebar>
      <Styled.Header>
        <Styled.Title>크리에이터 대시보드</Styled.Title>
        <Styled.Name>{currentUser.username}</Styled.Name>
      </Styled.Header>
      {projects && projects.map(project => (
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
              <Styled.Link to={`/dashboard/${project.uri}/posts`}>포스트 관리</Styled.Link>
              <Styled.Link to={`/dashboard/${project.uri}/series`}>시리즈 관리</Styled.Link>
              <Styled.Link to={`/dashboard/${project.uri}/sales`}>매출관리</Styled.Link>
              <Styled.Link to={`/dashboard/${project.uri}/info`}>프로젝트 정보 수정</Styled.Link>
              <Styled.Link to={`/project/${project.uri}`}>프로젝트로 이동</Styled.Link>
            </>
          )}
        </React.Fragment>
      ))}
      <Styled.Button as={Link} to="dashboard/new-project">
        새 프로젝트 만들기
      </Styled.Button>
    </Styled.Sidebar>
  );
}

DashboardSidebar.propTypes = {
};

DashboardSidebar.defaultProps = {
};

export default DashboardSidebar;
