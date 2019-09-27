import React from 'react';

import image from './intro-mobile.png';
import image2 from './intro-mobile@2x.png';
import image3 from './intro-mobile@3x.png';

const Intro = props => (
  <img
    src={image}
    srcSet={`
      ${image} 360w,
      ${image2} 720w,
      ${image3} 1080w
    `}
    alt="총 상금 4,000만원 규모 #던파크리, 발동!"
    {...props}
  />
);

export default Intro;
