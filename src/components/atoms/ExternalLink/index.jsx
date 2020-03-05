import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border: 1px solid;
  border-radius: 20px;
  color: #bababa;
  font-size: var(--font-size--small);
`;

const ExternalLink = ({ url, children, ...props }) => (
  <Link href={url} {...props}>
    {children}
  </Link>
);

ExternalLink.propTypes = {
  url: PropTypes.array.isRequired,
  children: PropTypes.node,
};

export default ExternalLink;
