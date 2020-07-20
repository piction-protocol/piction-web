import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { ReactComponent as deletemark } from 'images/ic-delete.svg';

const Styled = {
  Contain: styled.div`
    position: absolute;
    font-weight: 700;
    width: 820px;
    height: 666px;
    background-color: var(--White);
    display: ${props => (props.visible ? 'visible' : 'none')};
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
    margin-right: 16px;
  `,
  Wrap: styled.div`
    display: flex;
  `,
  ImgText: styled.div`
    width: 315px;
    height: 20px;
    padding-top: 6px;
    margin-right: 18px;
  `,
  AddImg: styled.button`
    outline: none;
    width: 112px;
    height: 36px;
    background-color: var(--black);
    color: var(--white);
    position: relative;
    right: 0;
  `,
  AddImgText: styled.div`
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    position: absolute;
    font-size: 14px;
  `,
  Body: styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    background-color: var(--white);
  `,
  Content: styled.div`
    width: 100%;
    height: 505px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    overflow-y: auto;
    overflow-x: none;
  `,
  Img: styled.div`
    margin-top: 25px;
    margin-left: 17px;
    width: 144px;
    height: 144px;
    border: 1px solid gray;
    position: relative;
    background: url(${props => props.back});
    background-size: cover;
  `,
  Delete: styled(deletemark)`
    width: 32px;
    height: 32px;
    background-color: black;
    position: absolute;
    right: 0;
  `,
  Choice: styled.div`
    width: 100%;
    height: 85px;
    border-top: 1px solid var(--gray--pale);
    bottom: 0;
    position: relative;
  `,
  ChoiceWrap: styled.div`
    justify-content: flex-end;
    display: flex;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
  `,
  Text: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
  `,
  Cancel: styled.button`
    text-align: center;
    width: 58px;
    height: 36px;
    border: solid 2px var(--black);
    background-color: var(--White);
    position: relative;
    font-size: 14px;
    margin-right: 16px;
    color: var(--black);
    outline: none;
  `,
  Confirm: styled.div`
    text-align: center;
    width: 88px;
    height: 36px;
    background-color: var(--black);
    position: relative;
    font-size: 14px;
    margin-right: 13px;
    color: var(--white);
  `,
  Input: styled.input`

  `,
};

function MultiImage({ className }) {
  const [visibleModal, setVisible] = useState(true);
  const [imgBase64, setImgBase64] = useState(''); // 파일 base64
  // const [imgFile, setImgFile] = useState(); // 파일

  const handleChangeFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgBase64(reader.result); // 파일 base64 상태 업데이트
      // setImgFile(file);
    };
  };

  const closeModal = () => {
    setVisible(!visibleModal);
  };

  return (
    visibleModal ? (
      <Styled.Contain className={className} visible={visibleModal}>
        <Styled.Head>
          <Styled.Edit>그룹 이미지 편집</Styled.Edit>
          <Styled.UploadImg>
            <Styled.Wrap>
              <Styled.ImgText>이미지 하나 당 최대 5MB JPG 또는 PNG 파일</Styled.ImgText>
              <Styled.AddImg>
                <Styled.AddImgText>
                  <Styled.Input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile} multiple />
                  + 이미지 추가
                </Styled.AddImgText>
              </Styled.AddImg>
            </Styled.Wrap>
          </Styled.UploadImg>
        </Styled.Head>
        <Styled.Body>
          <Styled.Content>
            <Styled.Img back={imgBase64}>
              <Styled.Delete />
            </Styled.Img>
          </Styled.Content>
          <Styled.Choice>
            <Styled.ChoiceWrap>
              <Styled.Cancel onClick={closeModal}><Styled.Text>취소</Styled.Text></Styled.Cancel>
              <Styled.Confirm onClick={closeModal}><Styled.Text>편집 완료</Styled.Text></Styled.Confirm>
            </Styled.ChoiceWrap>
          </Styled.Choice>
        </Styled.Body>
      </Styled.Contain>
    ) : ''
  );
}

MultiImage.propTypes = {
  className: PropTypes.string,
};

export default MultiImage;
