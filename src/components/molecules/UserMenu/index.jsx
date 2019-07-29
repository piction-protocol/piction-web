import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

const Styled = {
  Wallet: styled.div`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    padding: 16px;
    border-bottom: 1px solid var(--gray--light);
    color: var(--black);
    font-size: var(--font-size--small);
    font-weight: bold;
  `,
  PXL: styled.span`
    margin-top: 4px;
    color: var(--blue);
    font-size: var(--font-size--base);
  `,
  Links: styled.div`
    display: flex;
    flex-flow: column;
  `,
  Link: styled(Link)`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: var(--black);
    font-size: var(--font-size--small);
    cursor: pointer;
    transition: background-color var(--transition--form);

    svg {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    &:hover {
      background-color: var(--gray--light);
    }
  `,
};

function UserMenu({
  links, PXL,
}) {
  const [API] = useCallback(useAPI(), []);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getProjects = async () => {
      const { data } = await API.my.projects();
      setProjects(data);
    };

    getProjects();
  }, [API]);
  return (
    <>
      <Styled.Wallet>
        내 지갑
        <Styled.PXL>
          {`${PXL.toLocaleString()} PXL`}
        </Styled.PXL>
      </Styled.Wallet>
      {projects.length > 0 && (
        <Styled.Wallet>
          내 프로젝트
          {projects.map(project => (
            project.title
          ))}
        </Styled.Wallet>
      )}
      <Styled.Links>
        {links.map(({
          icon, text, ...link
        }) => (
          <Styled.Link key={text} {...link}>
            {icon}
            {text}
          </Styled.Link>
        ))}
      </Styled.Links>
    </>
  );
}

export default UserMenu;

UserMenu.propTypes = {
  links: PropTypes.array.isRequired,
  PXL: PropTypes.number,
};

UserMenu.defaultProps = {
  PXL: 0,
};
