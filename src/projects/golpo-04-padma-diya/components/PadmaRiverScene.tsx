import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FlickeringLantern3D, WaterPlane3D, seededRandom} from '../../../global';
import {GOLPO04_COLORS} from '../config';

/** A single floating diya (clay oil lamp) that drifts with the current */
const FloatingDiya: React.FC<{
  index: number;
  startZ: number;
  startX: number;
  releaseFrame: number;
}> = ({index, startZ, startX, releaseFrame}) => {
  const frame = useCurrentFrame();

  // Stay on bank until release, then drift downstream (negative Z)
  const progress = Math.max(0, frame - releaseFrame);
  const z = startZ - progress * 0.018;
  const bob = Math.sin((frame + index * 17) * 0.09) * 0.07;
  const sway = Math.sin((frame + index * 11) * 0.05) * 0.06;
  const x = startX + Math.sin((frame + index * 7) * 0.03) * 0.35;

  // Fade in when released
  const opacity = interpolate(frame, [releaseFrame, releaseFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < releaseFrame - 5) return null;

  return (
    <group position={[x, 0.18 + bob, z]} rotation={[0, 0, sway]} scale={opacity}>
      {/* Clay base */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.12, 10]} />
        <meshStandardMaterial color={GOLPO04_COLORS.diyaClay} roughness={0.9} />
      </mesh>
      {/* Inner oil pool */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 8]} />
        <meshStandardMaterial color="#2A1A0A" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 0.22, 0]}>
        <coneGeometry args={[0.05, 0.18, 6]} />
        <meshStandardMaterial
          color={GOLPO04_COLORS.diyaFlame}
          emissive={GOLPO04_COLORS.diyaGlow}
          emissiveIntensity={2.8}
        />
      </mesh>
      {/* Soft point light from flame */}
      <pointLight
        position={[0, 0.25, 0]}
        color={GOLPO04_COLORS.diyaGlow}
        intensity={2.4 + Math.sin(frame * 0.28 + index) * 0.4}
        distance={6}
        decay={2}
      />
    </group>
  );
};

export const PadmaRiverScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Diyas released at staggered times so they form a flowing line
  const diyas = Array.from({length: 9}, (_, i) => {
    const seed = i * 13 + 3;
    return {
      index: i,
      startX: (seededRandom(seed) - 0.5) * 3.2,
      startZ: 3.5 + seededRandom(seed + 1) * 1.8,
      releaseFrame: 155 + i * 22,
    };
  });

  // Soft moonlight shimmer on water
  const shimmer = 0.18 + Math.sin(frame * 0.07) * 0.05;

  return (
    <group>
      {/* Wide Padma surface */}
      <WaterPlane3D y={0} width={28} length={80} color={GOLPO04_COLORS.river} />

      {/* Riverbanks */}
      <mesh position={[-14.5, 0.4, 0]} receiveShadow>
        <boxGeometry args={[9, 1.4, 80]} />
        <meshStandardMaterial color={GOLPO04_COLORS.bank} roughness={0.95} />
      </mesh>
      <mesh position={[14.5, 0.4, 0]} receiveShadow>
        <boxGeometry args={[9, 1.4, 80]} />
        <meshStandardMaterial color={GOLPO04_COLORS.bank} roughness={0.95} />
      </mesh>

      {/* Simple earthen ghat / steps on the near bank */}
      <group position={[8.2, 0.55, 2.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.28, 3.2]} />
          <meshStandardMaterial color="#3A2A1C" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.35, -0.9]} castShadow>
          <boxGeometry args={[3.2, 0.22, 1.1]} />
          <meshStandardMaterial color="#2E2116" roughness={0.92} />
        </mesh>
        {/* Small clay pot on the ghat */}
        <mesh position={[-1.1, 0.28, 0.6]} castShadow>
          <cylinderGeometry args={[0.2, 0.26, 0.35, 8]} />
          <meshStandardMaterial color="#6B3E1F" roughness={0.85} />
        </mesh>
      </group>

      {/* A quiet lantern standing on the bank (the old woman is implied) */}
      <FlickeringLantern3D
        position={[7.6, 1.9, 3.4]}
        color={GOLPO04_COLORS.diyaGlow}
        intensity={6.5}
      />

      {/* Floating diyas */}
      {diyas.map((d) => (
        <FloatingDiya key={d.index} {...d} />
      ))}

      {/* Distant misty tree silhouettes on far bank for depth */}
      {[0, 1, 2, 3].map((i) => {
        const tx = -11 + i * 7.5;
        const tz = -18 - i * 4;
        const h = 3.2 + seededRandom(i * 9) * 1.8;
        return (
          <group key={i} position={[tx, 0, tz]}>
            <mesh position={[0, h / 2, 0]}>
              <cylinderGeometry args={[0.18, 0.28, h, 6]} />
              <meshStandardMaterial color="#1A261C" roughness={1} />
            </mesh>
            <mesh position={[0, h + 0.6, 0]}>
              <sphereGeometry args={[1.4 + seededRandom(i * 5) * 0.5, 7, 7]} />
              <meshStandardMaterial color="#152018" roughness={1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
