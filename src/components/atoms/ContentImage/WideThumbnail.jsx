import React from 'react';
import PropTypes from 'prop-types';

import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';

import ContentImage from '.';

function WideThumbnail({
  width = 1440,
  height = 450,
  image,
  alt,
  ...props
}) {
  return (
    <ContentImage
      width={width}
      height={height}
      image={image}
      dummyImage={dummyWideThumbnailImage}
      alt={alt}
      {...props}
    />
  );
}

WideThumbnail.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  image: PropTypes.string,
  alt: PropTypes.string,
};

export default WideThumbnail;
