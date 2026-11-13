import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FlickeringLantern3D, WaterPlane3D} from '../../../global';
import {GOLPO01_COLORS} from '../config';

export const RiverBoatScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Boat glides smoothly from far mist (-14) toward the ghat (2.5)
  const boatZ = interpolate(frame, [0, 560, 900], [-14, 1.5, 4.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const boatBob = Math.sin(frame * 0.08) * 0.12;
  const boatRoll = Math.cos(frame * 0.06) * 0.04;

  return (
    <group>
      {/* River surface */}
      <WaterPlane3D y={0} width={22} length={70} color={GOLPO01_COLORS.river} />

      {/* Left & Right Riverbanks */}
      <mesh position={[-13, 0.35, 0]} receiveShadow>
        <boxGeometry args={[8, 1.2, 70]} />
        <meshStandardMaterial color={GOLPO01_COLORS.bank} roughness={0.95} />
      </mesh>
      <mesh position={[13, 0.35, 0]} receiveShadow>
        <boxGeometry args={[8, 1.2, 70]} />
        <meshStandardMaterial color={GOLPO01_COLORS.bank} roughness={0.95} />
      </mesh>

      {/* Wooden Village Ghat (Pier) on the right bank */}
      <group position={[7.4, 0.55, 2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.22, 2.6]} />
          <meshStandardMaterial color={GOLPO01_COLORS.boatWood} roughness={0.85} />
        </mesh>
        <mesh position={[-1.4, -0.45, -1.0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.1, 6]} />
          <meshStandardMaterial color="#3D2414" />
        </mesh>
        <mesh position={[-1.4, -0.45, 1.0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.1, 6]} />
          <meshStandardMaterial color="#3D2414" />
        </mesh>
      </group>

      {/* Golden Wooden Boat (Sonar Toroni) */}
      <group position={[0, 0.25 + boatBob, boatZ]} rotation={[0, 0, boatRoll]}>
        {/* Hull */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.55, 4.8]} />
          <meshStandardMaterial color={GOLPO01_COLORS.boatWood} roughness={0.75} />
        </mesh>
        {/* Bow & Stern */}
        <mesh position={[0, 0.12, 2.8]} rotation={[0.45, 0, 0]} castShadow>
          <coneGeometry args={[0.8, 1.4, 4]} />
          <meshStandardMaterial color={GOLPO01_COLORS.boatTrim} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.12, -2.8]} rotation={[-0.45, 0, 0]} castShadow>
          <coneGeometry args={[0.8, 1.4, 4]} />
          <meshStandardMaterial color={GOLPO01_COLORS.boatTrim} roughness={0.6} />
        </mesh>
        {/* Arched bamboo canopy (Chhoi) */}
        <mesh position={[0, 0.65, -0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.82, 0.82, 2.2, 12, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#8F6B3E" roughness={0.85} side={2} />
        </mesh>
        {/* Lantern pole & glowing lantern */}
        <mesh position={[0.45, 0.85, 1.6]}>
          <cylinderGeometry args={[0.04, 0.04, 1.5, 6]} />
          <meshStandardMaterial color="#3D2414" />
        </mesh>
        <FlickeringLantern3D position={[0.45, 1.55, 1.6]} color={GOLPO01_COLORS.goldGlow} intensity={9} />
      </group>
    </group>
  );
};
