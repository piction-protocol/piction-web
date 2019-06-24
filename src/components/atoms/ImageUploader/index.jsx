import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import useCurrentUser from 'hooks/useCurrentUser';

import AddIcon from 'images/ic-add.svg';
import DeleteIcon from 'images/ic-delete.svg';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    position: relative;
    width: 190px;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center;
    &::after {
      content: '';
      padding-top: ${({ ratio }) => 1 / ratio * 100}%;
    }
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
    background-size: 48px;
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

function ImageUploader({
  name,
  onChange,
  url,
  backgroundImage,
  defaultImage,
  ratio,
  className,
  ...props
}) {
  const [image, setImage] = useState(defaultImage);
  const { accessToken } = useCurrentUser();

  const handleChange = async (event) => {
    const data = new FormData();
    try {
      await data.append('file', event.target.files[0]);
      const response = await axios.patch(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Auth-Token': accessToken,
        },
      });
      setImage(response.data.url);
      onChange({ target: { name, value: response.data.id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.Wrapper
      image={image || backgroundImage}
      ratio={ratio}
      className={className}
      {...props}
    >
      <Styled.Input
        id={name}
        type="file"
        onChange={handleChange}
        accept="image/jpeg, image/png"
      />
      {image
        ? <Styled.Delete onClick={() => setImage()} />
        : <Styled.Add htmlFor={name} />
      }
    </Styled.Wrapper>
  );
}

ImageUploader.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  defaultImage: PropTypes.string,
  backgroundImage: PropTypes.string,
  ratio: PropTypes.number,
  className: PropTypes.string,
};

ImageUploader.defaultProps = {
  defaultImage: '',
  backgroundImage: '',
  ratio: 1,
  className: '',
};

export default ImageUploader;
