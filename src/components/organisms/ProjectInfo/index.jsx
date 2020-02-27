import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, Location } from '@reach/router';

import { MainGrid } from 'styles/Grid';
import media, { mediaQuery } from 'styles/media';
import placeholder from 'styles/placeholder';

import useMedia from 'hooks/useMedia';
import useCurrentUser from 'hooks/useCurrentUser';
import usePictionChoices from 'hooks/usePictionChoices';

import SynopsisPopup from 'components/molecules/SynopsisPopup';

import WideThumbnail from 'components/atoms/ContentImage/WideThumbnail';
import UserProfile from 'components/atoms/ContentImage/UserProfile';
import Heading from 'components/atoms/Heading';
import Category from 'components/atoms/Category';
import Tag from 'components/atoms/Tag';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import { ReactComponent as AccessTimeIcon } from 'images/ic-access-time.svg';
import { ReactComponent as InfoIcon } from 'images/ic-info.svg';
import { ReactComponent as PeopleIcon } from 'images/ic-people.svg';
import { ReactComponent as ChoiceIcon } from './ic-piction-symbol-black.svg';

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
    position: relative;
    padding-top: 20px;
    padding-bottom: 32px;
    ${media.desktop`
      padding-top: 40px;
      padding-bottom: 40px;
    `}
  `,
  Main: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -2;
    ${media.desktop`
      grid-column: 2 / -3;
    `}
  `,
  Heading: styled(Heading)`
    margin-right: 6px;
    ${placeholder}
  `,
  User: styled(Link)`
    display: flex;
    flex-flow: column;
    margin-top: 4px;
    margin-right: auto;
    font-size: var(--font-size--small);
    font-weight: bold;
    ${media.desktop`
      flex-flow: row wrap;
      align-items: center;
      margin-top: 12px;
      font-size: var(--font-size--base);
    `}
    ${placeholder}
  `,
  UserId: styled.span`
    margin-top: 4px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    font-weight: normal;
    ${media.desktop`
      margin-top: 0;
      margin-left: 8px;
    `}
  `,
  SponsorCount: styled.div`
    display: inline-flex;
    position: absolute;
    align-items: center;
    top: -16px;
    right: var(--outer-gap);
    padding: 8px 12px;
    border-radius: 18px;
    background-color: rgba(0, 0, 0, .3);
    color: var(--white);
    font-size: var(--font-size--small);
    transform: translateY(-100%);
    ${media.desktop`
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
  Synopsis: styled.p`
    width: 100%;
    margin-top: 8px;
    color: var(--gray--dark);
    line-height: var(--line-height--content);
    ${placeholder}
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
    margin-top: -50%;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 var(--shadow-color);
  `,
  UserProfile: styled(UserProfile)`
    grid-column: -2 / -1;
    grid-row: 1;
    margin-bottom: auto;
    border-radius: 50%;
    background-color: var(--gray--light);
    ${media.desktop`
      grid-column: 1 / 2;
    `}
  `,
  Aside: styled.div`
    grid-column: 1 / -1;
    ${media.desktop`
      grid-column: span 2 / -1;
      grid-row: 1;
    `}
  `,
  Label: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--charcoal-black);
    font-size: 14px;
    font-weight: normal;
    > svg {
      margin-right: 4px;
      width: 20px;
      height: 20px;
    }
    ${media.desktop`
      margin-left: 24px;
    `}
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
  project, handleSubscribe, isMyProject = false, sponsored, ...props
}) {
  const { projects } = usePictionChoices();
  const isPictionChoice = projects && projects.includes(project.uri);
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
        <Styled.Main>
          <Styled.Heading>
            {project.title}
          </Styled.Heading>
          <Styled.User to={`creator-profile/${project.user.loginId}`}>
            {project.user.username}
            <Styled.UserId>
              {`@${project.user.loginId}`}
            </Styled.UserId>
            {isPictionChoice && (
              <Styled.Label>
                <ChoiceIcon />
                Piction&apos;s Choice
              </Styled.Label>
            )}
          </Styled.User>
          <Styled.SponsorCount>
            <Styled.PeopleIcon />
            {`구독자 수 ${project.sponsorCount}`}
          </Styled.SponsorCount>
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
                    <Styled.Category key={category.id}>{category.name}</Styled.Category>
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
        </Styled.Main>
        <Styled.UserProfile
          image={project.user.picture}
        />
        <Styled.Aside>
          <Styled.Subscribe>
            {isMyProject ? isDesktop && (
              <Styled.SubscribeButton as={Link} to={`/dashboard/${project.uri}/info`}>
                관리
              </Styled.SubscribeButton>
            ) : sponsored ? (
              sponsored.membership?.price > 0 ? (
                <Styled.SubscribeButton disabled>
                  후원 중
                </Styled.SubscribeButton>
              ) : (
                <Styled.UnsubscribeButton onClick={handleSubscribe}>
                  구독 중
                </Styled.UnsubscribeButton>
              )
            ) : (currentUser ? (
              <Styled.SubscribeButton onClick={handleSubscribe}>
                구독
              </Styled.SubscribeButton>
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
                    구독
                  </Styled.SubscribeButton>
                )}
              </Location>
            ))}
          </Styled.Subscribe>
          {isPictionChoice && !isDesktop && (
            <Styled.Label>
              <ChoiceIcon />
              Piction&apos;s Choice
            </Styled.Label>
          )}
        </Styled.Aside>
      </Styled.MainGrid>
    </Styled.Section>
  );
}

ProjectInfo.propTypes = {
  isMyProject: PropTypes.bool,
  sponsored: PropTypes.object,
  project: PropTypes.object.isRequired,
  handleSubscribe: PropTypes.func.isRequired,
  hasFanPasses: PropTypes.bool,
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
      <Styled.Main>
        <Styled.Heading isPlaceholder>Title</Styled.Heading>
        <Styled.User to="" isPlaceholder>Author</Styled.User>
        <Styled.Synopsis isPlaceholder>Synopsis</Styled.Synopsis>
      </Styled.Main>

      <Styled.UserProfile />

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
