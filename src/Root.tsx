import React from 'react';
import {Composition} from 'remotion';
import {ProstutiCampaign} from './compositions/ProstutiCampaign';

const FPS = 30;
const DURATION = 54 * FPS;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Prostuti-Landscape" component={ProstutiCampaign} durationInFrames={DURATION} fps={FPS} width={1920} height={1080}/>
    <Composition id="Prostuti-Vertical" component={ProstutiCampaign} durationInFrames={DURATION} fps={FPS} width={1080} height={1920}/>
    <Composition id="Prostuti-Square" component={ProstutiCampaign} durationInFrames={DURATION} fps={FPS} width={1080} height={1080}/>
  </>
);
