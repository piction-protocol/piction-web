import React from 'react';

import image from './prize-mobile.png';
import image2 from './prize-mobile@2x.png';
import image3 from './prize-mobile@3x.png';

const Prize = props => (
  <img
    src={image}
    srcSet={`
      ${image} 360w,
      ${image2} 720w,
      ${image3} 1080w
    `}
    alt="수상안내"
    {...props}
  />
);

export default Prize;
