import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

import media, { mediaQuery } from 'styles/media';

import useMedia from 'hooks/useMedia';

import { ReactComponent as ChevronIcon } from 'images/ic-chevron.svg';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    position: relative;
    align-items: center;
  `,
  Button: styled.button`
    display: flex;
    position: absolute;
    z-index: 2;
    align-items: center;
    cursor: pointer;
    &:first-child {
      left: 10%;
    }
    &:last-child {
      right: 10%;
    }
    svg {
      width: 40px;
      height: 40px;
    }
    path {
      fill: var(--white);
    }
    ${media.mobile`
      display: none;
    `}
  `,
  Link: styled(Link)`
    display: flex;
    align-items: flex-start;
    max-width: 100%;
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
  const [swiper, updateSwiper] = useState(null);
  const isDesktop = useMedia(mediaQuery.desktop);

  const params = {
    loop: true,
    autoplay: true,
    shouldSwiperUpdate: true,
    ...(isDesktop ? {
      effect: 'fade',
      on: false,
      noSwiping: true,
    } : {
      noSwiping: false,
    }),
  };

  useEffect(() => {
    if (swiper) {
      swiper.init();
    }
  }, [swiper, isDesktop]);

  return (
    <Styled.Wrapper>
      <Styled.Button onClick={() => swiper.slidePrev()}>
        <ChevronIcon />
      </Styled.Button>
      <Swiper getSwiper={updateSwiper} {...props} {...params}>
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
      </Swiper>
      <Styled.Button onClick={() => swiper.slideNext()}>
        <ChevronIcon
          style={{
            transform: 'rotate(180deg)',
          }}
        />
      </Styled.Button>
    </Styled.Wrapper>
  );
}

export default Banner;

Banner.propTypes = {
  banners: PropTypes.array,
};
