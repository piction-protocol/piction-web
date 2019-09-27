import React from 'react';
import styled from 'styled-components';

import Grid from 'styles/Grid';

const Styled = {
  Container: styled.section`
    padding: 48px 16px;
    background-color: #232323;
  `,
  Title: styled.h2`
    color: var(--white);
    font-size: 24px;
  `,
  Item: styled(Grid).attrs({
    columns: 'var(--columns)',
  })`
    --columns: 6;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Name: styled.p`
    grid-column: 1 / span 2;
    color: var(--white);
    font-weight: bold;
    word-break: keep-all;
  `,
  Text: styled.p`
    grid-column: span 4;
  `,
  Tag: styled.strong`
    color: var(--main-color);
  `,
};

const Notice = () => (
  <Styled.Container>
    <Styled.Title>필수 유의사항</Styled.Title>
    <Styled.Item>
      <Styled.Name>태그 입력</Styled.Name>
      <Styled.Text>
        프로젝트 태그에
        {' '}
        <Styled.Tag>#던파크리</Styled.Tag>
        를 입력해야 참가 완료됩니다.
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
      <Styled.Name>부정 행위 대응</Styled.Name>
      <Styled.Text>
        다중 계정 생성을 통한 부정한 방법으로 참가한 사실이 발각될 시, 수여 대상에서 제외됩니다.
      </Styled.Text>
    </Styled.Item>
  </Styled.Container>
);

export default Notice;
