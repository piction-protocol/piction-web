import React from 'react';
import PropTypes from 'prop-types';

import dummyUserProfileImage from 'images/img-user-profile.svg';

import ContentImage from '.';

function UserProfile({
  width = 240,
  height = 240,
  image,
  alt,
  ...props
}) {
  return (
    <ContentImage
      width={width}
      height={height}
      image={image}
      dummyImage={dummyUserProfileImage}
      alt={alt}
      {...props}
    />
  );
}

UserProfile.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  image: PropTypes.string,
  alt: PropTypes.string,
};

export default UserProfile;
