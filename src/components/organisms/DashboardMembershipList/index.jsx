import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, useLocation } from '@reach/router';
import useSWR from 'swr';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

import Grid from 'styles/Grid';
import { ReactComponent as PictionLogo } from 'images/img-logo-piction-symbol-bl.svg';
import { ReactComponent as Downward } from 'images/ic-arrow-downward.svg';

import Membership from 'components/molecules/Membership';
import Heading from 'components/atoms/Heading';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import { ReactComponent as PeopleIcon } from 'images/ic-people.svg';
import { ReactComponent as EditIcon } from 'images/ic-edit.svg';
import dummyImage from 'images/img-projects.png';

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
  DownloadImg: styled.div`
    padding: 0;
    margin: 0;
    width: 720px;
    background-color: white;
    top: 0;
    right: 0;
    position: absolute;
    transform: translate(-100%, -100%);
  `,
  DownloadBackground: styled.div`
    background: url(${props => props.image}) no-repeat center center;
    background-size: cover;
    height: 225px;
    width: 720px;
  `,
  DownloadWrap: styled.div`
    display: flex;
    width: 720px;
    align-items: center;
    border-left: 1px solid #e8e8e8;
    border-right:1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  `,
  DownloadTitle: styled.div`
    display: flex;
    align-items: center;
    font-size: var(--font-size--big);
  `,
  DownloadSubTitle: styled.div`
    padding-top: 7px;
    font-size: var(--font-size--small);
  `,
  DownloadTitleUserName: styled.span`
    font-weight: bold;
    color: var(--blue);
  `,
  LeftWrap: styled.div`
    display: flex;
    flex-flow: column;
    padding: 24px 0 24px 32px;
  `,
  RightWrap: styled.div`
    margin-left: auto;
    padding: 0 8px;
  `,
  SupportQR: styled.article`
    display: flex;
    position: relative;
    flex-flow: row;
    padding: 24px;
    border: 1px solid #e8e8e8;
    background-color: var(--white);
    font-size: var(--font-size--small);
    grid-column: 1 / -1;
  `,
  SupportQRName: styled.h2`
    margin-bottom: 24px;
    font-size: var(--font-size--large);
    font-weight: bold;
  `,
  QRCodeWrap: styled.div`
    padding-top: 5px;
    padding-left: 365px;
  `,
  Downward: styled(Downward)`
    margin: 10px 0 10px 12px;
    box-sizing: content-box;
  `,
  DownloadQRButton: styled(PrimaryButton)`
    display: flex;
    padding: 0;
    width: 104px;
    outline: none;
  `,
  DownloadLetter: styled.div`
    width: 52px;
    height: 20px;
    padding: 7px 0 9px 8px;
    box-sizing: content-box;
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
    color: var(--gray);
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
  const captureQRCode = useRef();

  const captureDownload = (uri, filename) => {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };
  const captureImg = () => {
    html2canvas(captureQRCode.current, { useCORS: true }).then((canvas) => {
      captureDownload(canvas.toDataURL('image/png', 1.0), `qr_${project.uri}.jpg`);
    });
  };

  const backgroundImageisNull = `${project.wideThumbnail}` === 'null' ? 'dummy' : '';
  const NodeEnv = process.env.NODE_ENV === 'development' ? 'dummy' : '';
  const backgroundImageUrl = (NodeEnv) || (backgroundImageisNull) === 'dummy' ? dummyImage : `${project.wideThumbnail}?quality=80&output=webp`;

  const ComponentToQR = React.forwardRef(() => (
    <Styled.DownloadImg ref={captureQRCode}>
      <Styled.DownloadBackground image={backgroundImageUrl} crossOrigin="anonymous" />
      <Styled.DownloadWrap>
        <Styled.LeftWrap>
          <PictionLogo />
          <Styled.DownloadTitle>
            <Styled.DownloadTitleUserName>
              {project.user.username}
            </Styled.DownloadTitleUserName>
            님은 여러분의 후원을 기다리고 있습니다.
          </Styled.DownloadTitle>
          <Styled.DownloadSubTitle>
            우측의 QR코드를 스캔하여 간편하게 후원하세요.
          </Styled.DownloadSubTitle>
        </Styled.LeftWrap>
        <Styled.RightWrap>
          <QRCode
            id="qr-gen"
            value={`${location.origin}/project/${project.uri}/memberships`}
            size={114}
            level="H"
            includeMargin
          />
        </Styled.RightWrap>
      </Styled.DownloadWrap>
    </Styled.DownloadImg>
  ));

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      {project.activeMembership ? (
        <Grid columns={9}>
          <ComponentToQR ref={componentRef} />
          <Styled.SupportQR>
            <div>
              <Styled.SupportQRName>QR코드 배너 만들기</Styled.SupportQRName>
              <Styled.DownloadQRButton onClick={() => captureImg(componentRef)}>
                <Styled.Downward />
                <Styled.DownloadLetter>다운로드</Styled.DownloadLetter>
              </Styled.DownloadQRButton>
            </div>
            <Styled.QRCodeWrap>
              <QRCode
                id="qr-gen"
                value={`${location.origin}/project/${project.uri}/memberships`}
                size={110}
                level="H"
              />
            </Styled.QRCodeWrap>
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
