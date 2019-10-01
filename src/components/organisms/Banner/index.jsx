import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import media, { mediaQuery } from 'styles/media';

import useMedia from 'hooks/useMedia';

const Styled = {
  Banner: styled.div`
    display: flex;
  `,
  Link: styled(Link)`
    display: flex;
    width: 100%;
  `,
  Image: styled.img`
    width: 100%;
    ${media.desktop`
      width: auto;
      max-width: 100%;
      margin: 0 auto;
    `}
  `,
};

function Banner({
  banners = [], ...props
}) {
  const isDesktop = useMedia(mediaQuery.desktop);

  return (
    <Styled.Banner {...props}>
      {banners.map(banner => (
        <Styled.Link
          key={banner.title}
          to={banner.link}
          style={{ backgroundColor: banner.color }}
        >
          {isDesktop ? (
            <Styled.Image src={banner.desktopImage} alt={banner.title} />
          ) : (
            <Styled.Image src={banner.mobileImage} alt={banner.title} />
          )}
        </Styled.Link>
      ))}
    </Styled.Banner>
  );
}

export default Banner;

Banner.propTypes = {
  banners: PropTypes.array,
};
