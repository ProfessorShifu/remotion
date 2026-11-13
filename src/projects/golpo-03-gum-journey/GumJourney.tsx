import React, {useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {Audio, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import * as THREE from 'three';
import {AbsoluteFill} from 'remotion';
import {GOLPO03_META} from './config';

const gumPink = '#ff4f91';
const skin = '#e8a986';
const stomachCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-0.15, 3.85, 0.25),
  new THREE.Vector3(-0.05, 2.95, 0.2),
  new THREE.Vector3(0.05, 2.0, 0.15),
  new THREE.Vector3(0.05, 1.0, 0.1),
  new THREE.Vector3(0.2, 0.1, 0.08),
  new THREE.Vector3(0.7, -0.75, 0.1),
]);

const intestinalCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.8, -3.1, 0.12),
  new THREE.Vector3(1.0, -3.55, 0.12),
  new THREE.Vector3(0.45, -3.9, 0.12),
  new THREE.Vector3(-0.35, -3.65, 0.12),
  new THREE.Vector3(-0.65, -4.05, 0.12),
  new THREE.Vector3(0.0, -4.4, 0.12),
  new THREE.Vector3(0.75, -4.15, 0.12),
  new THREE.Vector3(0.65, -4.65, 0.12),
  new THREE.Vector3(-0.15, -4.9, 0.12),
  new THREE.Vector3(-0.65, -5.3, 0.12),
  new THREE.Vector3(-0.1, -5.65, 0.12),
  new THREE.Vector3(0.5, -5.85, 0.12),
  new THREE.Vector3(0.35, -6.45, 0.12),
  new THREE.Vector3(-0.1, -7.05, 0.12),
]);

const particles = Array.from({length: 44}, (_, i) => ({
  x: Math.sin(i * 12.9898) * 1.45,
  y: Math.cos(i * 78.233) * 0.9,
  z: Math.sin(i * 4.12) * 0.35,
  phase: i * 0.83,
  size: 0.018 + (i % 4) * 0.009,
}));

