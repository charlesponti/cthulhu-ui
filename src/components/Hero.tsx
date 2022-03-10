import React from 'react';
import styled from '@emotion/styled';
import Emoji from './Emoji';

const Subtitle = styled.p`
  font-style: italic;
  font-size: 16px;
`;

const Hero = () => (
  <div className="text-center hero my-5">
    <Emoji kind="rocket" size="big">
      🚀
    </Emoji>
    <h1 className="mb-4">Hominem</h1>

    <Subtitle>All Your Personal Data. Yours.</Subtitle>
  </div>
);

export default Hero;
