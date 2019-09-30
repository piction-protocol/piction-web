import React from 'react';

import image from './participate-mobile.png';
import image2 from './participate-mobile@2x.png';
import image3 from './participate-mobile@3x.png';

const Participate = props => (
  <img
    src={image}
    srcSet={`
      ${image} 360w,
      ${image2} 720w,
      ${image3} 1080w
    `}
    alt="참가방법"
    {...props}
  />
);

export default Participate;
