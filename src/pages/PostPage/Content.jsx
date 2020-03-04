import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Location, Link } from '@reach/router';
import moment from 'moment';
import 'moment/locale/ko';

import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';
import ContentStyle from 'styles/ContentStyle';
import { ReactComponent as LockedIcon } from 'images/ic-locked.svg';

import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Content: styled.div`
    ${ContentStyle}
  `,
  Subscription: styled(PrimaryButton)`
    margin-top: 24px;
  `,
  Date: styled.p`
    margin-top: var(--row-gap);
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Required: styled.strong`
    color: var(--black);
    font-weight: bold;
  `,
  Locked: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    color: var(--gray--dark);
    line-height: var(--line-height--content);
    text-align: center;
    word-break: keep-all;
    ${media.desktop`
      margin: 96px 0;
    `}
  `,
  LockedIcon: styled(LockedIcon)`
    width: 104px;
    height: 104px;
    margin-bottom: 8px;
    path {
      fill: var(--gray--light);
    }
    ${media.desktop`
      margin-bottom: 24px;
    `}
  `,
};

function Content({ publishedAt, content, readerMode }) {
  const readerModeStyle = {
    fontFamily: 'RIDIBatang, serif',
    textAlign: 'justify',
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
    lineHeight: 2.5,
  };
  return (
    <>
      <Styled.Content
        style={readerMode ? readerModeStyle : null}
        dangerouslySetInnerHTML={{
          __html: content.content,
        }}
      />
      <Styled.Date>
        {`${moment(publishedAt).format('ll HH:mm')} 발행`}
      </Styled.Date>
    </>
  );
}

Content.propTypes = {
  publishedAt: PropTypes.number,
  content: PropTypes.string,
  readerMode: PropTypes.bool,
};

Content.Placeholder = () => {
  const widths = ['100%', '70%', '80%', '95%', '60%'];

  return (
    <>
      <Styled.Content>
        {widths.map(width => (
          <div
            key={width}
            style={{
              backgroundColor: 'var(--gray--light)',
              color: 'var(--gray--light)',
              height: '1.5em',
              width: `${width}`,
              marginBottom: '1em',
            }}
          />
        ))}
      </Styled.Content>
      <Styled.Date />
    </>
  );
};

function LockedContent({ handleSubscription, post }) {
  const { currentUser } = useCurrentUser();
  const hasPrice = post?.membership.price > 0;

  return (
    <Styled.Locked>
      <Styled.LockedIcon />
      {hasPrice ? (
        <p>
          <Styled.Required>
            {post.membership.name}
          </Styled.Required>
          {' '}
          이상
          <br />
          후원자만 이용 가능한 포스트입니다.
        </p>
      ) : (
        <p>
          <Styled.Required>
            구독자
          </Styled.Required>
          만 이용 가능한
          <br />
          포스트입니다.
        </p>
      )}
      {currentUser ? (
        hasPrice ? (
          <Styled.Subscription
            as={Link}
            to="../../memberships"
            state={{ post }}
          >
            후원하기
          </Styled.Subscription>
        ) : (
          <Styled.Subscription
            onClick={handleSubscription}
          >
            구독하기
          </Styled.Subscription>
        )
      ) : (
        <Location>
          {({ location }) => (
            <Styled.Subscription
              as={Link}
              to="/login"
              state={{
                redirectTo: encodeURIComponent(location.pathname),
              }}
            >
              {hasPrice ? '후원하기' : '구독하기'}
            </Styled.Subscription>
          )}
        </Location>
      )}
    </Styled.Locked>
  );
}

LockedContent.propTypes = {
  handleSubscription: PropTypes.func,
  post: PropTypes.object,
};

Content.Locked = LockedContent;

export default Content;
