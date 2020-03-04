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

const Icon = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const ExternalLink = ({ url, name, ...props }) => (
  <Link href={url} {...props}>
    <Icon />
    {name}
  </Link>
);

ExternalLink.propTypes = {
  url: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default ExternalLink;
