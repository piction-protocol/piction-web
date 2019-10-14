import React from 'react';
import PropTypes from 'prop-types';

import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

import ContentImage from '.';

function Thumbnail({
  width = 720,
  height = 720,
  image,
  alt,
  ...props
}) {
  return (
    <ContentImage
      width={width}
      height={height}
      image={image}
      dummyImage={dummyThumbnailImage}
      alt={alt}
      {...props}
    />
  );
}

Thumbnail.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  image: PropTypes.string,
  alt: PropTypes.string,
};

export default Thumbnail;
