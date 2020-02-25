import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import useSWR from 'swr';
import { useForm, useFieldArray } from 'react-hook-form';

import useAPI from 'hooks/useAPI';

import Grid from 'styles/Grid';

import { ReactComponent as DeleteIcon } from 'images/ic-delete.svg';

import Heading from 'components/atoms/Heading';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import { PrimaryButton } from 'components/atoms/Button';

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
    margin-right: 10px;
    ${Input} {
      flex: 1;
      padding-left: 48px;
    }
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

function CreatorProfileForm({ title }) {
  const [API] = useAPI();

  const { data: profile } = useSWR(() => 'my/creator-profiles', {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const {
    control, register, handleSubmit,
  } = useForm({
    defaultValues: profile,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const onSubmit = async (data) => {
    try {
      if (profile) {
        await API.creatorProfile.update(data);
      } else {
        await API.creatorProfile.create(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>{title}</Heading>
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
        {fields.map((field, index) => (
          <Styled.Field key={field.id}>
            <Styled.Url>
              <Input
                name={`links[${index}].url`}
                ref={register()}
                required
                placeholder="주소 입력"
              />
            </Styled.Url>
            <Styled.Name
              name={`links[${index}].name`}
              ref={register()}
              maxLength="10"
              placeholder="이름"
              required
            />
            <Styled.Delete type="button" onClick={() => remove(index)}>
              <DeleteIcon />
            </Styled.Delete>
          </Styled.Field>
        ))}
        <Styled.AddLink
          disabled={fields.length >= 5}
          onClick={() => append({ name: 'links' })}
        >
          + 외부 링크 추가
        </Styled.AddLink>
      </Styled.InputGroup>
      <Styled.SubmitGroup>
        <Styled.Submit value="저장" />
      </Styled.SubmitGroup>
    </Styled.Form>
  );
}

CreatorProfileForm.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CreatorProfileForm;
