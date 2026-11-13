import { Composition } from "remotion";
import { Scene } from "./Scene";

// Remotion 3D Animation
// Floating geometric shapes with orbiting camera and dynamic lighting.
// Driven purely by useCurrentFrame() for deterministic rendering.

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Scene"
        component={Scene}
        fps={30}
        durationInFrames={300}
        width={1280}
        height={720}
      />
    </>
  );
};
