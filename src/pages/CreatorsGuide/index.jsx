import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';
import { Link } from '@reach/router';

import useCurrentUser from 'hooks/useCurrentUser';
import media from 'styles/media';
import { PrimaryButton, SecondaryButton } from 'components/atoms/Button';

import contentsShowcaseImages from './showcases.png';
import { ReactComponent as PictionLogo } from './piction-logo.svg';

const PrimaryButtonLink = styled(PrimaryButton).attrs({
  as: Link,
})``;

const SecondaryButtonLink = styled(SecondaryButton).attrs({
  as: 'a',
})``;

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const DecoratedLink = styled(Link)`
  text-decoration: underline;
`;

const IntroSection = styled.section`
  max-width: 870px;
  margin: 0 auto;
  font-size: 22px;
  padding: 32px;
  font-size: 16px;
  ${media.desktop`
    padding: 0;
    font-size: 22px;
    margin-top: 70px;
    margin-bottom: 80px;
  `}
`;

const IntroDeco = styled.small`
  word-break: keep-all;
  font-size: 16px;
  color: var(--blue);
  ${media.desktop`
    font-size: 24px;
  `}
`;

const IntroHeading = styled.h1`
  word-break: keep-all;
  font-size: 32px;
  margin-bottom: 20px;
  ${media.desktop`
    font-size: 48px;
  `}
`;

const IntroParagraph = styled.p`
  margin-bottom: 40px;
`;

const Section = styled.section`
  font-size: 16px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionParagraph = styled.p`
  max-width: 800px;
  word-break: keep-all;
  padding: 20px;
  ${media.desktop`
    padding: 0;
  `}
`;

const SectionHeading = styled.h2`
  word-break: keep-all;
  margin-bottom: 16px;
  font-size: 24px;
  padding: 0 20px;
  ${media.desktop`
    font-size: 32px;
  `}
`;

const SectionSubheading = styled.h3`
  word-break: keep-all;
  font-size: 24px;
  color: var(--blue);
  padding: 0 20px;
  margin-top: 64px;
  margin-bottom: 20px;
  ${media.desktop`
    font-size: 32px;
  `}
`;

const Chevron = styled.div`
  width: 100%;
  margin-top: 40px;
  padding-top: 40px;
  padding-bottom: 120px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ebf5ff;
  clip-path: polygon(50% 20px, 100% 0, 100% calc(100% - 20px), 50% 100%, 0 calc(100% - 20px), 0 0);
  ${media.desktop`
    clip-path: polygon(50% 40px, 100% 0, 100% calc(100% - 40px), 50% 100%, 0 calc(100% - 40px), 0 0);
  `}
`;

const Ol = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.desktop`
    padding: 0;
  `}
`;

const Li = styled.li`
  background-color: var(--white);
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 5px auto;
  padding: 20px;
  width: 100%;
  ${media.desktop`
    width: 720px;
    flex-direction: row;
    text-align: left;
  `}
`;

const Aside = styled.aside`
  max-width: 920px;
  margin: 60px auto 60px auto;
  padding: 24px;
`;

const DarkBackground = styled.div`
  margin-top: 100px;
  background-color: var(--charcoal-black);
  color: #cccccc;
`;

const Circle = styled.span`
  display: flex;
  width: 64px;
  height: 64px;
  background-color: #ebf5ff;
  color: var(--blue);
  border-radius: 50%;
  font-size: 27px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  flex-shrink: 0;
  margin-bottom: 16px;
  ${media.desktop`
    margin-right: 20px;
  `}
`;

const ListItem = ({ index, children }) => (
  <Li>
    <Circle>{index}</Circle>
    <div>
      {children}
    </div>
  </Li>
);

ListItem.propTypes = {
  index: PropTypes.number,
  children: PropTypes.node,
};

const ListItemHeading = styled.h4`
  word-break: keep-all;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Promotion = styled.div`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  margin: 5px auto;
  align-items: center;
  ${media.desktop`
    width: 720px;
  `}
