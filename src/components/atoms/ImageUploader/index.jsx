import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

import DefaultImage from 'images/img-user-profile.svg';
import AddIcon from 'images/ic-add.svg';
import DeleteIcon from 'images/ic-delete.svg';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    position: relative;
    width: 190px;
    height: 190px;
    background-image: url(${({ image }) => image || DefaultImage});
    background-size: cover;
    background-position: center;
  `,
  Input: styled.input`
    display: none;
  `,
  Add: styled.label`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .1);
    background-image: url(${AddIcon});
    background-size: 72px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  `,
  Delete: styled.button`
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background-color: var(--black);
    background-image: url(${DeleteIcon});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  `,
};

function ImageUploader({ onChange, className }) {
  const [image, setImage] = useState('');
  const { accessToken } = useCurrentUser();

  const handleChange = (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    axios({
      method: 'patch',
      url: 'http://api-iro.piction.network/users/me/picture',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Auth-Token': accessToken,
      },
    }).then((response) => {
      setImage(response.data.url);
      onChange({ target: { name: 'picture', value: response.data.id } });
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Styled.Wrapper
      image={image}
      className={className}
    >
      <Styled.Input
        id="user-picture"
        type="file"
        onChange={handleChange}
        accept="image/jpeg, image/png"
      />
      {image
        ? <Styled.Delete onClick={() => setImage()} />
        : <Styled.Add htmlFor="user-picture" />
      }
    </Styled.Wrapper>
  );
}

ImageUploader.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ImageUploader.defaultProps = {
  className: '',
};

export default ImageUploader;
