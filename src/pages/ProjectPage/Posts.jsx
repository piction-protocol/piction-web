import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import media from 'styles/media';

import WideProjectCard from 'components/molecules/WideProjectCard';
import SeriesCard from 'components/molecules/SeriesCard';

const PostList = React.lazy(() => import('components/organisms/PostList'));

const Styled = {
  Section: styled.section`
    grid-column: 1 / -1;
    grid-row: span 3;
    ${media.desktop`
      grid-column: span 9;
    `}
  `,
  Aside: styled.aside`
    display: flex;
    flex-flow: column;
    grid-column: span 3;
    grid-row: span 1;
    > *:not(:last-child) {
      margin-bottom: 16px;
    }
  `,
  CardText: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

const Posts = ({
  projectId, project, subscription, isDesktop, series, recommendedProjects,
}) => (
  <>
    <Styled.Section>
      <PostList
        isSubscribing={project.isMine || subscription.isSubscribing}
        projectId={projectId}
      />
    </Styled.Section>
    {isDesktop && (
      <>
        {series.reduce((acc, item) => acc + item.postCount, 0) > 0 && (
          <Styled.Aside>
            <h2>시리즈</h2>
            {series.map(item => item.postCount > 0 && (
              <Link
                to={`/project/${projectId}/series/${item.id}`}
                key={item.id}
              >
                <SeriesCard {...item} />
              </Link>
            ))}
          </Styled.Aside>
        )}
        {recommendedProjects.length > 0 && (
          <Styled.Aside>
            <h2>추천 프로젝트</h2>
            {recommendedProjects.map(recommendedProject => (
              <Link
                to={`/project/${recommendedProject.uri}`}
                key={recommendedProject.id}
              >
                <WideProjectCard
                  {...recommendedProject}
                >
                  <Styled.CardText>
                    {`구독자 수 ${recommendedProject.subscriptionUserCount}`}
                  </Styled.CardText>
                </WideProjectCard>
              </Link>
            ))}
          </Styled.Aside>
        )}
      </>
    )}
  </>
);

Posts.propTypes = {
  projectId: PropTypes.string,
  project: PropTypes.object,
  subscription: PropTypes.object,
  isDesktop: PropTypes.bool,
  series: PropTypes.array,
  recommendedProjects: PropTypes.array,
};

export default Posts;
