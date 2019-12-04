import React from 'react';
import { Helmet } from 'react-helmet';
import { importMDX } from 'mdx.macro';

import useMedia from 'hooks/useMedia';

import { mediaQuery } from 'styles/media';

import hero from './img-introduction-title-desktop.png';
import hero2x from './img-introduction-title-desktop@2x.png';
import hero3x from './img-introduction-title-desktop@3x.png';
import heroMobile from './introduction-mobile.png';
import heroMobile2x from './introduction-mobile@2x.png';
import heroMobile3x from './introduction-mobile@3x.png';
import logo from './img-participate-logo-title.png';
import logo2x from './img-participate-logo-title@2x.png';
import logo3x from './img-participate-logo-title@3x.png';
import tag from './img-project-tag.png';
import tag1 from './img-project-tag-1.png';

import NoticeComponents from '../NoticeComponents';

const Notice = React.lazy(() => importMDX('./Notice.mdx'));

const Hongik = () => {
  const isDesktop = useMedia(mediaQuery.desktop);
  const sectionStyle = {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    justifyContent: 'center',
  };

  const paragraphStyle = {
    color: '#bbdfff',
    maxWidth: '461px',
    width: '100%',
    textAlign: 'center',
    marginTop: '24px',
    marginBottom: '24px',
    fontSize: isDesktop ? '16px' : '14px',
  };

  const buttonStyle = {
    backgroundColor: 'var(--white)',
    borderRadius: '3em',
    padding: '1em 3em',
    color: 'var(--blue)',
    fontWeight: 'bold',
    boxShadow: '2px 2px 9px 0px #003f77',
  };

  return (
    <article style={sectionStyle}>
      <Helmet>
        <title>픽션 X 홍대</title>
      </Helmet>
      <section
        style={{
          ...sectionStyle,
          alignItems: 'center',
          backgroundImage: 'linear-gradient(to bottom, #fff6d9 6%, var(--blue) 99%)',
        }}
      >
        <picture>
          <img
            style={{
              width: '100%',
              maxWidth: '1240px',
            }}
            src={isDesktop ? hero : heroMobile}
            srcSet={`
              ${isDesktop ? hero : heroMobile} 360w,
              ${isDesktop ? hero2x : heroMobile2x} 720w,
              ${isDesktop ? hero3x : heroMobile3x} 1080w
            `}
            alt="2019 픽션X홍대 산학협력 프로젝트"
          />
        </picture>
      </section>

      <section style={{
        ...sectionStyle,
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to bottom, var(--blue), #0067c5)',
        paddingBottom: '120px',
      }}
      >
        <picture>
          <img
            style={{
              width: isDesktop ? '100%' : '244px',
              maxWidth: '404px',
            }}
            src={logo}
            srcSet={`
              ${logo} 360w,
              ${logo2x} 720w,
              ${logo3x} 1080w
            `}
            alt="블록체인 기반 창작무대 픽션"
          />
        </picture>
        <p style={paragraphStyle}>
          픽션에서는 누구나 크리에이터가 될 수 있고,
          <br />
          누구나 나의 최애 크리에이터를 응원할 수 있습니다.
          <br />
          더 자세한 내용은&nbsp;
          <a href="/creatorsguide" style={{ textDecoration: 'underline', color: 'var(--white)', fontWeight: 'bold' }}>이곳</a>
          에서 확인하세요.
        </p>
        <div>
          <a href="/tag/홍익대_영상애니메이션_학부">
            <img
              style={{
                width: isDesktop ? '406px' : '195px',
                marginRight: '12px',
              }}
              src={tag1}
              alt="홍익대_영상애니메이션_학부 태그 작품"
            />
          </a>
          <a href="/tag/만그내">
            <img
              style={{
                width: isDesktop ? '142px' : '68px',
              }}
              src={tag}
              alt="만그내 태그 작품"
            />
          </a>
        </div>
        <p
          style={{
            ...paragraphStyle,
            maxWidth: '700px',
          }}
        >
          〈만화그래픽내러티브〉 강의를 수강하고 있는 홍대생이라면,
          <br />
          프로젝트 생성 시 #홍익대_영상애니메이션_학부, #만그내 태그를 달아주세요.
        </p>
        <a
          href="/dashboard/new-project?tag=만그내,홍익대_영상애니메이션_학부"
          style={buttonStyle}
        >
          제출하기
        </a>
      </section>

      <section style={sectionStyle}>
        <Notice components={NoticeComponents} />
      </section>
    </article>
  );
};

export default Hongik;
