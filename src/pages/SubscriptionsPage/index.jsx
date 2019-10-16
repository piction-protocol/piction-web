import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { Link, navigate } from '@reach/router';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import useAPI from 'hooks/useAPI';
import useCurrentUser from 'hooks/useCurrentUser';
import useOnScrollToBottom from 'hooks/useOnScrollToBottom';

import media from 'styles/media';

import GridTemplate from 'components/templates/GridTemplate';
import UserInfo from 'components/organisms/UserInfo';
import ProjectCard from 'components/molecules/ProjectCard';
import Heading from 'components/atoms/Heading';

const Styled = {
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    margin-top: var(--row-gap);
    text-align: center;
    ${media.desktop`
      padding-bottom: var(--row-gap);
      border-bottom: 1px solid var(--black);
      text-align: left;
    `}
  `,
  Link: styled(Link)`
    grid-column: span 3;
  `,
  CardText: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

function SubscriptionsPage() {
  const { currentUser } = useCurrentUser();
  const [projects, setProjects] = useState([]);
  const [pageable, setPageable] = useState({});
  const [page, setPage] = useState(1);
  const [API] = useCallback(useAPI(), []);
  const listRef = useRef(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data: { content: projectsData, ...pageableData } } = await API.my.subscriptions({
          params: { page, size: 20 },
        });

        setPageable(pageableData);

        if (pageableData.first) {
          setProjects(projectsData);
        } else {
          setProjects(prev => [...prev, ...projectsData]);
        }
      } catch (error) {
        navigate('/404');
      }
    };

    getProjects();
  }, [API, page]);

  useOnScrollToBottom(listRef, () => {
    if (!pageable.last) {
      setPage(prev => prev + 1);
    }
  });

  return (
    <GridTemplate
      hero={(
        <UserInfo
          {...currentUser}
        />
      )}
      ref={listRef}
    >
      <Styled.Heading>
        {`구독 중인 프로젝트(${pageable.totalElements || 0})`}
      </Styled.Heading>
      {projects.map(project => (
        <Styled.Link to={`/project/${project.uri}`} key={project.id}>
          <ProjectCard {...project}>
            {project.lastPublishedAt && (
              <Styled.CardText>
                {`${moment(project.lastPublishedAt).fromNow()} 업데이트`}
              </Styled.CardText>
            )}
          </ProjectCard>
        </Styled.Link>
      ))}
    </GridTemplate>
  );
}

export default SubscriptionsPage;
