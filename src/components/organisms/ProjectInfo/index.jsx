import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, Location } from '@reach/router';

import { MainGrid } from 'styles/Grid';
import media, { mediaQuery } from 'styles/media';

import useMedia from 'hooks/useMedia';
import useCurrentUser from 'hooks/useCurrentUser';
import usePictionChoices from 'hooks/usePictionChoices';
import useCPR from 'hooks/useCPR';

import SynopsisPopup from 'components/molecules/SynopsisPopup';

import WideThumbnail from 'components/atoms/ContentImage/WideThumbnail';
import UserProfile from 'components/atoms/ContentImage/UserProfile';
import Heading from 'components/atoms/Heading';
import Category from 'components/atoms/Category';
import Tag from 'components/atoms/Tag';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import { ReactComponent as AccessTimeIcon } from 'images/ic-access-time.svg';
import { ReactComponent as InfoIcon } from 'images/ic-info.svg';
import { ReactComponent as SettingIcon } from 'images/ic-setting.svg';
import { ReactComponent as PeopleIcon } from 'images/ic-people.svg';
import { ReactComponent as ChoiceIcon } from './ic-piction-symbol-black.svg';
import { ReactComponent as CRPIcon } from './ic-cpr.svg';

const Styled = {
  Section: styled.section`
    display: flex;
    flex-flow: column;
    position: relative;
  `,
  WideThumbnail: styled(WideThumbnail)`
    background-color: var(--gray--light);
    ${media.desktop`
      max-height: 450px;
    `}
  `,
  MainGrid: styled(MainGrid)`
    row-gap: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    ${media.desktop`
      padding-top: 24px;
      padding-bottom: 24px;
    `}
  `,
  Text: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: 1 / 6;
    ${media.desktop`
      flex-flow: row wrap;
      grid-column: 2 / 10;
    `}
  `,
  HeadingWrapper: styled.div`
    grid-column: 1 / 6;
    margin-bottom: 4px;
    ${media.desktop`
      width: 100%;
      margin-bottom: 8px;
    `}
  `,
  Heading: styled(Heading)`
    display: inline;
    margin-right: 8px;
  `,
  SubscriptionCount: styled.div`
    display: inline-flex;
    align-items: center;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    ${media.mobile`
      position: absolute;
      top: 0;
      right: var(--outer-gap);
      margin-top: calc(50% - 16px);
      padding: 8px 12px;
      border-radius: 18px;
      background-color: rgba(0, 0, 0, .3);
      color: var(--white);
      transform: translateY(-100%);
    `}
  `,
  PeopleIcon: styled(PeopleIcon)`
    width: 20px;
    height: 20px;
    margin-right: 4px;

    path {
      fill: currentColor;
    }
  `,
  User: styled.p`
    display: flex;
    flex-flow: column;
    font-size: var(--font-size--small);
    font-weight: bold;
    ${media.desktop`
      flex-flow: row wrap;
      font-size: var(--font-size--base);
    `}
  `,
  UserId: styled.span`
    margin-top: 4px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    font-weight: normal
    ${media.desktop`
      margin-left: 8px;
    `}
  `,
  Synopsis: styled.p`
    width: 100%;
    margin-top: 8px;
    color: var(--gray--dark);
    line-height: var(--line-height--content);
  `,
  Tags: styled.div`
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    width: 100%;
    margin-top: 8px;
  `,
  Category: styled(Category)`
    margin-top: 8px;
    margin-right: 8px;
  `,
  Tag: styled(Tag)`
    margin-top: 8px;
    margin-right: 8px;
  `,
  InfoButton: styled.button`
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 var(--shadow-color);
  `,
  UserPictureWrapper: styled.div`
    grid-column: -2 / -1;
    ${media.desktop`
      grid-column: 1 / 2;
      grid-row: 1;
    `}
  `,
  UserProfile: styled(UserProfile)`
    border-radius: 50%;
    background-color: var(--gray--light);
  `,
  Aside: styled.div`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: span 3 / -1;
    `}
  `,
  Label: styled.div`
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--charcoal-black);
    font-size: 14px;
    ${media.desktop`
      font-size: 16px;
    `}
    > svg {
      margin-right: 4px;
      width: 18px;
      height: 18px;
      ${media.desktop`
        width: 24px;
        height: 24px;
      `}
    }
  `,
  Subscribe: styled.div`
    display: flex;
    align-items: flex-start;
  `,
  SubscribeButton: styled(PrimaryButton)`
    flex: 1 0;
    margin-bottom: 16px;
  `,
  UnsubscribeButton: styled(SecondaryButton)`
    flex: 1 0;
    margin-bottom: 16px;
  `,
  SettingButton: styled(PrimaryButton)`
    display: flex;
    flex: 0;
    padding: 14px;
    border-left: 1px solid var(--white);
  `,
  SubscribeInfo: styled.p`
    display: flex;
    margin: 0 auto;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  AccessTimeIcon: styled(AccessTimeIcon)`
    width: 20px;
    height: 20px;
    margin-right: 4px;
  `,
};

function ProjectInfo({
  project, hasFanPasses, handleSubscribe, isMyProject = false, subscription, ...props
}) {
  const { projects } = usePictionChoices();
  const isPictionChoice = projects && projects.includes(project.uri);
  const isCPRProject = useCPR(project.uri);
  const isDesktop = useMedia(mediaQuery.desktop);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { currentUser } = useCurrentUser();

  return (
    <Styled.Section {...props}>
      <Styled.WideThumbnail
        {...(isDesktop ? {
          width: null, height: null,
        } : {
          width: 720, height: 360,
        })}
        image={project.wideThumbnail}
      />
      <Styled.MainGrid>
        <Styled.Text>
          <Styled.HeadingWrapper>
            <Styled.Heading>
              {project.title}
            </Styled.Heading>
            <Styled.SubscriptionCount>
              <Styled.PeopleIcon />
              {`구독자 수 ${project.subscriptionUserCount}`}
            </Styled.SubscriptionCount>
          </Styled.HeadingWrapper>
          <Styled.User>
            {project.user.username}
            <Styled.UserId>
              {`@${project.user.loginId}`}
            </Styled.UserId>
          </Styled.User>
          {isDesktop ? (
            <>
              {project.synopsis && (
                <Styled.Synopsis>
                  {project.synopsis}
                </Styled.Synopsis>
              )}
              {(project.tags.length + project.categories.length > 0 && project.status === 'PUBLIC') && (
                <Styled.Tags>
                  {project.categories.map(category => (
                    <Styled.Category id={category.id} key={category.id}>
                      {category.name}
                    </Styled.Category>
                  ))}
                  {project.tags.map(tag => (
                    <Styled.Tag key={tag}>{tag}</Styled.Tag>
                  ))}
                </Styled.Tags>
              )}
            </>
          ) : (
            <>
              <Styled.InfoButton onClick={() => setIsPopupVisible(true)}>
                <InfoIcon />
              </Styled.InfoButton>
              {isPopupVisible && (
                <SynopsisPopup {...project} close={() => setIsPopupVisible(false)} />
              )}
            </>
          )}
        </Styled.Text>
        <Styled.UserPictureWrapper>
          <Styled.UserProfile
            image={project.user.picture}
          />
        </Styled.UserPictureWrapper>
        <Styled.Aside>
          <Styled.Subscribe>
            {isMyProject ? isDesktop && (
              <>
                <Styled.SubscribeButton as={Link} to={`/dashboard/${project.uri}/posts/new`}>
                  새 포스트 작성
                </Styled.SubscribeButton>
                <Styled.SettingButton as={Link} to={`/dashboard/${project.uri}/info`}>
                  <SettingIcon />
                </Styled.SettingButton>
              </>
            ) : subscription ? (
              hasFanPasses ? (
                <Styled.UnsubscribeButton as={Link} to="./fanpass">
                  구독 중
                </Styled.UnsubscribeButton>
              ) : (
                <Styled.UnsubscribeButton onClick={handleSubscribe}>
                  구독 중
                </Styled.UnsubscribeButton>
              )
            ) : (currentUser ? (
              hasFanPasses ? (
                <Styled.SubscribeButton as={Link} to="./fanpass">
                  구독하기
                </Styled.SubscribeButton>
              ) : (
                <Styled.SubscribeButton onClick={handleSubscribe}>
                  무료로 구독하기
                </Styled.SubscribeButton>
              )
            ) : (
              <Location>
                {({ location }) => (
                  <Styled.SubscribeButton
                    as={Link}
                    to="/login"
                    state={{
                      redirectTo: encodeURIComponent(location.pathname),
                    }}
                  >
                    {!hasFanPasses && '무료로 '}
                    구독하기
                  </Styled.SubscribeButton>
                )}
              </Location>
            ))}
          </Styled.Subscribe>
          {isPictionChoice && (
            <Styled.Label>
              <ChoiceIcon />
              Piction&apos;s Choice
            </Styled.Label>
          )}
          {isCPRProject && (
            <Styled.Label>
              <CRPIcon />
              심폐소생전 지원 프로젝트
            </Styled.Label>
          )}
        </Styled.Aside>
      </Styled.MainGrid>
    </Styled.Section>
  );
}

ProjectInfo.propTypes = {
  isMyProject: PropTypes.bool,
  subscription: PropTypes.object,
  project: PropTypes.object.isRequired,
  handleSubscribe: PropTypes.func.isRequired,
  hasFanPasses: PropTypes.bool,
};

const Placeholder = {
  Heading: styled(Styled.Heading)`
    display: inline-block;
    width: 50%;
    background-color: var(--gray--light);
    color: var(--gray--light);
  `,
  User: styled(Styled.User)`
    width: 20%;
    background-color: var(--gray--light);
    color: var(--gray--light);
  `,
  Synopsis: styled(Styled.Synopsis)`
    background-color: var(--gray--light);
    color: var(--gray--light);
  `,
};

ProjectInfo.Placeholder = ({ isDesktop }) => (
  <Styled.Section>
    <Styled.WideThumbnail
      {...(isDesktop ? {
        width: null, height: null,
      } : {
        width: 720, height: 360,
      })}
      image={null}
    />
    <Styled.MainGrid>
      <Styled.Text>
        <Styled.HeadingWrapper>
          <Placeholder.Heading>Title</Placeholder.Heading>
        </Styled.HeadingWrapper>
        <Placeholder.User>Author</Placeholder.User>
        <Placeholder.Synopsis>Synopsis</Placeholder.Synopsis>
      </Styled.Text>

      <Styled.UserPictureWrapper>
        <Styled.UserProfile />
      </Styled.UserPictureWrapper>

      <Styled.Aside>
        <Styled.Subscribe>
          <Styled.SubscribeButton disabled>구독하기</Styled.SubscribeButton>
        </Styled.Subscribe>
      </Styled.Aside>
    </Styled.MainGrid>
  </Styled.Section>
);

ProjectInfo.Placeholder.propTypes = {
  isDesktop: PropTypes.bool,
};

export default ProjectInfo;
