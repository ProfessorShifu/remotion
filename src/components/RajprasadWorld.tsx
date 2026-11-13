import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS} from '../theme';

const BastionTower: React.FC<{position: [number, number, number]}> = ({position}) => {
  return (
    <group position={position}>
      {/* Octagonal terracotta tower */}
      <mesh position={[0, 3.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.1, 2.4, 7.2, 8]} />
        <meshStandardMaterial color={COLORS.terracotta} roughness={0.78} />
      </mesh>
      {/* Stone trim band */}
      <mesh position={[0, 6.2, 0]} castShadow>
        <cylinderGeometry args={[2.25, 2.25, 0.45, 8]} />
        <meshStandardMaterial color={COLORS.stone} roughness={0.65} />
      </mesh>
      {/* Curved Bangla-chala dome */}
      <mesh position={[0, 7.9, 0]} castShadow>
        <sphereGeometry args={[1.65, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshStandardMaterial color={COLORS.terracottaLight} roughness={0.55} />
      </mesh>
      {/* Golden Kalash finial */}
      <mesh position={[0, 9.75, 0]} castShadow>
        <coneGeometry args={[0.24, 0.9, 8]} />
        <meshStandardMaterial
          color={COLORS.gold}
          metalness={0.8}
          roughness={0.25}
          emissive={COLORS.goldEmissive}
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
};

const MoatDefenses: React.FC = () => {
  const frame = useCurrentFrame();

  // Attacker raft approaching & hitting submerged spikes around frame 295
  const raftZ = interpolate(frame, [195, 295, 340], [16.8, 13.7, 13.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const raftTilt = interpolate(frame, [285, 305, 340], [0, -0.32, -0.24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rippleScale = 1 + Math.sin(frame * 0.12) * 0.08;

  // Crocodile patrol along moat
  const crocX = Math.sin(frame * 0.04) * 5.2;

  return (
    <group>
      {/* Moat trench basin */}
      <mesh position={[0, -1.65, 13.5]} receiveShadow>
        <boxGeometry args={[28, 0.5, 5.2]} />
        <meshStandardMaterial color="#182226" roughness={0.95} />
      </mesh>

      {/* Semi-transparent moat water (cutaway visibility) */}
      <mesh position={[0, -0.15, 13.5]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, rippleScale, 1]}>
        <planeGeometry args={[28, 5]} />
        <meshStandardMaterial
          color={COLORS.moatWater}
          transparent
          opacity={0.56}
          roughness={0.18}
          metalness={0.3}
        />
      </mesh>

      {/* Submerged sharpened bamboo/iron spikes */}
      {Array.from({length: 14}).map((_, i) => {
        const sx = -9 + i * 1.4;
        const sz = 12.6 + (i % 2) * 1.4;
        return (
          <mesh key={i} position={[sx, -0.75, sz]} rotation={[0.45, 0, 0]} castShadow>
            <coneGeometry args={[0.16, 1.55, 6]} />
            <meshStandardMaterial color="#8A6A4B" roughness={0.6} />
          </mesh>
        );
      })}

      {/* Stylized patrolling crocodile */}
      <group position={[crocX, -0.32, 14.3]} rotation={[0, Math.cos(frame * 0.04) > 0 ? 0 : Math.PI, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.1, 0.28, 0.55]} />
          <meshStandardMaterial color="#2E4C2E" roughness={0.7} />
        </mesh>
        <mesh position={[1.25, 0.05, 0]}>
          <coneGeometry args={[0.24, 0.8, 5]} />
          <meshStandardMaterial color="#2E4C2E" roughness={0.7} />
        </mesh>
      </group>

      {/* Enemy wooden assault raft hitting the hidden spikes */}
      <group position={[1.2, -0.02, raftZ]} rotation={[raftTilt, 0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 0.22, 1.6]} />
          <meshStandardMaterial color="#5E3C24" roughness={0.85} />
        </mesh>
        {/* Red danger highlight on impact */}
        {frame >= 290 && frame <= 360 ? (
          <pointLight position={[0, 0.6, 0]} color={COLORS.dangerRed} intensity={6} distance={5} />
        ) : null}
      </group>
    </group>
  );
};

const LionGateAndRampart: React.FC = () => {
  const frame = useCurrentFrame();

  // Battering ram lunging at the spiked gate around frame 690-715
  const ramZ = interpolate(frame, [620, 680, 705, 745], [14.8, 12.4, 9.8, 11.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Boiling oil stream pouring from murder hole (frames 720-835)
  const oilProgress = interpolate(frame, [725, 765], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group>
      {/* Stone causeway bridge across moat */}
      <mesh position={[0, 0.05, 13.5]} receiveShadow castShadow>
        <boxGeometry args={[3.8, 0.35, 5.4]} />
        <meshStandardMaterial color={COLORS.stone} roughness={0.85} />
      </mesh>

      {/* Main Front Rampart Walls (left and right of gate) */}
      <mesh position={[-5.4, 3.1, 9]} castShadow receiveShadow>
        <boxGeometry args={[7.2, 6.2, 1.4]} />
        <meshStandardMaterial color={COLORS.terracotta} roughness={0.8} />
      </mesh>
      <mesh position={[5.4, 3.1, 9]} castShadow receiveShadow>
        <boxGeometry args={[7.2, 6.2, 1.4]} />
        <meshStandardMaterial color={COLORS.terracotta} roughness={0.8} />
      </mesh>

      {/* Side & Back Fortress Walls */}
      <mesh position={[-9, 3.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 6.2, 18]} />
        <meshStandardMaterial color={COLORS.terracottaDark} roughness={0.82} />
      </mesh>
      <mesh position={[9, 3.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 6.2, 18]} />
        <meshStandardMaterial color={COLORS.terracottaDark} roughness={0.82} />
      </mesh>
      <mesh position={[0, 3.1, -9]} castShadow receiveShadow>
        <boxGeometry args={[18, 6.2, 1.4]} />
        <meshStandardMaterial color={COLORS.terracottaDark} roughness={0.82} />
      </mesh>

      {/* Crenellations along front wall */}
      {[-8, -6.4, -4.8, -3.2, 3.2, 4.8, 6.4, 8].map((cx, i) => (
        <mesh key={i} position={[cx, 6.55, 9]} castShadow>
          <boxGeometry args={[0.85, 0.75, 1.45]} />
          <meshStandardMaterial color={COLORS.terracottaLight} roughness={0.75} />
        </mesh>
      ))}

      {/* Grand Gate Archway (Singha-Darja) */}
      <mesh position={[0, 5.3, 9]} castShadow>
        <boxGeometry args={[4.2, 2.2, 1.8]} />
        <meshStandardMaterial color={COLORS.terracottaLight} roughness={0.72} />
      </mesh>

      {/* Heavy Teakwood Double Doors */}
      <mesh position={[-0.92, 2.1, 9.15]} castShadow>
        <boxGeometry args={[1.76, 4.2, 0.35]} />
        <meshStandardMaterial color={COLORS.teakWood} roughness={0.7} />
      </mesh>
      <mesh position={[0.92, 2.1, 9.15]} castShadow>
        <boxGeometry args={[1.76, 4.2, 0.35]} />
        <meshStandardMaterial color={COLORS.teakWood} roughness={0.7} />
      </mesh>

      {/* Conical Iron Spikes (anti-elephant defense) */}
      {[-1.35, -0.5, 0.5, 1.35].map((sx) =>
        [1.1, 2.1, 3.1].map((sy) => (
          <mesh
            key={`${sx}-${sy}`}
            position={[sx, sy, 9.48]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <coneGeometry args={[0.14, 0.45, 6]} />
            <meshStandardMaterial color={COLORS.iron} metalness={0.85} roughness={0.3} />
          </mesh>
        ))
      )}

      {/* Enemy Battering Ram */}
      <group position={[0, 1.4, ramZ]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.38, 3.8, 10]} />
          <meshStandardMaterial color="#4A2E1B" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0, -2.0]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.36, 0.65, 8]} />
          <meshStandardMaterial color={COLORS.iron} metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* Boiling Oil Pour from Murder Hole (frames 725-835) */}
      {oilProgress > 0 ? (
        <group>
          <mesh position={[-0.7, 4.7 - oilProgress * 2.1, 9.9]}>
            <cylinderGeometry args={[0.14, 0.24, 4.2 * oilProgress, 8]} />
            <meshStandardMaterial
              color={COLORS.emberOrange}
              emissive={COLORS.goldEmissive}
              emissiveIntensity={2.2}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0.7, 4.7 - oilProgress * 2.1, 9.9]}>
            <cylinderGeometry args={[0.14, 0.24, 4.2 * oilProgress, 8]} />
            <meshStandardMaterial
              color={COLORS.emberOrange}
              emissive={COLORS.goldEmissive}
              emissiveIntensity={2.2}
              roughness={0.2}
            />
          </mesh>
          <pointLight
            position={[0, 2.2, 10.2]}
            color={COLORS.emberOrange}
            intensity={12 * oilProgress}
            distance={9}
          />
        </group>
      ) : null}
    </group>
  );
};

const InnerPalaceAndTunnel: React.FC = () => {
  const frame = useCurrentFrame();

  // During Act 5 (frames 840-975), make the courtyard floor semi-transparent for X-ray cutaway
  const floorOpacity = interpolate(frame, [835, 865, 965, 995], [1, 0.22, 0.22, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tunnelTorchFlicker = 4 + Math.sin(frame * 0.4) * 1.2;

  return (
    <group>
      {/* Courtyard Ground (with X-ray cutaway in Act 5) */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[18, 0.3, 18]} />
        <meshStandardMaterial
          color={COLORS.stoneDark}
          roughness={0.88}
          transparent={floorOpacity < 0.99}
          opacity={floorOpacity}
        />
      </mesh>

      {/* Central Royal Palace (2-tier Rajprasad) */}
      <group position={[0, 0.15, -2.5]}>
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.5, 5, 6.2]} />
          <meshStandardMaterial color={COLORS.terracottaLight} roughness={0.72} />
        </mesh>
        <mesh position={[0, 6.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.4, 2.6, 4.2]} />
          <meshStandardMaterial color={COLORS.terracotta} roughness={0.7} />
        </mesh>
        {/* Central Royal Dome */}
        <mesh position={[0, 7.9, 0]} castShadow>
          <sphereGeometry args={[2.1, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial color={COLORS.gold} metalness={0.45} roughness={0.35} />
        </mesh>
        <mesh position={[0, 10.3, 0]}>
          <coneGeometry args={[0.25, 1.1, 8]} />
          <meshStandardMaterial color={COLORS.gold} metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Underground Secret Escape Tunnel (Gupto Surongo) */}
      <group position={[0, -2.2, -1]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.8, 2.4, 14]} />
          <meshStandardMaterial color={COLORS.tunnelBrick} side={2} roughness={0.85} />
        </mesh>
        {/* Glowing golden escape marker */}
        <mesh position={[0, -0.5, -5.5]} rotation={[0, frame * 0.04, 0]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={COLORS.gold}
            emissive={COLORS.goldEmissive}
            emissiveIntensity={1.6}
          />
        </mesh>
        <pointLight position={[0, 0.4, 2]} color={COLORS.emberOrange} intensity={tunnelTorchFlicker} distance={8} />
        <pointLight position={[0, 0.4, -4]} color={COLORS.emberOrange} intensity={tunnelTorchFlicker} distance={8} />
      </group>
    </group>
  );
};

export const RajprasadWorld: React.FC = () => {
  return (
    <group>
      {/* Surrounding terrain */}
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color={COLORS.ground} roughness={0.95} />
      </mesh>

      {/* 4 Corner Bastions */}
      <BastionTower position={[-9, 0, 9]} />
      <BastionTower position={[9, 0, 9]} />
      <BastionTower position={[-9, 0, -9]} />
      <BastionTower position={[9, 0, -9]} />

      <MoatDefenses />
      <LionGateAndRampart />
      <InnerPalaceAndTunnel />
    </group>
  );
};
