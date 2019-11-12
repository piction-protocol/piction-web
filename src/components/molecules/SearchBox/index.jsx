import React, { useState } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';

import { mediaQuery } from 'styles/media';
import useMedia from 'hooks/useMedia';

import Modal from 'components/externals/Modal';

import { ReactComponent as SearchIcon } from 'images/ic-search.svg';
import { ReactComponent as CloseIcon } from 'images/ic-close.svg';

const Styled = {
  Form: styled.form.attrs({
    role: 'search',
  })`
    display: flex;
    position: relative;
  `,
  Input: styled.input.attrs({
    type: 'search',
  })`
    width: 100%;
    height: 40px;
    padding: 8px 12px;
    padding-left: 40px;
    border: 1px solid var(--gray--dark);
    border-radius: 20px;
    font-size: var(--font-size--small);
    transition: box-shadow var(--transition--form), border-color var(--transition--form), background-color var(--transition--form);

    &:focus {
      border-color: var(--black);
      outline: none;
      box-shadow: 2px 4px 4px 0 var(--shadow-color);
    }

    &::placeholder {
      color: var(--gray--dark);
    }
  `,
  SearchIcon: styled(SearchIcon)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    margin: auto;
  `,
  Button: styled.button.attrs({
    type: 'button',
  })`
    display: flex;
    margin-left: auto;
  `,
  Modal: styled(Modal)`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    flex-flow: row wrap;
    padding: 16px;
  `,
};

function SearchBox({
  ...props
}) {
  const [isOpened, setIsOpened] = useState(false);
  const [query, setQuery] = useState('');
  const isDesktop = useMedia(mediaQuery.desktop);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.querySelector('input').blur();
    setQuery('');
    setIsOpened(false);
    navigate(`/search?query=${query.trim()}`);
  };

  const toggleModal = () => {
    setQuery('');
    setIsOpened(prev => !prev);
  };

  return isDesktop ? (
    <Styled.Form onSubmit={handleSubmit} {...props}>
      <Styled.SearchIcon />
      <Styled.Input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="프로젝트 검색"
      />
    </Styled.Form>
  ) : (
    <>
      <Styled.Button onClick={toggleModal}>
        <SearchIcon />
      </Styled.Button>
      {isOpened && (
        <Styled.Modal close={toggleModal}>
          <Styled.Form onSubmit={handleSubmit} {...props}>
            <Styled.SearchIcon />
            <Styled.Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="프로젝트 검색"
            />
          </Styled.Form>
          <Styled.Button onClick={toggleModal}>
            <CloseIcon />
          </Styled.Button>
        </Styled.Modal>
      )}
    </>
  );
}

export default SearchBox;
