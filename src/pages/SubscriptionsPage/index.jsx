import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import moment from 'moment';
import 'moment/locale/ko';
import useSWR, { useSWRPages } from 'swr';

import useCurrentUser from 'hooks/useCurrentUser';
import useOnScrollToBottom from 'hooks/useOnScrollToBottom';

import media from 'styles/media';

import { withLoginChecker } from 'components/LoginChecker';
import GridTemplate from 'components/templates/GridTemplate';
import UserInfo from 'components/organisms/UserInfo';
import NewsletterManager from 'components/organisms/NewsletterManager';
import ProjectCard from 'components/molecules/ProjectCard';
import Heading from 'components/atoms/Heading';

const Styled = {
  Heading: styled(Heading)`
    grid-column: 1 / -1;
    margin-top: var(--row-gap);
    text-align: center;
    ${media.desktop`
      grid-row: 1;
      padding-bottom: var(--row-gap);
      border-bottom: 1px solid var(--black);
      text-align: left;
    `}
  `,
  NewsletterManager: styled(NewsletterManager)`
    grid-column: 1 / -1;
    margin: 0 auto;
    ${media.desktop`
      grid-row: 1;
      margin: auto 0 auto auto;
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
  const listRef = useRef();

  const [totalSubscriptionCount, setTotalSubscriptionCount] = useState(0);

  const SubPage = ({ offset, withSWR }) => {
    const { data } = withSWR(
      useSWR(`my/sponsorships/projects?page=${offset + 1}&size=20`),
    );

    if (!data) {
      return [...new Array(4)].map(() => (
        <Styled.Link to="#">
          <ProjectCard.Placeholder />
        </Styled.Link>
      ));
    }

    setTotalSubscriptionCount(data.totalElements);
    return data.content.map(project => (
      <Styled.Link to={`/project/${project.uri}`} key={project.id}>
        <ProjectCard {...project}>
          {project.lastPublishedAt && (
            <Styled.CardText>
              {`${moment(project.lastPublishedAt).fromNow()} 업데이트`}
            </Styled.CardText>
          )}
        </ProjectCard>
      </Styled.Link>
    ));
  };

  function nextOffset({ data }) {
    if (data.last) return null;
    return data.pageable.pageNumber + 1;
  }

  const {
    pages, isLoadingMore, isReachingEnd, loadMore,
  } = useSWRPages(
    'my/sponsorships',
    SubPage,
    nextOffset,
    [],
  );

  useOnScrollToBottom(listRef, () => {
    if (isLoadingMore || isReachingEnd) return;
    loadMore();
  });

  return (
    <GridTemplate
      hero={<UserInfo {...currentUser} />}
      ref={listRef}
    >
      <Styled.Heading>
        {`구독 중인 프로젝트(${totalSubscriptionCount})`}
      </Styled.Heading>
      <Styled.NewsletterManager currentUser={currentUser} />
      {pages}
    </GridTemplate>
  );
}

export default withLoginChecker(SubscriptionsPage);
