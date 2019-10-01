import React from 'react';

import Banner from '.';
import mobileImage from './dnf-banner-mobile.png';
import desktopImage from './dnf-banner-desktop.png';

const DNFBanner = () => (
  <Banner
    banners={[{
      mobileImage,
      desktopImage,
      title: '2019 픽션 X 던파 크리에이티브 리그',
      color: '#1a92ff',
      link: '/campaigns/dnfcreativeleague',
    }]}
  />
);

export default DNFBanner;
