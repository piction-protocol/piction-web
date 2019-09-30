import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import useAPI from 'hooks/useAPI';

import Pagination from 'components/molecules/Pagination';
import ContentImage from 'components/atoms/ContentImage';
import Heading from 'components/atoms/Heading';

import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
    padding: 24px 0 48px;
    > * {
      margin-bottom: var(--row-gap);
    }
  `,
  List: styled.div`
    display: flex;
    flex-flow: column;
    > * {
      margin-bottom: 8px;
    }
  `,
  Item: styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--gray--light);
  `,
  UserPicture: styled(ContentImage)`
    width: 56px;
    margin-right: 16px;
    border-radius: 50%;
  `,
  UserName: styled.span`
    margin-right: 16px;

  `,
  UserId: styled.span`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  SubscriptionDate: styled.span`
    margin-left: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
};

function UserList({ title, projectId }) {
  const [subscribers, setSubscribers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState({
    totalElements: '',
  });
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getFormData = async () => {
      const { data: { content, ...pageableData } } = await API.my.projectSubscriptions({
        projectId,
        params: { size: 2, page },
      });
      setSubscribers(content);
      setPageable(pageableData);
    };

    getFormData();
  }, [API, projectId, page]);

  return (
    <Styled.Container>
      <Heading>
        {`${title}(${pageable.totalElements})`}
      </Heading>
      <Styled.List>
        {subscribers.map(subscriber => (
          <Styled.Item key={subscriber.user.username}>
            <Styled.UserPicture
              image={subscriber.user.picture || dummyThumbnailImage}
              ratio={500 / 500}
            />
            <Styled.UserName>
              {subscriber.user.username}
            </Styled.UserName>
            <Styled.UserId>
              {`@${subscriber.user.loginId}`}
            </Styled.UserId>
            <Styled.SubscriptionDate>
              {moment(subscriber.subscriptionDate).format('YYYY/MM/DD HH:mm')}
            </Styled.SubscriptionDate>
          </Styled.Item>
        ))}
      </Styled.List>
      <Pagination
        number={pageable.number}
        totalPages={pageable.totalPages}
        setPage={setPage}
        delta={2}
      />
    </Styled.Container>
  );
}

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default UserList;
