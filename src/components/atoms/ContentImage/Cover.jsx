import React from 'react';
import PropTypes from 'prop-types';

import dummyCoverImage from 'images/img-dummy-500x500.jpg';

import ContentImage from '.';

function Cover({
  width = 500,
  height = 500,
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
