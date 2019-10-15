import React from 'react';
import PropTypes from 'prop-types';

import dummyCoverImage from 'images/img-dummy-960x360.jpg';

import ContentImage from '.';

function Cover({
  width = 960,
  height = 360,
  image,
  alt,
  ...props
}) {
  return (
    <ContentImage
      width={width}
      height={height}
      image={image}
      dummyImage={dummyCoverImage}
      alt={alt}
      {...props}
    />
  );
}

Cover.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  image: PropTypes.string,
  alt: PropTypes.string,
};

export default Cover;
