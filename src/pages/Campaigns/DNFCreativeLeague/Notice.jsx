import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import Grid, { MainGrid } from 'styles/Grid';
import media from 'styles/media';

const Styled = {
  Container: styled.section`
    padding-top: 48px;
    padding-bottom: 48px;
    background-color: #232323;
    ${media.desktop`
      padding-top: 100px;
      padding-bottom: 100px;
    `}
  `,
  MainGrid: styled(MainGrid)`
    ${media.mobile`
      --row-gap: 16px;
      > * {
        grid-column: 1 / -1;
      }
    `}
    ${media.desktop`
      > * {
        grid-column: 3 / -3;
      }
    `}
  `,
  Title: styled.h2`
    color: #FFFFFF;
    font-size: 24px;
    ${media.desktop`
      font-size: 32px;
    `}
  `,
  Item: styled(Grid).attrs({
    columns: 'var(--columns)',
  })`
    --columns: 6;
    padding-top: 24px;
    border-top: 1px solid;
    color: #BFBFBF;
    font-size: 14px;
    ${media.desktop`
      --columns: 8;
      font-size: 16px;
    `}
  `,
  Name: styled.p`
    grid-column: 1 / span 2;
    color: #FFFFFF;
    font-weight: bold;
    word-break: keep-all;
  `,
  Text: styled.p`
    grid-column: span 4;
    ${media.desktop`
      grid-column: span 6;
    `}
  `,
  Tag: styled.strong`
    color: #00FFF6;
  `,
  Link: styled.a`
    color: #FFFFFF;
    font-weight: bold;
    text-decoration: underline;
  `,
};

const Notice = () => (
  <Styled.Container>
    <Styled.MainGrid>
      <Styled.Title>필수 유의사항</Styled.Title>
      <Styled.Item>
        <Styled.Name>태그 입력</Styled.Name>
        <Styled.Text>
          프로젝트 태그에
          {' '}
          <Styled.Tag>#던파크리</Styled.Tag>
          를 입력해야 참가 완료되며, 이벤트 기간 내 태그는 반드시 유지되어야 합니다.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>순위 선정 및 최소 업로드</Styled.Name>
        <Styled.Text>
          최종 순위는 프로젝트 구독자로 선정됩니다.
          <br />
          단, 최소한의 결과물 업로드가 필요하며, 그 조건은 다음과 같습니다.
          <br />
          웹툰, 일러스트, 라이트노벨, 공략, 에세이, 게임 플레이 영상 : 3회 이상 업로드
          <br />
          코스프레, 애니메이션, OST : 2회 이상 업로드
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>PXL 및 상금(원화) 지급</Styled.Name>
        <Styled.Text>
          프로젝트 생성 후, 창작물을 1개 이상 등록하면 24시간 안에 픽션의 ‘내 지갑’으로 1000PXL이 입금됩니다.
          총 2000명까지 지급되며, 2000명 달성 시 종료됩니다.
          <br />
          원화는 입상 발표 후, 개인 정보 취득이 완료되면 3일 이내 개인 계좌로 입급됩니다.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>팀 단위 참가여부</Styled.Name>
        <Styled.Text>
          개인, 팀 관계 없이 자유롭게 참가가 가능합니다. (ex.코스프레 팀)
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>종료 후 프로젝트 존속 여부</Styled.Name>
        <Styled.Text>
          2019 픽션X던파 크리에이티브 리그 종료 후에도 생성 된 프로젝트와 창작물은 사라지지 않으며,
          지속적으로 창작 활동이 가능합니다.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>부정 행위 및 저작권 이슈</Styled.Name>
        <Styled.Text>
          다중 계정 생성을 통한 부정한 방법으로 참가한 사실이 발각되거나,
          저작권과 관련한 이슈 발생 시 수상이 취소될 수 있습니다.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>PXL 및 픽션이란?</Styled.Name>
        <Styled.Text>
          PXL이란 픽션에서 사용가능한 재화입니다.
          픽션에 관한 더 자세한 내용은
          {' '}
          <Styled.Link as={Link} to="/creatorsguide">이곳</Styled.Link>
          에서 확인해 주세요.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>고객 센터 및 기타 문의 사항</Styled.Name>
        <Styled.Text>
          더 궁금한 사항이 있으면
          {' '}
          <Styled.Link href="mailto:help@piction.network">help@piction.network</Styled.Link>
          로 문의해 주십시오.
        </Styled.Text>
      </Styled.Item>
    </Styled.MainGrid>
  </Styled.Container>
);

export default Notice;
