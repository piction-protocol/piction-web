import React from 'react';

import Banner from '.';
// import dnfMobileImage from './dnf-banner-mobile.png';
// import dnfDesktopImage from './dnf-banner-desktop.png';
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
    }]}
  />
);

export default FeaturedBanner;
