import React from 'react';

import Banner from '.';
import hongikMobileImage from './hongik-banner-mobile.jpg';
import hongikDesktopImage from './hongik-banner-desktop.jpg';

const FeaturedBanner = () => (
  <Banner
    banners={[{
      mobileImage: hongikMobileImage,
      desktopImage: hongikDesktopImage,
      title: '픽션x홍익대 산학협력 프로젝트',
      color: '#1A92FF',
      link: '/campaigns/hongik_2019',
    }]}
  />
);

export default FeaturedBanner;
