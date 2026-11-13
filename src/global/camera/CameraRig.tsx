import React from 'react';
import {useThree} from '@react-three/fiber';
import {interpolate, useCurrentFrame} from 'remotion';
import * as THREE from 'three';

export interface CameraKeyframe {
  frame: number;
  pos: [number, number, number];
  lookAt: [number, number, number];
}

export interface ShakeWindow {
  startFrame: number;
  endFrame: number;
  amplitude: number;
}

const sampleVec3 = (
  frame: number,
  keyframes: CameraKeyframe[],
  extractor: (kf: CameraKeyframe) => [number, number, number]
): THREE.Vector3 => {
  const frames = keyframes.map((k) => k.frame);
  const xs = keyframes.map((k) => extractor(k)[0]);
  const ys = keyframes.map((k) => extractor(k)[1]);
  const zs = keyframes.map((k) => extractor(k)[2]);

  return new THREE.Vector3(
    interpolate(frame, frames, xs, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(frame, frames, ys, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(frame, frames, zs, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
  );
};

export const CameraRig: React.FC<{
  keyframes: CameraKeyframe[];
  shakeWindows?: ShakeWindow[];
}> = ({keyframes, shakeWindows = []}) => {
  const frame = useCurrentFrame();
  const {camera} = useThree();

  const pos = sampleVec3(frame, keyframes, (k) => k.pos);
  const lookAt = sampleVec3(frame, keyframes, (k) => k.lookAt);

  for (const sw of shakeWindows) {
    if (frame >= sw.startFrame && frame <= sw.endFrame) {
      const mid = (sw.startFrame + sw.endFrame) / 2;
      const amp = interpolate(frame, [sw.startFrame, mid, sw.endFrame], [0, sw.amplitude, 0]);
      pos.x += Math.sin(frame * 2.2) * amp;
      pos.y += Math.cos(frame * 2.7) * amp * 0.8;
    }
  }

  camera.position.copy(pos);
  camera.lookAt(lookAt);
  camera.updateMatrixWorld();

  return null;
};
