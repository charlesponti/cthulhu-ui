import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

const EmojiWrap = styled.span`
  font-size: ${(props) => (props.size === 'big' ? '48px' : '16px')};
`;

const Emoji = ({ children, kind, size }) => (
  <EmojiWrap aria-label={kind} size={size} role="img">
    {children}
  </EmojiWrap>
);

Emoji.propTypes = {
  children: PropTypes.node.isRequired,
  kind: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};

export default Emoji;
