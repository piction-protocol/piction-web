import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
import axios from 'axios';

import { mediaQuery } from 'styles/media';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';
import { SecondaryButton } from 'components/atoms/Button';

const Styled = {
  Section: styled.section`
    display: flex;
    flex-flow: column;
    padding: 16px 0;
    border-bottom: 1px solid var(--gray--light);
  `,
  Title: styled.h2`
    margin-left: 16px;
    margin-bottom: 4px;
    color: var(--black);
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
  PXL: styled.span`
    margin-left: 16px;
    color: var(--blue);
    font-family: 'Poppins', sans-serif;
    font-size: 22px;
    font-weight: bold;
  `,
  Won: styled.span`
    margin-top: 4px;
    margin-left: 16px;
    color: #999999;
    font-size: var(--font-size--small);
  `,
  Project: styled(Link)`
    display: flex;
    padding: 8px 16px;
    transition: background-color var(--transition--form);

    &:hover {
      background-color: var(--gray--light);
    }
  `,
  Thumbnail: styled(Thumbnail)`
    flex: 0 0 auto;
    width: 40px;
    margin-right: 12px;
    border-radius: 50%;
  `,
  ProjectTexts: styled.div`
    overflow: hidden;
  `,
  ProjectTitle: styled.p`
    margin-bottom: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--font-size--small);
    white-space: nowrap;
  `,
  ProjectInfo: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--tiny);
  `,
  SecondaryButton: styled(SecondaryButton).attrs(() => ({
    as: Link,
  }))`
    margin: 16px 16px 0 16px;
  `,
  Links: styled.div`
    display: flex;
    flex-flow: column;
  `,
  Link: styled(Link)`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: var(--black);
    font-size: var(--font-size--small);
    cursor: pointer;
    transition: background-color var(--transition--form);

    svg {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    &:hover {
      background-color: var(--gray--light);
    }
  `,
};

function UserMenu({
  links, PXL,
}) {
  const [API] = useCallback(useAPI(), []);
  const [projects, setProjects] = useState([]);
  const { currentUser } = useCurrentUser();
  const isDesktop = useMedia(mediaQuery.desktop);
  const [won, setWon] = useState(0);

  useEffect(() => {
    const getProjects = async () => {
      const { data } = await API.my.projects();
      setProjects(data);
    };

    const getWon = async () => {
      const { data } = await axios.get('https://api.coinone.co.kr/ticker/', {
        params: {
          currency: 'PXL',
        },
      });
      setWon(data.last * PXL);
    };

    getProjects();

    if (PXL) {
      getWon();
    }
  }, [API, PXL]);

  return (
    <>
      {currentUser && (
        <>
          <Styled.Section>
            <Styled.Title>
              내 지갑
            </Styled.Title>
            <Styled.PXL>
              {`${PXL.toLocaleString()} PXL`}
            </Styled.PXL>
            {won > 0 && (
              <Styled.Won>
                {`≒ ${Math.floor(won).toLocaleString()} 원`}
              </Styled.Won>
            )}
          </Styled.Section>
          <Styled.Section>
            {projects.length > 0 && (
              <>
                <Styled.Title>
                  내 프로젝트
                </Styled.Title>
                {projects.map(project => (
                  <Styled.Project to={`/project/${project.uri}`} key={project.id}>
                    <Styled.Thumbnail image={project.thumbnail} />
                    <Styled.ProjectTexts>
                      <Styled.ProjectTitle>
                        {project.title}
                      </Styled.ProjectTitle>
                      <Styled.ProjectInfo>
                        {`구독자 ${project.subscriptionUserCount}`}
                      </Styled.ProjectInfo>
                    </Styled.ProjectTexts>
                  </Styled.Project>
                ))}
              </>
            )}
            {isDesktop && (
              <Styled.SecondaryButton to="/dashboard">
                {projects.length > 0 ? '크리에이터 대시보드' : '+ 새 프로젝트 만들기'}
              </Styled.SecondaryButton>
            )}
          </Styled.Section>
        </>
      )}
      <Styled.Links>
        {links.map(({
          icon, text, ...link
        }) => (
          <Styled.Link key={text} {...link}>
            {icon}
            {text}
          </Styled.Link>
        ))}
      </Styled.Links>
    </>
  );
}

export default UserMenu;

UserMenu.propTypes = {
  links: PropTypes.array.isRequired,
  PXL: PropTypes.number,
};

UserMenu.defaultProps = {
  PXL: 0,
};
