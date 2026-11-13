import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {CameraRig, Fireflies3D, KineticBanglaHUD} from '../../global';
import {GOLPO04_BEATS, GOLPO04_CAMERA, GOLPO04_COLORS} from './config';
import {PadmaRiverScene} from './components/PadmaRiverScene';

export const PadmaDiya3D: React.FC = () => {
  const {width, height} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: GOLPO04_COLORS.skyBg}}>
      <ThreeCanvas
        width={width}
        height={height}
        shadows
        camera={{fov: 42, near: 0.1, far: 140, position: [10, 7.5, 16]}}
      >
        <color attach="background" args={[GOLPO04_COLORS.skyBg]} />
        <fog attach="fog" args={[GOLPO04_COLORS.fog, 12, 52]} />

        {/* Cool moonlight */}
        <ambientLight intensity={0.38} color={GOLPO04_COLORS.moonlight} />
        <directionalLight
          position={[-12, 20, -8]}
          intensity={1.15}
          color={GOLPO04_COLORS.moonlight}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <CameraRig keyframes={GOLPO04_CAMERA} />
        <PadmaRiverScene />
        <Fireflies3D
          count={22}
          spreadX={18}
          spreadZ={26}
          baseY={1.0}
          color="#E8F0A0"
        />
      </ThreeCanvas>

      <KineticBanglaHUD beats={GOLPO04_BEATS} accentColor={GOLPO04_COLORS.accent} />
    </AbsoluteFill>
  );
};
