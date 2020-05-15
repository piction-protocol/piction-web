import React from 'react';
import styled from 'styled-components/macro';
import useSWR from 'swr'

import Grid from 'styles/Grid';

import { ReactComponent as DeleteIcon } from 'images/ic-delete.svg';

import useCreatorProfileForm from 'hooks/useCreatorProfileForm'

import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import { PrimaryButton } from 'components/atoms/Button';
import ExternalFavicon from 'components/atoms/ExternalFavicon';
import useAPI from 'hooks/useAPI';
import useAlert from 'hooks/useAlert';

const Styled = {
  Form: styled(Grid).attrs({
    as: 'form',
    columns: 9,
  })`
    flex: 1;
    align-self: flex-start;
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
    > * {
      grid-column: 1 / -1;
    }
  `,
  Textarea: styled(Input).attrs({
    as: 'textarea',
  })`
    height: 320px;
    resize: none;
    font-size: var(--font-size--base);
  `,
  InputGroup: styled.div`
    display: grid;
    row-gap: 8px;
    padding-bottom: 40px;
    border-bottom: 1px solid #bababa;
  `,
  Field: styled.div`
    display: flex;
    flex-flow: row wrap;
  `,
  Url: styled.label`
    display: flex;
    position: relative;
    flex: 10;
    align-items: center;
    margin-right: 10px;
    ${Input} {
      flex: 1;
      padding-left: 48px;
    }
  `,
  ExternalFavicon: styled(ExternalFavicon)`
    position: absolute;
    left: 12px;
    width: 24px;
    height: 24px;
  `,
  Name: styled(Input)`
    flex: 4;
    margin-right: 10px;
  `,
  Delete: styled(PrimaryButton)`
    display: flex;
    padding: 14px;
  `,
  AddLink: styled(PrimaryButton).attrs({
    type: 'button',
  })`
    margin: 16px auto 8px;
  `,
  SubmitGroup: styled.div`
    grid-column: 1 / -1;
    padding-top: var(--row-gap);
  `,
  Submit: styled(PrimaryButton).attrs(() => ({
    as: 'input',
    type: 'submit',
  }))`
    margin-right: 16px;
  `,
};

function CreatorProfileFormPage() {
  const [API] = useAPI();
  const { setSuccessAlert, setErrorAlert } = useAlert();

  const { data: profile, revalidate } = useSWR('my/creator-profiles', {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const {
    register,
    linkFields,
    watchLinks,
    addLink,
    removeLink,
    handleSubmit
  } = useCreatorProfileForm(profile);

  const onSubmit = async (data) => {
    try {
      if (profile) {
        await API.creatorProfile.update(data);
      } else {
        await API.creatorProfile.create(data);
      }
      setSuccessAlert('입력하신 내용이 저장되었습니다.');
      window.scrollTo(0, 0);
      revalidate();
    } catch (error) {
      const { message } = error?.response?.data;
      setErrorAlert(message || '서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
    }
  }

  return (
    <>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>크리에이터 정보 설정</Heading>
        <Styled.InputGroup>
          <Label htmlFor="greetings">소개</Label>
          <Styled.Textarea
            id="greetings"
            name="greetings"
            ref={register}
          />
        </Styled.InputGroup>
        <Styled.InputGroup>
          <Label>외부 링크</Label>
          {linkFields.map((field, index) => (
            <Styled.Field key={field.id}>
              <Styled.Url>
                <Styled.ExternalFavicon url={watchLinks[index]?.url} />
                <Input
                  name={`links[${index}].url`}
                  ref={register}
                  defaultValue={field.url}
                  required
                  placeholder="주소 입력"
                />
              </Styled.Url>
              <Styled.Name
                name={`links[${index}].name`}
                ref={register}
                maxLength="10"
                placeholder="이름"
                defaultValue={field.name}
                required
              />
              <Styled.Delete type="button" onClick={() => removeLink(index)}>
                <DeleteIcon />
              </Styled.Delete>
            </Styled.Field>
          ))}
          <Styled.AddLink
            disabled={linkFields.length >= 5}
            onClick={() => addLink({ url: '', name: '' })}
          >
            + 외부 링크 추가
          </Styled.AddLink>
        </Styled.InputGroup>
        <Styled.SubmitGroup>
          <Styled.Submit value="저장" />
        </Styled.SubmitGroup>
      </Styled.Form>
    </>
  );
}

export default CreatorProfileFormPage;
