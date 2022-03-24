import React from 'react';
import styled from '@emotion/styled';
import Emoji from './Emoji';

const Subtitle = styled.p`
  font-style: italic;
  font-size: 16px;
`;

const Hero = () => (
  <div className="text-center hero my-5">
    <Emoji kind="information desk lady" size="lg">
      💁‍♀️
    </Emoji>
    <h1 className="mb-4">Ponti Fullstack</h1>

    <Subtitle>A boilerplate for professional apps.</Subtitle>
  </div>
);

export default Hero;
