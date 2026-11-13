---
name: bangla-motion-studio
description: Living studio skill for building reusable, deterministic 3D/2D Bangla animations in Remotion.
version: 1.0.0
---

# Bangla Motion Studio — Living Production Skill

## 1. Studio Rules (Always Enforce)
- **Project Isolation:** Every new video goes into `src/projects/<slug>/` with its own `config.ts`, `voiceScript.ts`, and main composition, then gets registered in `src/Root.tsx`.
- **Global Promotion Rule:** Whenever a component, shader, camera rig, or HUD built inside a project proves reusable across 2+ stories, refactor it into `src/global/` and document it in `PATTERNS.md`.
- **Zero Static Transitions:** Use continuous 3D camera choreography (`CameraRig`) or frame-driven physical transitions—never static slide cuts.
- **100% Determinism:** Never use `useFrame()`, `Math.random()`, `Date.now()`, or CSS transitions. Drive all motion from `useCurrentFrame()` + `seededRandom()`.

## 2. Standard New-Project Checklist
1. Create `src/projects/<slug>/config.ts` with `VIDEO_META`, `PALETTE`, and `STORY_BEATS`.
2. Create `src/projects/<slug>/voiceScript.ts` with frame-synced Bangla narration, `[tone]`/`[sfx]` tags, and SSML.
3. Build the 3D/2D world using `src/global/` primitives (`CameraRig`, `KineticBanglaHUD`, `Atmospheric3D`).
4. Register `<Composition />` in `src/Root.tsx` and add a render script to `package.json`.

## 3. Adaptation Log (Update Day by Day)
- **v1.0.0:** Initialized global `CameraRig`, `KineticBanglaHUD`, `Fireflies3D`, `FlickeringLantern3D`, and `WaterPlane3D` alongside `golpo-01-sonar-toroni`.
- **v1.1.0:** Added `golpo-04-padma-diya` — a 30s atmospheric 3D story of floating diyas on the Padma river under moonlight. Reuses all global primitives; new project-local `FloatingDiya` component kept isolated (candidate for promotion if reused).
