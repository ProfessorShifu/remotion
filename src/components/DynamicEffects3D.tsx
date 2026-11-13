import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, seededRandom} from '../theme';

// Deterministic 3D arrow volley arcing from the ramparts during Act 3 (frames 430-615)
export const ArrowVolley: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 420 || frame > 630) {
    return null;
  }

  return (
    <group>
      {Array.from({length: 22}).map((_, i) => {
        const launchFrame = 425 + (i % 6) * 14 + Math.floor(i / 6) * 22;
        const t = interpolate(frame, [launchFrame, launchFrame + 42], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        if (t <= 0 || t >= 1) return null;

        const startX = -7 + (i % 7) * 2.3;
        const startY = 6.8;
        const startZ = 8.6;

        const targetX = startX + (seededRandom(i * 3) - 0.5) * 3.5;
        const targetZ = 14.5 + seededRandom(i * 7) * 3.5;

        const x = interpolate(t, [0, 1], [startX, targetX]);
        const z = interpolate(t, [0, 1], [startZ, targetZ]);
        const y = interpolate(t, [0, 0.45, 1], [startY, startY + 2.8, 0.2]);

        return (
          <group key={i} position={[x, y, z]} rotation={[0.9 + t * 0.9, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 1.35, 6]} />
              <meshStandardMaterial color="#D6B88A" />
            </mesh>
            <mesh position={[0, -0.7, 0]}>
              <coneGeometry args={[0.09, 0.24, 6]} />
              <meshStandardMaterial
                color={COLORS.emberOrange}
                emissive={COLORS.goldEmissive}
                emissiveIntensity={2.5}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Impact sparks when battering ram hits the spiked gate (frames 700-760)
export const GateImpactSparks: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 700 || frame > 765) {
    return null;
  }

  const progress = (frame - 700) / 65;

  return (
    <group position={[0, 1.8, 9.6]}>
      {Array.from({length: 18}).map((_, i) => {
        const angle = seededRandom(i * 11) * Math.PI * 2;
        const speed = 1.8 + seededRandom(i * 17) * 2.8;
        const px = Math.cos(angle) * speed * progress;
        const py = Math.sin(angle) * speed * progress - 2.2 * progress * progress;
        const pz = progress * (0.8 + seededRandom(i * 19) * 1.4);
        const scale = Math.max(0.01, 1 - progress);

        return (
          <mesh key={i} position={[px, py, pz]} scale={scale}>
            <dodecahedronGeometry args={[0.09, 0]} />
            <meshStandardMaterial
              color={COLORS.gold}
              emissive={COLORS.emberOrange}
              emissiveIntensity={3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Flickering torches along the gate & bastions
export const TorchLights: React.FC = () => {
  const frame = useCurrentFrame();
  const flickerA = 5.5 + Math.sin(frame * 0.35) * 1.4;
  const flickerB = 5.5 + Math.cos(frame * 0.42) * 1.4;

  return (
    <group>
      {[
        [-2.4, 3.6, 9.9, flickerA],
        [2.4, 3.6, 9.9, flickerB],
        [-9, 7.2, 9, flickerA],
        [9, 7.2, 9, flickerB],
      ].map(([x, y, z, intensity], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshStandardMaterial
              color={COLORS.gold}
              emissive={COLORS.emberOrange}
              emissiveIntensity={2.8}
            />
          </mesh>
          <pointLight color={COLORS.emberOrange} intensity={intensity} distance={11} />
        </group>
      ))}
    </group>
  );
};
