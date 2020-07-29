import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import useAPI from 'hooks/useAPI';

import MultiImageItem from 'components/molecules/MultiImageItem';

import update from 'immutability-helper';


const Styled = {
  Contain: styled.form`
    position: absolute;
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
  AddImgText: styled.label`
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    position: absolute;
    font-size: 14px;
    cursor: pointer;
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
  Confirm: styled.button`
    text-align: center;
    width: 88px;
    height: 36px;
    background-color: var(--black);
    position: relative;
    font-size: 14px;
    margin-right: 13px;
    color: var(--white);
    outline: none;
  `,
  Input: styled.input`
    display: none;
  `,
};

function MultiImage({
  className, handleImages, showModal, projectId,
}) {
  const [API] = useAPI();
  const [imgUrl, setImgUrl] = useState([]); // 파일 base64
  const [imgId, setImgId] = useState([]); // 파일 ID 값
  const multi = (imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      setImgUrl(prev => [...prev, reader.result]);
    };
  };

  const handleChangeFile = (e) => {
    const uploadImg = e.target.files;
    [...uploadImg].map(async (img) => {
      const data = new FormData();
      data.append('file', img);
      const response = await API.post(projectId).uploadContentImage(data);
      setImgId(prev => [...prev, response.data.id]);
    });
    try {
      [...uploadImg].forEach.call(uploadImg, multi);
      document.getElementById('imgFileUploader').value = '';
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    showModal(false);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    showModal(false);
    handleImages(imgUrl);
    console.log(imgId);
  };

  const findImg = (id) => {
    const card = imgUrl[id];
    return {
      card,
      index: imgUrl.indexOf(card),
    };
  };

  const moveImg = (id, toIndex) => {
    const { card, index } = findImg(id);
    setImgUrl(update(imgUrl, {
      $splice: [[index, 1], [toIndex, 0, card]],
    }));
  };

  return (
    showModal ? (
      <Styled.Contain className={className}>
        <Styled.Head>
          <Styled.Edit>그룹 이미지 편집</Styled.Edit>
          <Styled.UploadImg>
            <Styled.Wrap>
              <Styled.ImgText>이미지 하나 당 최대 5MB JPG 또는 PNG 파일</Styled.ImgText>
              <Styled.AddImg type="button">
                <Styled.AddImgText type="button">
                  <Styled.Input id="imgFileUploader" type="file" accept="image/jpeg, image/png" onChange={handleChangeFile} multiple />
                  + 이미지 추가
                </Styled.AddImgText>
              </Styled.AddImg>
            </Styled.Wrap>
          </Styled.UploadImg>
        </Styled.Head>
        <Styled.Body>
          <Styled.Content>
            {imgUrl.map((img, index) => (
              <MultiImageItem previewImg={img} id2={imgId} id={index} imgUrl={imgUrl} setImgUrl={setImgUrl} findImg={findImg} moveImg={moveImg} />
            ))}
          </Styled.Content>
          <Styled.Choice>
            <Styled.ChoiceWrap>
              <Styled.Cancel onClick={closeModal}>
                <Styled.Text>취소</Styled.Text>
              </Styled.Cancel>
              <Styled.Confirm onClick={formSubmit}>
                <Styled.Text>편집 완료</Styled.Text>
              </Styled.Confirm>
            </Styled.ChoiceWrap>
          </Styled.Choice>
        </Styled.Body>
      </Styled.Contain>
    ) : ''
  );
}

MultiImage.propTypes = {
  className: PropTypes.string,
  handleImages: PropTypes.any,
  showModal: PropTypes.bool,
  projectId: PropTypes.number,
};

export default MultiImage;
