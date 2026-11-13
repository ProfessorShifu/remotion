import React from 'react';
import {Composition} from 'remotion';
import {RajprasadDefense3D} from './Composition';
import {VIDEO_CONFIG} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={VIDEO_CONFIG.id}
      component={RajprasadDefense3D}
      durationInFrames={VIDEO_CONFIG.durationInFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};
