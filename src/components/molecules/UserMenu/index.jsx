import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import ContentImage from 'components/atoms/ContentImage';

import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

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
    font-size: var(--font-size--base);
    font-weight: bold;
  `,
  Project: styled.a`
    display: flex;
    padding: 8px 16px;
    transition: background-color var(--transition--form);

    &:hover {
      background-color: var(--gray--light);
    }
  `,
  Thumbnail: styled(ContentImage)`
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
  useEffect(() => {
    const getProjects = async () => {
      const { data } = await API.my.projects();
      setProjects(data);
    };

    getProjects();
  }, [API]);
  return (
    <>
      <Styled.Section>
        <Styled.Title>
          내 지갑
        </Styled.Title>
        <Styled.PXL>
          {`${PXL.toLocaleString()} PXL`}
        </Styled.PXL>
      </Styled.Section>
      {projects.length > 0 && (
        <Styled.Section>
          <Styled.Title>
            내 프로젝트
          </Styled.Title>
          {projects.map(project => (
            <Styled.Project href={`/project/${project.uri}`} key={project.id}>
              <Styled.Thumbnail
                ratio={500 / 500}
                image={project.thumbnail || dummyThumbnailImage}
              />
              <Styled.ProjectTexts>
                <Styled.ProjectTitle>
                  {project.title}
                </Styled.ProjectTitle>
                <Styled.ProjectInfo>
                  구독자 123
                </Styled.ProjectInfo>
              </Styled.ProjectTexts>
            </Styled.Project>
          ))}
        </Styled.Section>
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
