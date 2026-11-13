import React from 'react';
import {useCurrentFrame} from 'remotion';
import {seededRandom} from '../math';

export const Fireflies3D: React.FC<{
  count?: number;
  spreadX?: number;
  spreadZ?: number;
  baseY?: number;
  color?: string;
}> = ({count = 24, spreadX = 18, spreadZ = 18, baseY = 1.6, color = '#D9ED92'}) => {
  const frame = useCurrentFrame();

  return (
    <group>
      {Array.from({length: count}).map((_, i) => {
        const bx = (seededRandom(i * 3 + 1) - 0.5) * spreadX;
        const bz = (seededRandom(i * 5 + 2) - 0.5) * spreadZ;
        const by = baseY + seededRandom(i * 7 + 3) * 2.4;
        const phase = seededRandom(i * 11) * Math.PI * 2;

        const fx = bx + Math.sin(frame * 0.04 + phase) * 0.65;
        const fy = by + Math.cos(frame * 0.06 + phase) * 0.35;
        const pulse = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.12 + phase));

        return (
          <mesh key={i} position={[fx, fy, bz]} scale={0.6 + pulse * 0.6}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5 * pulse} />
          </mesh>
        );
      })}
    </group>
  );
};

export const FlickeringLantern3D: React.FC<{
  position: [number, number, number];
  color?: string;
  intensity?: number;
}> = ({position, color = '#FFB703', intensity = 7}) => {
  const frame = useCurrentFrame();
  const flicker = intensity * (0.85 + Math.sin(frame * 0.35) * 0.12 + Math.cos(frame * 0.21) * 0.05);
  const sway = Math.sin(frame * 0.06) * 0.08;

  return (
    <group position={position} rotation={[0, 0, sway]}>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.14, 0.18, 0.32, 8]} />
        <meshStandardMaterial color="#FFE599" emissive={color} emissiveIntensity={2.6} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.22, 0.14, 8]} />
        <meshStandardMaterial color="#2A2421" roughness={0.6} />
      </mesh>
      <pointLight position={[0, -0.25, 0]} color={color} intensity={flicker} distance={14} />
    </group>
  );
};

export const WaterPlane3D: React.FC<{
  y?: number;
  width?: number;
  length?: number;
  color?: string;
}> = ({y = 0, width = 24, length = 60, color = '#123A4A'}) => {
  const frame = useCurrentFrame();
  const shimmer = 0.22 + Math.sin(frame * 0.08) * 0.06;

  return (
    <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial color={color} roughness={shimmer} metalness={0.45} />
    </mesh>
  );
};
