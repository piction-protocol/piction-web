import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import media from 'styles/media';

import { ReactComponent as SortIcon } from 'images/ic-sort.svg';

import GridTemplate from 'components/templates/GridTemplate';
import SeriesPostItem from 'components/molecules/SeriesPostItem';
import Heading from 'components/atoms/Heading';

const Styled = {
  Hero: styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
    margin-bottom: 16px;
    ${media.desktop`
      max-height: 233px;
      margin-bottom: var(--row-gap);
    `}
    &::before {
      content: '';
      padding-top: 50%;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      ${({ image }) => (image ? `background-image: url(${image}), linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2));` : 'background-color: #333333;')}
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-blend-mode: overlay;
      transform: scale(1.1);
      filter: blur(10px);
    }
  `,
  HeroText: styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    z-index: 1;
    transform: translateY(-50%);
    color: var(--white);
    font-size: var(--font-size--small);
    text-align: center;
  `,
  Heading: styled(Heading)`
    margin-bottom: 8px;
  `,
  Section: styled.section`
    display: flex;
    grid-column: 1 / -1;
    flex-flow: column;
    ${media.desktop`
      grid-column: 3 / -3;
    `}
  `,
  Sort: styled.button.attrs({
    type: 'button',
  })`
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: var(--font-size--small);
    svg {
      margin-right: 4px;
    }
  `,
  SeriesPostList: styled.div`
    margin-top: 16px;
    border-top: 1px solid var(--black);
  `,
};

function SeriesPage({ projectId, seriesId }) {
  const [posts, setPosts] = useState([]);
  const [series, setSeries] = useState([]);
  const [isDescending, setIsDescending] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState({});
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getSeries = async () => {
      try {
        const { data: seriesData } = await API.series(projectId).get({ seriesId });
        setSeries(seriesData);
      } catch (error) {
        console.log(error);
      }
      setIsLoaded(true);
    };

    getSeries();
    return () => setIsLoaded(false);
  }, [API, projectId, seriesId]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const {
          data: { content: postsData, ...pageableData },
        } = await API.series(projectId).getPosts({
          seriesId, params: { isDescending, page, size: 2 },
        });
        setPosts(prevPosts => [...prevPosts, ...postsData]);
        setPageable(pageableData);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [API, projectId, seriesId, isDescending, page]);

  const calculateIndex = index => (isDescending ? (pageable.totalElements - index) : (index + 1));

  return isLoaded && (
    <GridTemplate
      hero={(
        <Styled.Hero
          image={series.thumbnails[0]}
        >
          <Styled.HeroText>
            <Styled.Heading>
              {series.name}
            </Styled.Heading>
            <p>
              {`${series.postCount} 포스트`}
            </p>
          </Styled.HeroText>
        </Styled.Hero>
      )}
    >
      <Styled.Section>
        <Styled.Sort onClick={() => {
          setPage(1);
          setIsDescending(prev => !prev);
        }}
        >
          <SortIcon />
          정렬 변경
        </Styled.Sort>
        <Styled.SeriesPostList>
          {posts.map((post, index) => (
            <Link key={post.id} to={`/project/${projectId}/posts/${post.id}`}>
              <SeriesPostItem index={calculateIndex(index)} {...post} />
            </Link>
          ))}
        </Styled.SeriesPostList>
      </Styled.Section>
    </GridTemplate>
  );
}

export default SeriesPage;

SeriesPage.propTypes = {
  projectId: PropTypes.string.isRequired,
};
