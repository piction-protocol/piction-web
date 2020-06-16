import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import useSWR from 'swr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import useCurrentUser from 'hooks/useCurrentUser';
import useMedia from 'hooks/useMedia';

import { mediaQuery } from 'styles/media';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';
import { SecondaryButton } from 'components/atoms/Button';

const Styled = {
  Section: styled.section`
    display: flex;
    flex-flow: column;
    padding: 16px 0;
    border-bottom: 1px solid var(--gray--pale);
  `,
  Title: styled.h2`
    margin-right: auto;
    margin-bottom: 4px;
    margin-left: 16px;
    color: var(--black);
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
  PXL: styled.span`
    margin-left: 16px;
    color: var(--blue);
    font-family: var(--poppins);
    font-size: 22px;
    font-weight: bold;
  `,
  Won: styled.span`
    margin-top: 4px;
    margin-left: 16px;
    color: #999999;
    font-size: var(--font-size--small);
  `,
  WalletLink: styled.div`
    display: flex;
    width: 100%;
    padding: 16px 12px 0;
    a {
      flex: 1;
      &:last-child:after {
        border-left: 0;
      }
    }
  `,
  Project: styled(Link)`
    display: flex;
    padding: 8px 16px;
    transition: background-color var(--transition--form);

    &:hover {
      background-color: var(--gray--pale);
    }
  `,
  Thumbnail: styled(Thumbnail)`
    flex: 0 0 auto;
    width: 40px;
    margin-right: 12px;
    border-radius: 50%;
  `,
  ProjectTexts: styled.div`
    overflow: hidden;
  `,
  ProjectTitle: styled.p`
    margin-bottom: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--font-size--small);
    white-space: nowrap;
  `,
  ProjectInfo: styled.p`
    color: var(--gray);
    font-size: var(--font-size--tiny);
  `,
  SecondaryButton: styled(SecondaryButton).attrs(() => ({
    as: Link,
  }))`
    margin: 16px 16px 0 16px;
    &:only-child {
      margin-top: 0;
    }
  `,
  Links: styled.div`
    display: flex;
    flex-flow: column;
  `,
  Link: styled(Link)`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: var(--black);
    font-size: var(--font-size--small);
    cursor: pointer;
    transition: background-color var(--transition--form);

    svg {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    &:hover {
      background-color: var(--gray--pale);
    }
  `,
};

function UserMenu({ links }) {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const isDesktop = useMedia(mediaQuery.desktop);

  const { data: projects = [] } = useSWR('/my/projects');
  const { data: wallet = { amount: 0 } } = useSWR('/my/wallet');
  const { data: rate = 4000 } = useSWR('https://api.coinone.co.kr/ticker?currency=PXL', async (path) => {
    const response = await axios.get(path);
    return response.data.last;
  });

  return (
    <>
      {currentUser && (
        <>
          <Styled.Section>
            <Styled.Title as={Link} to="/wallet/transactions">
              {t('내 지갑')}
              {' '}
              &gt;
            </Styled.Title>
            <Styled.PXL>
              {`${wallet.amount.toLocaleString()} PXL`}
            </Styled.PXL>
            {wallet.amount > 0 && (
              <Styled.Won>
                {`≒ ${Math.floor(wallet.amount * rate).toLocaleString()} ${t('원')}`}
              </Styled.Won>
            )}
            <Styled.WalletLink>
              <SecondaryButton size="mini" as={Link} to="/wallet/deposit">
                {t('입금')}
              </SecondaryButton>
              <SecondaryButton size="mini" as={Link} to="/wallet/withdraw">
                {t('출금')}
              </SecondaryButton>
            </Styled.WalletLink>
          </Styled.Section>
          {(isDesktop || projects.length > 0) && (
            <Styled.Section>
              {projects.length > 0 && (
                <>
                  <Styled.Title>
                    {t('내 프로젝트')}
                  </Styled.Title>
                  {projects.map(project => (
                    <Styled.Project to={`/project/${project.uri}`} key={project.id}>
                      <Styled.Thumbnail image={project.thumbnail} />
                      <Styled.ProjectTexts>
                        <Styled.ProjectTitle>
                          {project.title}
                        </Styled.ProjectTitle>
                        <Styled.ProjectInfo>
                          {`${t('구독자')} ${project.sponsorCount}`}
                        </Styled.ProjectInfo>
                      </Styled.ProjectTexts>
                    </Styled.Project>
                  ))}
                </>
              )}
              {isDesktop && (
                <Styled.SecondaryButton to="/dashboard">
                  {projects.length > 0 ? `${t('크리에이터 대시보드')}` : `${t('+ 새 프로젝트 만들기')}`}
                </Styled.SecondaryButton>
              )}
            </Styled.Section>
          )}
        </>
      )}
      <Styled.Links>
        {links.map(({
          icon, text, ...link
        }) => (
          <Styled.Link key={text} {...link}>
            {icon}
            {text}
          </Styled.Link>
        ))}
      </Styled.Links>
    </>
  );
}

export default UserMenu;

UserMenu.propTypes = {
  links: PropTypes.array.isRequired,
};
