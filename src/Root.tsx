import React from 'react';
import {Composition} from 'remotion';
import {TheLoop} from './TheLoop';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="TheLoop"
    component={TheLoop}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{}}
  />
);