`;

function CreatorsGuide() {
  const { currentUser } = useCurrentUser();
  const gettingStartPath = currentUser ? '/dashboard' : '/signup';

  return (
    <Main>
      <Helmet>
        <title>크리에이터 가이드 - Piction</title>
      </Helmet>

      <IntroSection>
        <IntroDeco>누구에게나 팬은 있다, 창작자를 응원하는 새로운 방법</IntroDeco>
        <IntroHeading>픽션과 함께 새로운 모험을 하실 창작자를 찾습니다</IntroHeading>
        <IntroParagraph>
          픽션 네트워크는 창작자의 다양한 창작활동을 후원 할 수 있는 오픈 생태계입니다.
          콘텐츠가 만들어지는 과정을 팬과 함께 응원하고 즐기는 실험적인 시도를 함께하실 수 있습니다.
        </IntroParagraph>
        <PrimaryButtonLink to={gettingStartPath}>시작하기</PrimaryButtonLink>
        <SecondaryButtonLink href="http://bit.ly/piction_sponsorship_plan" target="_blank">후원플랜 신청</SecondaryButtonLink>

      </IntroSection>
      <Section>
        <SectionHeading>우리는 누구나 창작자입니다.</SectionHeading>
        <SectionParagraph>
          일러스트, 웹툰, 소설, 블로그, 사진 어떤 콘텐츠도 상관없습니다. 콘텐츠는 무궁무진합니다.
          내가 좋아하는 것을 시작해보세요. 픽션에선 어떤것이든 당신의 이야기를 좋아하는 사람만 있다면 후원 받을 수 있습니다.
        </SectionParagraph>
        <picture>
          <img src={contentsShowcaseImages} alt="showcases" style={{ width: '100%' }} />
        </picture>
      </Section>
      <Section>
        <SectionHeading>무엇을 할 수 있나요?</SectionHeading>
        <SectionParagraph>
          흥미진진한 웹툰부터 존잘 일러스트, 특별한 소재를 담은 웹소설, 지난달에 다녀온 유럽 여행기, 내가 좋아하는 피규어 사진,
          사랑스런 반려동물의 모습, 취미로 하는 코스프레 까지 무엇이든 가능합니다. 심지어 당신의 비밀스러운 일기까지도..
          당신의 이야기를 함께 나누고 싶은 사람과 공유하고, 그 가치를 후원 받을 수 있습니다.
        </SectionParagraph>

        <Chevron>
          <SectionSubheading>이렇게 시작해보세요</SectionSubheading>
          <Ol>
            <ListItem index={1}>
              <ListItemHeading>어떤 이야기를 하고 싶으신가요?</ListItemHeading>
              창작의 주제는 무엇이든 좋습니다. 내가 좋아하는 콘텐츠로 시작해보세요. 다른 창작자들은&nbsp;
              <DecoratedLink to="/all">어떤 이야기를</DecoratedLink>
              &nbsp;하고 있는지 살펴보세요.
            </ListItem>
            <ListItem index={2}>
              <ListItemHeading>프로젝트를 만드세요</ListItemHeading>
              하고 싶은 프로젝트를 정했다면&nbsp;
              <DecoratedLink to="/dashboard">새로운 프로젝트를</DecoratedLink>
              &nbsp;만들어주세요. 첫 포스트로 어떤 이야기를 할 것인지 알려주시면 프로젝트가 더욱 매력적으로 보일거에요.
            </ListItem>
            <ListItem index={3}>
              <ListItemHeading>나의 프로젝트를 알리고 구독자 5명을 모아주세요</ListItemHeading>
              기존에 창작활동을 하시고 있었다면 픽션에서 새로운 시도를 시작 했음을 알려주세요. 인스타그램, 트위터, 블로그에 내 프로젝트의 링크를 공유하고 알려주시면 더 많은 팬들이 알게 될거에요.
            </ListItem>
            <ListItem index={4}>
              <ListItemHeading>후원 플랜을 신청해주세요</ListItemHeading>
              구독자 5명을 달성하면 하고 후원 플랜을 신청하세요. 팬들로부터 직접 PXL을 후원 받을 수 있는 후원 플랜이 열립니다. 별도의 신청을 통해 후원 플랜을 마련할 수 있는 기회가 제공됩니다.
            </ListItem>
            <ListItem index={5}>
              <ListItemHeading>꾸준히 창작 활동을 하세요</ListItemHeading>
              이제 여러분의 차례입니다. 꾸준하게 이야기를 들려주세요. 반드시 내 프로젝트를 좋아하는 팬이 생길거에요. 세상을 넓고 이야기는 다양합니다. 누구에게 팬은 있습니다.
            </ListItem>
          </Ol>

          <SectionSubheading>초기 창작자에게는 후원금을 지원합니다</SectionSubheading>
          <Promotion>
            <PictionLogo />
            <ListItemHeading style={{ marginTop: '16px' }}>초기 창작자 분들을 위한 1+1 이벤트!</ListItemHeading>
            <p style={{ marginBottom: '20px' }}>
              후원 서비스 오픈을 기념하여 기간 한정으로 초기 창작자 분들에게는 기간 동안 모으신 후원금 만큼을 픽션 생태계 성장 기금에서 1+1으로 지원합니다. 이벤트 기간 동안 모집된 자발적 후원 금액의 100%만큼을 이벤트 종료 후 일괄 지급해 드립니다.
            </p>
            <small>2020년 4월 30일 24:00까지 모금된 후원금 기준</small>
            <small>1인당 최대 5만 PXL, 총 100만 PXL 지원</small>
          </Promotion>
        </Chevron>
      </Section>
      <Section>
        <SectionHeading>픽션에서 새로운 창작활동을 시작해보세요, 창작자 여러분을 환영합니다.</SectionHeading>
        <PrimaryButtonLink to={gettingStartPath}>시작하기</PrimaryButtonLink>
      </Section>

      <DarkBackground>
        <Aside>
          <h5>시간이 남았으면 더 알아보기</h5>

          <hr />

          <div style={{ marginBottom: '20px' }}>
            <h6 style={{ wordBreak: 'keep-all' }}>왜 블록체인 코인(PXL)으로 후원을 받아야 하나요?</h6>
            <p style={{ fontSize: '14px' }}>
              픽션은 블록체인 네트워크에서 동작합니다. 블록체인은 투명하고 위변조가 불가능한 방식으로 동작하기 때문에 후원의 흐름을 누구나 투명하게 확인 가능하게 하고, 발생한 후원 금액의 일부가 다시 생태계로 들어가는 공정한 흐름을 만들 수 있게 해줍니다. 또한 스마트컨트랙트라는 프로그램을 이용해 복잡한 중간 정산 과정을 생략하고 신속하고 정확하게 후원이 전달될 수 있도록 해주기 때문입니다.
            </p>
          </div>
          <div>
            <h6 style={{ wordBreak: 'keep-all' }}>비슷한 다른 플랫폼도 많은데 왜 픽션을 해야하나요?</h6>
            <p style={{ fontSize: '14px' }}>
              픽션은 창작자님들의 다양한 창작 실험을 지지합니다. 새로운 시도는 언제나 환영이며, 받는 응원만큼 픽션도 함께 응원할 준비가 되어있기 때문입니다. 픽션 생태계는 보다 많은 창작자의 창작활동을 장려하기 위해 생태계 성장 기금을 운영합니다. 이 기금은 다양한 창작활동을 지원하기 위한 용도로 사용됩니다.
            </p>
          </div>
        </Aside>
      </DarkBackground>
    </Main>
  );
}

export default CreatorsGuide;
