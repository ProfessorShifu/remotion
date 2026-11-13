import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useThree } from "@react-three/fiber";

const Background: React.FC = () => {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial color="#0a0a1a" />
    </mesh>
  );
};

const FloatingTorus: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const rotation = interpolate(frame, [0, 300], [0, Math.PI * 4]);
  const y = Math.sin((frame + delay) / 30) * 0.8;
  const scale = 0.6 + progress * 0.4;

  return (
    <mesh
      position={[-2.5 + delay * 0.05, y, 0]}
      rotation={[rotation * 0.7, rotation, 0]}
      scale={scale}
    >
      <torusGeometry args={[0.8, 0.25, 32, 64]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.7}
        roughness={0.2}
        emissive="#312e81"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const FloatingIcosahedron: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const rotation = interpolate(frame, [0, 300], [0, Math.PI * 3]);
  const y = Math.cos(frame / 25) * 0.6;
  const scale = 0.5 + progress * 0.5;

  return (
    <mesh position={[0, y + 0.5, 0]} rotation={[rotation, rotation * 0.5, 0]} scale={scale}>
      <icosahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial
        color="#ec4899"
        metalness={0.6}
        roughness={0.15}
        emissive="#9d174d"
        emissiveIntensity={0.4}
        flatShading
      />
    </mesh>
  );
};

const FloatingBox: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const rotation = interpolate(frame, [0, 300], [0, -Math.PI * 5]);
  const y = Math.sin(frame / 20 + 1) * 0.7;
  const scale = 0.5 + progress * 0.5;

  return (
    <mesh position={[2.5, y, 0]} rotation={[rotation * 0.4, rotation, rotation * 0.2]} scale={scale}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial
        color="#14b8a6"
        metalness={0.8}
        roughness={0.1}
        emissive="#115e59"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
};

const OrbitingSphere: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = (frame / 60) * Math.PI * 2;
  const radius = 3.5;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = Math.sin(frame / 40) * 0.5;

  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color="#fbbf24"
        metalness={0.9}
        roughness={0.05}
        emissive="#b45309"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
};

const CameraController: React.FC = () => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  React.useEffect(() => {
    const angle = (frame / 180) * Math.PI * 2;
    const distance = 8 + Math.sin(frame / 90) * 1.5;
    camera.position.set(
      Math.sin(angle) * distance,
      2 + Math.sin(frame / 60) * 1.2,
      Math.cos(angle) * distance
    );
    camera.lookAt(0, 0, 0);
    camera.near = 0.1;
    camera.far = 100;
  }, [camera, frame]);

  return null;
};

export const Scene: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050510" }}>
      <ThreeCanvas linear width={width} height={height}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, 3, 2]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[5, -2, -3]} intensity={0.6} color="#f472b6" />

        <Background />
        <FloatingTorus delay={0} />
        <FloatingIcosahedron />
        <FloatingBox />
        <OrbitingSphere />
        <CameraController />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