const smooth = {easing: Easing.inOut(Easing.cubic), extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const MainCamera: React.FC = () => {
  const frame = useCurrentFrame();
  const {camera} = useThree();
  const view = camera as THREE.PerspectiveCamera;
  const centerY = interpolate(
    frame,
    [0, 75, 220, 270, 940, 1110, 1435, 1530, 1800],
    [5.1, 4.8, 0.8, -2.15, -2.15, -3.9, -5.85, 0.35, 0.35],
    smooth,
  );
  const centerX = interpolate(frame, [0, 1435, 1530, 1800], [0, 0, 0.28, 0.28], smooth);
  const distance = interpolate(frame, [0, 80, 215, 260, 940, 1100, 1450, 1530, 1800], [15, 13, 12, 8.8, 8.8, 9.5, 8.5, 21, 21], smooth);
  const target = new THREE.Vector3(centerX, centerY, 0);
  view.position.set(centerX, centerY + 0.28, distance);
  view.lookAt(target);
  view.updateMatrixWorld();
  return null;
};

const Gum: React.FC<{frame: number}> = ({frame}) => {
  const x = interpolate(frame, [0, 58, 95, 200, 245, 900, 1040, 1180, 1420, 1500], [0.02, 0.02, 0.05, -0.12, 0.6, 0.6, 0.72, 0.1, 0.2, 0], smooth);
  const y = interpolate(frame, [0, 58, 95, 200, 245, 900, 1040, 1180, 1420, 1500], [4.08, 4.08, 3.7, 0.6, -2.45, -2.45, -2.55, -3.65, -6.95, -7.2], smooth);
  const z = interpolate(frame, [0, 230, 900, 1200, 1500], [0.6, 0.45, 0.5, 0.35, 0.2], smooth);
  const bounce = frame < 250 ? 0 : frame < 940 ? Math.sin(frame * 0.105) * 0.055 : Math.sin(frame * 0.22) * 0.08;
  const scale = interpolate(frame, [0, 30, 48, 58, 65, 90], [0.23, 0.28, 1.25, 1.4, 0.42, 0.3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const opacity = interpolate(frame, [0, 1500, 1530], [1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tumbling = interpolate(frame, [80, 245, 1040, 1400], [0, 8, 20, 35], smooth);
  return (
    <group position={[x, y + bounce, z]} rotation={[0.1, tumbling, Math.sin(frame * 0.11) * 0.14]} scale={scale} visible={frame < 1530}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.48, 3]} />
        <meshPhysicalMaterial color={gumPink} roughness={0.19} metalness={0.02} clearcoat={1} clearcoatRoughness={0.08} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.14, 0.19, 0.36]} scale={[0.11, 0.05, 0.025]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial color="#fff4fa" transparent opacity={0.8 * opacity} />
      </mesh>
      {frame > 790 && frame < 1040 && (
        <group>
          <mesh position={[0.3, 0.37, 0.12]} rotation={[0, 0, 0.8]}>
            <cylinderGeometry args={[0.002, 0.002, 0.48, 5]} />
            <meshBasicMaterial color="#fff1d2" transparent opacity={(frame - 790) / 850} />
          </mesh>
          <mesh position={[0.34, 0.4, 0.12]} rotation={[0, 0, -0.55]}>
            <cylinderGeometry args={[0.002, 0.002, 0.42, 5]} />
            <meshBasicMaterial color="#fff1d2" transparent opacity={(frame - 790) / 850} />
          </mesh>
        </group>
      )}
    </group>
  );
};

const Character: React.FC<{frame: number; bathroom?: boolean}> = ({frame, bathroom = false}) => {
  const mouth = Math.sin(frame * 0.4) * 0.018;
  const blink = [72, 75, 174, 177, 402, 405, 1517, 1520, 1705, 1708].some((n) => frame >= n && frame <= n + 2);
  const shrug = interpolate(frame, [1570, 1600, 1640, 1690], [0, 0.35, 0.35, 0], smooth);
  const scale = bathroom ? 0.93 : 1;
  const bodyVisible = !bathroom || frame >= 1490;

  return (
    <group position={[0, 0, 0]} scale={scale} visible={bodyVisible}>
      <mesh position={[0, -0.12, -0.48]} scale={[1.48, 2.25, 0.66]} castShadow>
        <capsuleGeometry args={[0.88, 1.7, 8, 20]} />
        <meshPhysicalMaterial color={skin} roughness={0.55} transparent opacity={bathroom ? 1 : 0.2} depthWrite={bathroom} side={THREE.DoubleSide} />
      </mesh>
      {!bathroom && (
        <mesh position={[0, -0.12, 0.18]} scale={[1.3, 2.15, 0.25]}>
          <sphereGeometry args={[1, 40, 32]} />
          <meshPhysicalMaterial color="#ffcfb8" roughness={0.26} transparent opacity={0.1} clearcoat={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
      <mesh position={[0, 4.85, 0]} scale={[0.91, 1.12, 0.79]} castShadow>
        <sphereGeometry args={[1, 48, 36]} />
        <meshPhysicalMaterial color={skin} roughness={0.42} clearcoat={0.18} />
      </mesh>
      <mesh position={[0, 5.57, -0.06]} scale={[0.91, 0.55, 0.79]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial color="#49353a" roughness={0.82} />
      </mesh>
      <mesh position={[0, 4.22, 0.05]} scale={[0.26, 0.4, 0.24]}>
        <capsuleGeometry args={[0.31, 0.45, 6, 12]} />
        <meshStandardMaterial color={skin} roughness={0.45} transparent={!bathroom} opacity={bathroom ? 1 : 0.25} />
      </mesh>
      {[-0.32, 0.32].map((x) => (
        <group key={x} position={[x, 4.95, 0.675]}>
          <mesh scale={[0.16, 0.2, 0.07]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#fffaf2" />
          </mesh>
          <mesh position={[0, 0, 0.066]} scale={[0.073, blink ? 0.018 : 0.1, 0.035]}>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#433637" />
          </mesh>
          <mesh position={[0.01, 0.012, 0.099]} scale={0.025}>
            <sphereGeometry args={[1, 12, 10]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.29, -0.02]} rotation={[0, 0, x < 0 ? 0.12 : -0.12]}>
            <capsuleGeometry args={[0.045, 0.28, 4, 8]} />
            <meshStandardMaterial color="#49353a" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 4.72, 0.72]} scale={[0.115, 0.2, 0.11]}>
        <sphereGeometry args={[1, 20, 16]} />
        <meshStandardMaterial color="#d99576" />
      </mesh>
      <mesh position={[0, 4.38, 0.66]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.13, 0.025 + mouth, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#874f4b" />
      </mesh>
      {bathroom && frame > 1570 && (
        <group position={[0, 2.68, 0]} rotation={[0, 0, -0.32 * shrug]}>
          <mesh position={[-1.28, 0.1, 0]} rotation={[0, 0, -0.55]}>
            <capsuleGeometry args={[0.12, 1.25, 6, 10]} />
            <meshStandardMaterial color={skin} />
          </mesh>
          <mesh position={[1.28, 0.1, 0]} rotation={[0, 0, 0.55]}>
            <capsuleGeometry args={[0.12, 1.25, 6, 10]} />
            <meshStandardMaterial color={skin} />
          </mesh>
        </group>
      )}
      {bathroom && (
        <group>
          {[-0.48, 0.48].map((x) => (
            <group key={x} position={[x, -3.55, 0]}>
              <mesh position={[0, -0.68, 0]} rotation={[0, 0, x < 0 ? walkLeg(frame) : -walkLeg(frame)]}>
                <capsuleGeometry args={[0.16, 1.15, 6, 12]} />
                <meshStandardMaterial color="#52607a" roughness={0.76} />
              </mesh>
              <mesh position={[x < 0 ? -0.12 : 0.12, -1.37, 0.1]} scale={[0.25, 0.11, 0.4]}>
                <sphereGeometry args={[1, 20, 12]} />
                <meshStandardMaterial color="#e9e3da" roughness={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
};

const walkLeg = (frame: number): number => {
  const amount = interpolate(frame, [1620, 1640, 1790], [0, 0, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return Math.sin(frame * 0.14) * amount;
};

const Stomach: React.FC<{frame: number}> = ({frame}) => {
  const squeeze = frame >= 960 && frame <= 1110 ? Math.sin(((frame - 960) / 150) * Math.PI) : 0;
  const acidLevel = interpolate(frame, [0, 240, 450, 900, 1080], [0.04, 0.62, 0.47, 0.55, 0.2], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const appleFade = interpolate(frame, [260, 300, 385, 420], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pizzaFade = interpolate(frame, [290, 330, 430, 470], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tub = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.1, 3.9, 0.26),
    new THREE.Vector3(0.05, 2.4, 0.25),
    new THREE.Vector3(-0.02, 1.25, 0.26),
    new THREE.Vector3(0.14, 0.15, 0.25),
    new THREE.Vector3(0.55, -0.75, 0.26),
  ]), []);

  return (
    <group>
      <mesh position={[0, 1.5, -0.16]} castShadow visible={frame > 58 && frame < 1480}>
        <tubeGeometry args={[tub, 60, 0.17, 16, false]} />
        <meshPhysicalMaterial color="#df8e83" roughness={0.34} clearcoat={0.38} />
      </mesh>
      <group position={[0.72, -2.1, 0]} scale={[1 - squeeze * 0.28, 1 + squeeze * 0.11, 1]}>
        <mesh position={[0, 0, -0.15]} scale={[1.3, 1.42, 0.45]} castShadow>
          <sphereGeometry args={[1, 48, 40]} />
          <meshPhysicalMaterial color="#e98579" roughness={0.32} clearcoat={0.4} transparent opacity={0.58} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.46, 0.17]} scale={[1.05, acidLevel, 0.26]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshPhysicalMaterial color="#ffb947" emissive="#ff8a24" emissiveIntensity={0.52} roughness={0.21} metalness={0.02} clearcoat={0.7} transparent opacity={0.87} />
        </mesh>
        <mesh position={[0.12, -1.05, 0]} rotation={[0, 0, 0.16]}>
          <torusGeometry args={[0.58, 0.12, 12, 36, Math.PI * 1.2]} />
          <meshStandardMaterial color="#df8e83" roughness={0.4} />
        </mesh>
        {particles.map((p, i) => {
          const swirl = frame * 0.045 + p.phase;
          const visible = frame > 238 && frame < 1120;
          return (
            <mesh key={i} position={[p.x + Math.cos(swirl) * 0.12, p.y * 0.6 - 0.3, p.z + Math.sin(swirl) * 0.1]} scale={p.size} visible={visible}>
              <sphereGeometry args={[1, 8, 6]} />
              <meshBasicMaterial color={i % 5 === 0 ? '#fff1be' : '#ffda82'} transparent opacity={0.35 + Math.abs(Math.sin(swirl)) * 0.55} />
            </mesh>
          );
        })}
        <group position={[-0.44, -0.5, 0.43]} rotation={[0.1, 0.25, frame * 0.04]} scale={appleFade}>
          <mesh scale={[0.27, 0.3, 0.2]}>
            <sphereGeometry args={[1, 28, 22]} />
            <meshPhysicalMaterial color="#8fce64" roughness={0.28} clearcoat={0.8} transparent opacity={appleFade} />
          </mesh>
          <mesh position={[0.05, 0.3, 0]} rotation={[0, 0, -0.25]}>
            <cylinderGeometry args={[0.025, 0.035, 0.16, 8]} />
            <meshStandardMaterial color="#75543b" />
          </mesh>
        </group>
        <group position={[0.38, -0.2, 0.51]} rotation={[0, 0, 0.25]} scale={pizzaFade}>
          <mesh rotation={[0.2, 0, 0.2]} scale={[0.38, 0.09, 0.34]}>
            <coneGeometry args={[0.48, 0.18, 3]} />
            <meshPhysicalMaterial color="#e5b15f" roughness={0.4} transparent opacity={pizzaFade} />
          </mesh>
          {[-0.12, 0.08, 0.19].map((x) => (
            <mesh key={x} position={[x, 0.07, 0.1]} scale={0.055}>
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color="#d75c50" transparent opacity={pizzaFade} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};

const Intestines: React.FC<{frame: number}> = ({frame}) => {
  const tube = useMemo(() => new THREE.TubeGeometry(intestinalCurve, 140, 0.18, 16, false), []);
  const visibility = interpolate(frame, [900, 970, 1460], [0, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 1 + Math.max(0, Math.sin((frame - 955) * 0.09)) * 0.07;

  return (
    <group scale={pulse}>
      <mesh geometry={tube}>
        <meshPhysicalMaterial color="#f0a08a" roughness={0.32} clearcoat={0.4} transparent opacity={0.8 * visibility} />
      </mesh>
      <mesh position={[0, -4.6, -0.27]} scale={[1.22, 1.74, 0.26]}>
        <sphereGeometry args={[1, 40, 28]} />
        <meshPhysicalMaterial color="#e99a86" roughness={0.4} transparent opacity={0.16 * visibility} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({length: 22}, (_, i) => {
        const x = Math.sin(i * 2.41) * 0.76;
        const y = -3.7 - (i % 7) * 0.36;
        const z = 0.04;
        return (
          <mesh key={i} position={[x, y, z]} scale={[0.13, 0.08, 0.035]} visible={frame > 940 && frame < 1490}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color={i % 2 ? '#f5b69d' : '#d97f7b'} roughness={0.38} />
          </mesh>
        );
      })}
    </group>
  );
};

const Seasons: React.FC<{frame: number}> = ({frame}) => {
  const active = frame >= 540 && frame <= 1000;
  const season = Math.floor(Math.max(0, frame - 540) / 115) % 4;
  const colors = ['#e9f2ff', '#f7a9c2', '#f59d42', '#c8e8f7'];
  return (
    <group visible={active}>
      {Array.from({length: 28}, (_, i) => {
        const angle = frame * 0.018 + i * (Math.PI * 2 / 28);
        const x = Math.cos(angle) * (2.1 + (i % 3) * 0.22);
        const y = -2.0 + Math.sin(angle * 1.3) * 1.3;
        const fall = (frame * (0.008 + (i % 3) * 0.002) + i * 0.34) % 2.8;
        return (
          <mesh key={i} position={[x, y - fall, 0.3 + Math.sin(angle) * 0.4]} rotation={[angle, angle, frame * 0.04]} scale={0.04 + (i % 3) * 0.016}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={colors[season]} transparent opacity={0.82} />
          </mesh>
        );
      })}
      <mesh position={[-2.25, -0.9, -0.15]} rotation={[0, 0, frame * 0.18]}>
        <torusGeometry args={[0.45, 0.018, 6, 64]} />
        <meshBasicMaterial color={colors[season]} transparent opacity={0.62} />
      </mesh>
      <mesh position={[-2.25, -0.9, -0.15]}>
        <torusGeometry args={[0.3, 0.012, 6, 64]} />
        <meshBasicMaterial color="#fff2c2" transparent opacity={0.45} />
      </mesh>
    </group>
  );
};

const Bathroom: React.FC<{frame: number}> = ({frame}) => {
  const fade = interpolate(frame, [1490, 1530, 1760, 1800], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const walk = interpolate(frame, [1630, 1790], [0, 1.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <group visible={frame >= 1490} position={[0, 0, 0]}>
      <mesh position={[0, 0, -2.2]} scale={[14, 18, 0.25]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#e6e5dc" roughness={0.82} transparent opacity={fade} />
      </mesh>
      <mesh position={[0, -5.55, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#d5d4ce" roughness={0.72} transparent opacity={fade} />
      </mesh>
      {Array.from({length: 16}, (_, i) => (
        <mesh key={i} position={[-3.4 + (i % 4) * 2.25, -3.6 + Math.floor(i / 4) * 2.3, -1.9]}>
          <boxGeometry args={[2.18, 0.035, 0.025]} />
          <meshStandardMaterial color="#c7c9c3" transparent opacity={0.62 * fade} />
        </mesh>
      ))}
      <mesh position={[2.9, 0.8, -0.9]} scale={[1.4, 2.8, 0.16]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color="#b4d7dd" roughness={0.08} metalness={0.12} transparent opacity={0.52 * fade} />
      </mesh>
      <mesh position={[2.9, 0.8, -0.7]} scale={[0.09, 2.75, 0.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f6f1e7" />
      </mesh>
      <mesh position={[2.15, -2.15, -0.9]} scale={[1.5, 0.22, 0.45]}>
        <sphereGeometry args={[1, 32, 18]} />
        <meshPhysicalMaterial color="#fffdf7" roughness={0.16} clearcoat={0.85} />
      </mesh>
      <mesh position={[2.15, -1.94, -0.75]}>
        <cylinderGeometry args={[0.09, 0.09, 0.24, 16]} />
        <meshStandardMaterial color="#b8bec0" metalness={0.72} roughness={0.22} />
      </mesh>
      <group position={[walk, 0, 0]}>
        <Character frame={frame} bathroom />
      </group>
    </group>
  );
};

const StudioLights: React.FC = () => (
  <>
    <ambientLight intensity={0.88} color="#ffe7dc" />
    <directionalLight position={[-5, 8, 9]} intensity={3.1} color="#fff0d9" />
    <pointLight position={[3, 2, 6]} intensity={110} distance={17} color="#ffb676" />
    <pointLight position={[-3, -2, 3]} intensity={95} distance={13} color="#ff6c91" />
    <pointLight position={[0, -2, -1]} intensity={80} distance={7} color="#ffba45" />
    <hemisphereLight args={['#fff2df', '#8d5367', 1.25]} />
  </>
);

const StoryWorld: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <color attach="background" args={['#211a2b']} />
      <fog attach="fog" args={['#211a2b', 14, 32]} />
      <StudioLights />
      <MainCamera />
      <group visible={frame < 1490}>
        <Character frame={frame} />
        <Stomach frame={frame} />
        <Intestines frame={frame} />
        <Seasons frame={frame} />
        <Gum frame={frame} />
      </group>
      <Bathroom frame={frame} />
    </>
  );
};

export const GumJourney: React.FC = () => {
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: '#211a2b'}}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{fov: 34, near: 0.1, far: 60, position: [0, 5.2, 15]}}
        shadows
      >
        <StoryWorld />
      </ThreeCanvas>
      <Sequence from={1580}>
        <Audio src={staticFile('sounds/gum-plop.wav')} volume={0.45} />
      </Sequence>
    </AbsoluteFill>
  );
};
