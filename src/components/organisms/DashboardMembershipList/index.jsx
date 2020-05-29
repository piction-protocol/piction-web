import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, useLocation } from '@reach/router';
import useSWR from 'swr';
import QRCode from 'qrcode.react';
import { exportComponentAsPNG } from 'react-component-export-image';

import Grid from 'styles/Grid';
import { ReactComponent as PictionLogo } from 'images/img-logo-piction-symbol-bl.svg';

import Membership from 'components/molecules/Membership';
import Heading from 'components/atoms/Heading';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import { ReactComponent as PeopleIcon } from 'images/ic-people.svg';
import { ReactComponent as EditIcon } from 'images/ic-edit.svg';

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
  SupportQR: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    padding: 24px;
    border: 1px solid #e8e8e8;
    background-color: var(--white);
    font-size: var(--font-size--small);
    grid-column: 1 / -1;
  `,
  SupportQRName: styled.h2`
  margin-bottom: 8px;
  font-size: var(--font-size--large);
  font-weight: bold;
  `,
  QRCode: styled(QRCode)`
    height: 100px;
    width: 100px;
    position: absolute;
    right: 20px;
    top: 25px;
  `,
  DownloadBackground: styled.div`
  background: url(${props => props.image}) no-repeat center center;
  background-size: cover;
  height: calc(225/1920*100vw);
  `,
  DownloadQRButton: styled(PrimaryButton)`
    margin-top: 10px;
    padding: 14px 20px;
    width: 135px;
  `,
  DownloadQRCode: styled(QRCode)`
    position: absolute;
    top: 145px;
    right: 15px;
  `,
  DownloadPictionLogo: styled(PictionLogo)`
    margin-left: 20px;
    margin-top: 20px;
  `,
  DownloadWrap: styled.div`
    grid-column: 1 / -1;
    position: relative;
  `,
  DownloadImg: styled.div`
    grid-column: 1 / -1;
    border: 1px solid #e8e8e8;
    background-color: white;
    /* position: absolute;
    top: -9999999999999999%; */
  `,
  DownloadTitle: styled.div`
    font-size: 17px;
    margin: 4px 0 6px 20px;
  `,
  DownloadTitleUserName: styled.span`
    font-weight: 600;
    color: #1a92ff;
  `,
  DownloadSubTitle: styled.div`
  margin: 6px 0 25px 20px;
  font-size: 15px;
  `,
  Membership: styled(Membership)`
    grid-column: 1 / -1;
  `,
  Price: styled.p`
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 20px;
    font-weight: bold;
    font-family: var(--poppins);
  `,
  Subscriptions: styled.span`
    display: flex;
    align-items: center;
    margin-left: 16px;
    color: #999999;
    font-weight: bold;
    font-size: var(--font-size--tiny);
    font-family: 'Noto Sans KR', sans-serif;
  `,
  PeopleIcon: styled(PeopleIcon)`
    width: 18px;
    margin-right: 4px;
    color: vaR(--gray);
  `,
  Edit: styled(Link)`
    position: absolute;
    top: 40px;
    right: 40px;
  `,
  Create: styled(SecondaryButton).attrs(() => ({
    as: Link,
  }))`
    grid-column: 4 / -4;
  `,
  Center: styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: auto;
    color: var(--gray);
    font-size: var(--font-size--small);
    text-align: center;
  `,
  Strong: styled.strong`
    margin: 24px auto;
    color: var(--gray);
    font-size: var(--font-size--base);
    font-weight: bold;
  `,
  Link: styled(PrimaryButton).attrs(() => ({
    as: 'a',
  }))`
    margin-top: 24px;
  `,
};

function DashboardMembershipList({ title, projectId }) {
  const { data: project } = useSWR(`/projects/${projectId}`, { suspense: true });
  const { data: membershipList } = useSWR(`/projects/${projectId}/memberships`, { suspense: true });
  const location = useLocation();
  const componentRef = useRef();
  console.log({ project, location });

  const ComponentToPrint = React.forwardRef((props, ref) => (
    <Styled.DownloadImg ref={ref}>
      <Styled.DownloadWrap>
        <Styled.DownloadBackground image={`${project.wideThumbnail}?quality=80&output=webp`} crossOrigin="anonymous" />
        {/* <Styled.DownloadBackground image={project.wideThumbnail} /> */}
        <Styled.DownloadPictionLogo />
        <Styled.DownloadTitle>
          <Styled.DownloadTitleUserName>{project.user.username}</Styled.DownloadTitleUserName>
          님은 여러분의 후원을 기다리고 있습니다.
        </Styled.DownloadTitle>
        <Styled.DownloadSubTitle>
          우측의 QR코드를 스캔하여 간편하게 후원하세요.
        </Styled.DownloadSubTitle>
        <Styled.DownloadQRCode
          id="qr-gen"
          value={`${location.origin}/project/${project.uri}/memberships`}
          size={120}
          level="H"
          includeMargin
        />
      </Styled.DownloadWrap>
    </Styled.DownloadImg>
  ));

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      {project.activeMembership ? (
        <Grid columns={9}>
          <ComponentToPrint ref={componentRef} />
          <Styled.SupportQR>
            <Styled.SupportQRName>QR코드 배너 만들기</Styled.SupportQRName>
            <Styled.QRCode
              id="qr-gen"
              value={`${location.origin}/project/${project.uri}/memberships`}
              size={110}
              level="H"
            />
            <Styled.DownloadQRButton onClick={() => exportComponentAsPNG(componentRef)}>
              다운로드
            </Styled.DownloadQRButton>
          </Styled.SupportQR>
          {membershipList.map(membership => membership.price > 0 && (
            <Styled.Membership {...membership} key={membership.id}>
              <Styled.Price>
                {`${membership.price} PXL`}
                <Styled.Subscriptions>
                  <Styled.PeopleIcon />
                  {membership.sponsorLimit !== null
                    ? `${membership.sponsorCount}/${membership.sponsorLimit}`
                    : membership.sponsorCount
                  }
                  명 구독 중
                </Styled.Subscriptions>
              </Styled.Price>
              <Styled.Edit to={`${membership.id}/edit`}>
                <EditIcon />
              </Styled.Edit>
            </Styled.Membership>
          ))}
          {membershipList.length <= 5 && (
            <Styled.Create to="new">
              {`+ 티어 ${membershipList.length} 상품 추가`}
            </Styled.Create>
          )}
        </Grid>
      ) : (
        <Styled.Center>
          <Styled.Strong>
            후원 플랜 관리 권한이 없습니다.
          </Styled.Strong>
          <Styled.Link target="_blank" href="http://bit.ly/piction_sponsorship_plan">
            권한 신청하기
          </Styled.Link>
        </Styled.Center>
      )}
    </Styled.Container>
  );
}

DashboardMembershipList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default DashboardMembershipList;
