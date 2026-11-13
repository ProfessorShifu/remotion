import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {COLORS} from './theme';
import {CameraRig} from './components/CameraRig';
import {RajprasadWorld} from './components/RajprasadWorld';
import {ArrowVolley, GateImpactSparks, TorchLights} from './components/DynamicEffects3D';
import {KineticBanglaHUD} from './components/KineticBanglaHUD';

export const RajprasadDefense3D: React.FC = () => {
  const {width, height} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.skyBg}}>
      <ThreeCanvas
        width={width}
        height={height}
        shadows
        camera={{fov: 46, near: 0.1, far: 160, position: [26, 22, 34]}}
      >
        <color attach="background" args={[COLORS.skyBg]} />
        <fog attach="fog" args={[COLORS.fog, 22, 72]} />

        {/* Dramatic 3-point + rim lighting */}
        <ambientLight intensity={0.42} color="#9BB1FF" />
        <directionalLight
          position={[18, 28, 16]}
          intensity={1.9}
          color="#FFD699"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-18, 12, -16]} intensity={0.75} color="#4F7CAC" />

        <CameraRig />
        <RajprasadWorld />
        <TorchLights />
        <ArrowVolley />
        <GateImpactSparks />
      </ThreeCanvas>

      <KineticBanglaHUD />
    </AbsoluteFill>
  );
};
