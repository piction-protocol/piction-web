import React from 'react';

import Banner from '.';
import dnfMobileImage from './dnf-banner-mobile.png';
import dnfDesktopImage from './dnf-banner-desktop.png';
import cprMobileImage from './cpr-banner-mobile.jpg';
import cprDesktopImage from './cpr-banner-desktop.jpg';

const FeaturedBanner = () => (
  <Banner
    banners={[{
      mobileImage: cprMobileImage,
      desktopImage: cprDesktopImage,
      title: '전 국민 창작지원 프로그램, 심폐소생전',
      color: '#f45067',
      link: '/campaigns/cpr_2019',
    }, {
      mobileImage: dnfMobileImage,
      desktopImage: dnfDesktopImage,
      title: '2019 픽션 X 던파 크리에이티브 리그',
      color: '#1a92ff',
      link: '/campaigns/dnfcreativeleague',
    }]}
  />
);

export default FeaturedBanner;
