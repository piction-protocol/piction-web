import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Link } from '@reach/router';

import Grid from 'styles/Grid';
import media from 'styles/media';
import MainGrid from './Grid';

const createNthChildStyle = () => {
  let style = '';

  for (let n = 0; n < 9; n += 1) {
    style += `
      &:nth-child(${n + 1}) {
        -ms-grid-row: ${n + 1};
      }
    `;
  }

  return css`${style}`;
};

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
        -ms-grid-column: 5;
        -ms-grid-column-span: 15;
        grid-column: 3 / -3;
        ${createNthChildStyle()}
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
      display: -ms-grid;
      -ms-grid-columns:  1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr 20px 1fr;
      margin-top: 24px;
      font-size: 16px;
      @supports(column-gap: 24px) {
        margin-top: 0;
      }
    `}
  `,
  Name: styled.p`
    -ms-grid-column: 1;
    -ms-grid-column-span: 3;
    grid-column: 1 / span 2;
    color: #FFFFFF;
    font-weight: bold;
    word-break: keep-all;
  `,
  Text: styled.p`
    grid-column: span 4;
    ${media.desktop`
      -ms-grid-column: 5;
      -ms-grid-column-span: 11;
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
      <Styled.Title>참가자 필수 유의사항</Styled.Title>
      <Styled.Item>
        <Styled.Name>최종 순위 수상자 상금 지급</Styled.Name>
        <Styled.Text>
          최종 순위에 선정된 수상자에게는, 픽션 회원가입 시 입력된 이메일로 개별 연락을 드립니다.  개인 정보 취득이 완료되면 3일 이내 개인 계좌로 입급됩니다.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>참가상 PXL 지급</Styled.Name>
        <Styled.Text>
          #던파크리 프로젝트 생성 후, 창작물을 1개 이상 등록한 창작자는 픽션의 ‘내 지갑’으로 1000PXL이 입금됩니다.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>종료 후 프로젝트 존속 여부</Styled.Name>
        <Styled.Text>
          2019 픽션X던파 크리에이티브 리그 종료 후에도 생성된 프로젝트와 창작물은 사라지지 않으며, 지속적으로 창작 활동이 가능합니다.
          {' '}
          추가로, 현재 진행 중인 창작자 지원 프로그램 &lt;심폐소생전&gt;에도 참여하실 수 있습니다.
          {' '}
          &lt;심폐소생전&gt;에 관한 더 자세한 내용은
          {' '}
          <Styled.Link as={Link} to="/campaigns/cpr_2019">이곳</Styled.Link>
          에서 확인해주세요.
        </Styled.Text>
      </Styled.Item>
      <Styled.Item>
        <Styled.Name>부정 행위 처리</Styled.Name>
        <Styled.Text>
          다중 계정 생성을 통한 부정한 방법으로 참가한 사실이 발각된 프로젝트는 수상자 선정에 제외되었습니다. (예: 동일 IP, 이메일 도용 회원가입).
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
