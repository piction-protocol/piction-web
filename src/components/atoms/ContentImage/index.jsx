import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Picture: styled.picture`
    display: flex;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      padding-top: ${({ ratio }) => 1 / ratio * 100}%;
    }
  `,
  Image: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
};

function ContentImage({
  dummyImage,
  image,
  width,
  height,
  quality = 80,
  alt = '',
  ...props
}) {
  const imageUrl = `${image}?w=${width}&h=${height}&quality=${quality}`;
  return (
    <Styled.Picture {...props} ratio={(width / height) || 1}>
      {image ? (
        <>
          <source type="image/webp" srcSet={`${imageUrl}&output=webp`} />
          <Styled.Image src={imageUrl} alt={alt} />
        </>
      ) : (
        <Styled.Image src={dummyImage} alt={alt} />
      )}
    </Styled.Picture>
  );
}

ContentImage.propTypes = {
  image: PropTypes.string,
  dummyImage: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  quality: PropTypes.number,
  alt: PropTypes.string,
};

export default ContentImage;
