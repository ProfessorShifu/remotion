import React from 'react';
import {Composition} from 'remotion';
import {SonarToroni3D} from './projects/golpo-01-sonar-toroni/SonarToroni3D';
import {GOLPO01_META} from './projects/golpo-01-sonar-toroni/config';
import {LittleFirefly} from './projects/golpo-02-little-firefly/LittleFirefly';
import {GOLPO02_META} from './projects/golpo-02-little-firefly/config';
import {GumJourney} from './projects/golpo-03-gum-journey/GumJourney';
import {GOLPO03_META} from './projects/golpo-03-gum-journey/config';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={GOLPO01_META.id}
        component={SonarToroni3D}
        durationInFrames={GOLPO01_META.durationInFrames}
        fps={GOLPO01_META.fps}
        width={GOLPO01_META.width}
        height={GOLPO01_META.height}
      />
      <Composition
        id={GOLPO02_META.id}
        component={LittleFirefly}
        durationInFrames={GOLPO02_META.durationInFrames}
        fps={GOLPO02_META.fps}
        width={GOLPO02_META.width}
        height={GOLPO02_META.height}
      />
      <Composition
        id={GOLPO03_META.id}
        component={GumJourney}
        durationInFrames={GOLPO03_META.durationInFrames}
        fps={GOLPO03_META.fps}
        width={GOLPO03_META.width}
        height={GOLPO03_META.height}
      />
    </>
  );
};
