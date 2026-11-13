# Reusable Global Patterns (`src/global/`)

| Pattern | Location | Purpose |
|---|---|---|
| `banglaFont` | `src/global/fonts.ts` | Loads `NotoSansBengali` (400/600/700) deterministically via `@remotion/google-fonts`. |
| `CameraRig` | `src/global/camera/CameraRig.tsx` | Keyframed 3D camera flight + `lookAt` interpolation + optional frame-window micro-shake. |
| `KineticBanglaHUD` | `src/global/hud/KineticBanglaHUD.tsx` | Vertical/Widescreen Bangla story caption overlay with progress bar and accent-word highlight. |
| `Fireflies3D` | `src/global/effects/Atmospheric3D.tsx` | Seeded, deterministic glowing firefly swarm. |
| `FlickeringLantern3D` | `src/global/effects/Atmospheric3D.tsx` | Warm swaying lantern with deterministic flicker `pointLight`. |
| `WaterPlane3D` | `src/global/effects/Atmospheric3D.tsx` | Reflective animated river/moat plane. |
