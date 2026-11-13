import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {CameraRig, Fireflies3D, KineticBanglaHUD} from '../../global';
import {GOLPO01_BEATS, GOLPO01_CAMERA, GOLPO01_COLORS} from './config';
import {RiverBoatScene} from './components/RiverBoatScene';

export const SonarToroni3D: React.FC = () => {
  const {width, height} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: GOLPO01_COLORS.skyBg}}>
      <ThreeCanvas
        width={width}
        height={height}
        shadows
        camera={{fov: 45, near: 0.1, far: 120, position: [12, 8, 18]}}
      >
        <color attach="background" args={[GOLPO01_COLORS.skyBg]} />
        <fog attach="fog" args={[GOLPO01_COLORS.fog, 14, 48]} />

        <ambientLight intensity={0.45} color={GOLPO01_COLORS.moonlight} />
        <directionalLight
          position={[-14, 18, -10]}
          intensity={1.3}
          color={GOLPO01_COLORS.moonlight}
          castShadow
        />

        <CameraRig keyframes={GOLPO01_CAMERA} />
        <RiverBoatScene />
        <Fireflies3D count={28} spreadX={16} spreadZ={24} baseY={1.1} />
      </ThreeCanvas>

      <KineticBanglaHUD beats={GOLPO01_BEATS} accentColor={GOLPO01_COLORS.goldGlow} />
    </AbsoluteFill>
  );
};
