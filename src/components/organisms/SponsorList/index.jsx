import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import moment from 'moment';
import 'moment/locale/ko';
import i18n from 'language/i18n';
import { useTranslation } from 'react-i18next';

import placeholder from 'styles/placeholder';

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
    border-bottom: 1px solid var(--gray--pale);
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
    ${placeholder}
  `,
  UserId: styled.span`
    margin-left: 4px;
    color: var(--gray);
    font-size: var(--font-size--small);
    ${placeholder}
  `,
  Tier: styled.span`
    font-size: var(--font-size--small);
    color: #999999;
    ${placeholder}
  `,
  SubscriptionDate: styled.span`
    margin-left: auto;
    color: var(--gray);
    font-size: var(--font-size--small);
    text-align: right;
    ${placeholder}
  `,
};

function SponsorList({ title, projectId }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const PageLanguage = i18n.language;

  const { data: { content: sponsors, ...pageable } = {} } = useSWR(
    `/my/projects/${projectId}/sponsors?page=${page}`,
  );

  return (
    <Styled.Container>
      <Heading>
        {`${title}(${pageable.totalElements || '-'})`}
      </Heading>
      <Styled.List>
        {sponsors ? (sponsors.map(subscription => (
          <Styled.Item key={subscription.sponsor.username}>
            <Styled.UserProfile
              image={subscription.sponsor.picture}
            />
            <Styled.Text>
              <Styled.UserName>
                {subscription.sponsor.username}
                <Styled.UserId>
                  {`@${subscription.sponsor.loginId}`}
                </Styled.UserId>
              </Styled.UserName>
              <Styled.Tier>
                {subscription.membership.level ? `${t('티어')} ${subscription.membership.level} - ${subscription.membership.name}` : `${t('구독')}`}
              </Styled.Tier>
            </Styled.Text>
            <Styled.SubscriptionDate>
              {((PageLanguage === 'ko') || (PageLanguage === 'undefined')) ? moment(subscription.startedAt).format('YYYY/MM/DD HH:mm') : moment(subscription.startedAt).format('MM/DD YYYY HH:mm')}
              <br />
              {((PageLanguage === 'ko') || (PageLanguage === 'undefined')) ? subscription.expireDate && moment(subscription.expireDate).format('~ YYYY/MM/DD HH:mm') : subscription.expireDate && moment(subscription.expireDate).format('~ MM/DD YYYY HH:mm')}
            </Styled.SubscriptionDate>
          </Styled.Item>
        ))) : Array.from({ length: 10 }, (_, i) => (
          <Styled.Item key={i}>
            <Styled.UserProfile />
            <Styled.Text>
              <Styled.UserName isPlaceholder>
                userName
                <Styled.UserId isPlaceholder>
                  userId
                </Styled.UserId>
              </Styled.UserName>
              <Styled.Tier isPlaceholder>
                tier
              </Styled.Tier>
            </Styled.Text>
            <Styled.SubscriptionDate isPlaceholder>
              0000/00/00 00:00
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

SponsorList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default SponsorList;
