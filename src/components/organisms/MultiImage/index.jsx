import React from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as deletemark } from 'images/ic-delete.svg';

const Styled = {
  Contain: styled.div`
    font-weight: 700;
    width: 820px;
    height: 666px;
    background-color: var(--White);
  `,
  Head: styled.div`
    width: 100%;
    height: 75px;
    background-color: var(--gray--pale);
    position: relative;
  `,
  Edit: styled.div`
    width: 125px;
    height: 27px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 24px;
  `,
  UploadImg: styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 24px;
  `,
  Wrap: styled.div`
    display: flex;
  `,
  ImgText: styled.div`
    width: 275px;
    height: 20px;
    padding-top: 6px;
    margin-right: 18px;
  `,
  AddImg: styled.button`
    outline: none;
    width: 138px;
    height: 36px;
    background-color: var(--black);
    color: var(--white);
    position: relative;
    right: 0;
  `,
  AddImgText: styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    font-size: 12px;
  `,
  Body: styled.div`
    width: 100%;
    height: 591px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    background-color: var(--White);
  `,
  BodyWrap: styled.div`
    margin-top: 15px;
  `,
  Img: styled.div`
    margin-top: 25px;
    margin-left: 17px;
    width: 144px;
    height: 144px;
    border: 1px solid gray;
    position: relative;
  `,
  Delete: styled(deletemark)`
    width: 32px;
    height: 32px;
    background-color: black;
    position: absolute;
    right: 0;
  `,
};

function MultiImage() {
  return (
    <Styled.Contain>
      <Styled.Head>
        <Styled.Edit>그룹 이미지 편집</Styled.Edit>
        <Styled.UploadImg>
          <Styled.Wrap>
            <Styled.ImgText>이미지 하나 당 최대 5MB JPG 또는 PNG 파일</Styled.ImgText>
            <Styled.AddImg>
              <Styled.AddImgText>
                + 이미지 추가
              </Styled.AddImgText>
            </Styled.AddImg>
          </Styled.Wrap>
        </Styled.UploadImg>
      </Styled.Head>
      <Styled.Body>
        <Styled.Img><Styled.Delete /></Styled.Img>
        <Styled.Img><Styled.Delete /></Styled.Img>
        <Styled.Img><Styled.Delete /></Styled.Img>
        <Styled.Img><Styled.Delete /></Styled.Img>
        <Styled.Img><Styled.Delete /></Styled.Img>
        <Styled.Img><Styled.Delete /></Styled.Img>
        <Styled.Img><Styled.Delete /></Styled.Img>
        <Styled.Img><Styled.Delete /></Styled.Img>
      </Styled.Body>
    </Styled.Contain>
  );
}

export default MultiImage;
