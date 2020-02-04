import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import moment from 'moment';
import 'moment/locale/ko';

import Pagination from 'components/molecules/Pagination';
import UserProfile from 'components/atoms/ContentImage/UserProfile';
import Heading from 'components/atoms/Heading';

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
  UserProfile: styled(UserProfile)`
    width: 56px;
    margin-right: 16px;
    border-radius: 50%;
  `,
  Text: styled.div``,
  UserName: styled.span`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  `,
  UserId: styled.span`
    margin-left: 4px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Tier: styled.span`
    font-size: var(--font-size--small);
    color: #999999;
  `,
  SubscriptionDate: styled.span`
    margin-left: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-align: right;
  `,
};

function UserList({ title, projectId }) {
  const [page, setPage] = useState(1);

  const { data: { content: subscriptions, ...pageable } } = useSWR(
    `/my/projects/${projectId}/subscriptions?page=${page}`,
    { suspense: true },
  );

  return (
    <Styled.Container>
      <Heading>
        {`${title}(${pageable.totalElements})`}
      </Heading>
      <Styled.List>
        {subscriptions ? (subscriptions.map(subscription => (
          <Styled.Item key={subscription.subscriber.username}>
            <Styled.UserProfile
              image={subscription.subscriber.picture}
            />
            <Styled.Text>
              <Styled.UserName>
                {subscription.subscriber.username}
                <Styled.UserId>
                  {`@${subscription.subscriber.loginId}`}
                </Styled.UserId>
              </Styled.UserName>
              <Styled.Tier>
                {`${subscription.fanPass.level ? `티어 ${subscription.fanPass.level}` : '무료 티어'} - ${subscription.fanPass.name}`}
              </Styled.Tier>
            </Styled.Text>
            <Styled.SubscriptionDate>
              {moment(subscription.startedAt).format('YYYY/MM/DD HH:mm')}
              <br />
              {subscription.expireDate && moment(subscription.expireDate).format('~ YYYY/MM/DD HH:mm')}
            </Styled.SubscriptionDate>
          </Styled.Item>
        ))) : (
          <div>
            placeholder temp
          </div>
        )}
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
