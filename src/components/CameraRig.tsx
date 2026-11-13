import React from 'react';
import {useThree} from '@react-three/fiber';
import {interpolate, useCurrentFrame} from 'remotion';
import * as THREE from 'three';

interface KeyframePose {
  frame: number;
  pos: [number, number, number];
  lookAt: [number, number, number];
}

// Continuous 3D camera flight — no static cuts or slider transitions
const CAMERA_KEYFRAMES: KeyframePose[] = [
  // Act 1: High aerial sweep down toward the Rajprasad
  {frame: 0, pos: [26, 22, 34], lookAt: [0, 3, 0]},
  {frame: 90, pos: [14, 13, 24], lookAt: [0, 3.5, 0]},
  {frame: 175, pos: [4, 7.5, 22], lookAt: [0, 1, 13]},

  // Act 2: Dive down to moat & underwater cutaway (z = 13.5 is moat center)
  {frame: 225, pos: [7.5, 3.2, 17.5], lookAt: [0, 0.2, 13.5]},
  {frame: 300, pos: [5.5, -0.4, 15.8], lookAt: [0, -0.6, 13.2]},
  {frame: 385, pos: [8.5, 2.2, 15.5], lookAt: [0, 2.5, 9]},

  // Act 3: Sweep up the terracotta rampart & orbit bastion during arrow storm
  {frame: 445, pos: [14.5, 9.5, 13.5], lookAt: [7.5, 5.2, 8.5]},
  {frame: 535, pos: [11, 11.5, 17.5], lookAt: [2, 3.5, 11.5]},
  {frame: 610, pos: [5.5, 5.5, 19.5], lookAt: [0, 3.2, 9]},

  // Act 4: Charge down the causeway to the spiked Lion Gate & boiling oil overhead
  {frame: 675, pos: [1.8, 3.4, 14.5], lookAt: [0, 2.8, 8.8]},
  {frame: 745, pos: [3.6, 5.8, 12.8], lookAt: [0, 3.8, 8.8]},
  {frame: 835, pos: [0.6, 3.2, 11.2], lookAt: [0, 1.5, 4]},

  // Act 5: X-ray dive into the underground secret tunnel, then heroic wide pull-back
  {frame: 885, pos: [3.2, -1.6, 4.5], lookAt: [0, -2.2, -2]},
  {frame: 955, pos: [5.5, -1.2, -6.5], lookAt: [0, -1.8, -1]},
  {frame: 1020, pos: [16, 10, 22], lookAt: [0, 3.5, 0]},
  {frame: 1080, pos: [22, 14, 28], lookAt: [0, 3.5, 0]},
];

const sampleVec3 = (
  frame: number,
  extractor: (kf: KeyframePose) => [number, number, number]
): THREE.Vector3 => {
  const frames = CAMERA_KEYFRAMES.map((k) => k.frame);
  const xs = CAMERA_KEYFRAMES.map((k) => extractor(k)[0]);
  const ys = CAMERA_KEYFRAMES.map((k) => extractor(k)[1]);
  const zs = CAMERA_KEYFRAMES.map((k) => extractor(k)[2]);

  const x = interpolate(frame, frames, xs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, frames, ys, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const z = interpolate(frame, frames, zs, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return new THREE.Vector3(x, y, z);
};

export const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const {camera} = useThree();

  const pos = sampleVec3(frame, (k) => k.pos);
  const lookAt = sampleVec3(frame, (k) => k.lookAt);

  // Impact micro-shake during ram strike & oil pour (frames 700-780) and spike hit (frames 290-330)
  let shakeAmp = 0;
  if (frame >= 290 && frame <= 330) {
    shakeAmp = interpolate(frame, [290, 302, 330], [0, 0.14, 0]);
  } else if (frame >= 690 && frame <= 760) {
    shakeAmp = interpolate(frame, [690, 710, 760], [0, 0.18, 0]);
  }

  if (shakeAmp > 0) {
    pos.x += Math.sin(frame * 2.1) * shakeAmp;
    pos.y += Math.cos(frame * 2.7) * shakeAmp * 0.8;
  }

  camera.position.copy(pos);
  camera.lookAt(lookAt);
  camera.updateMatrixWorld();

  return null;
};
