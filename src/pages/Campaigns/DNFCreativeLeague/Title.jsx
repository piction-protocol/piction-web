import React from 'react';

import image from './title-mobile.png';
import image2 from './title-mobile@2x.png';
import image3 from './title-mobile@3x.png';

const Title = props => (
  <img
    src={image}
    srcSet={`
      ${image} 360w,
      ${image2} 720w,
      ${image3} 1080w
    `}
    alt="픽션X던파 크리에이티브 리그 2019"
    {...props}
  />
);

export default Title;
