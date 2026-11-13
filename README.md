# Bangla Motion Studio

A modular, adaptable **Remotion** studio where every video lives in its own isolated project folder under `src/projects/`, while reusable 3D/2D engines, camera rigs, Bangla typography, and effects live globally in `src/global/`.

## Architecture
- `skills/bangla-motion-studio/SKILL.md` — Living studio skill file that evolves as you invent new patterns.
- `skills/bangla-motion-studio/PATTERNS.md` — Catalog of reusable components and camera recipes.
- `src/global/` — Shared, battle-tested building blocks (`CameraRig`, `KineticBanglaHUD`, `Atmospheric3D`, `fonts`, `math`).
- `src/projects/<project-name>/` — Self-contained story/video projects (`config.ts`, `voiceScript.ts`, scene components).

## Included Starter Project
- **`golpo-01-sonar-toroni`** (*সোনার তরণী — এক বিস্মৃত মাঝির গল্প*): A 30-second, 1080x1920 (9:16) 3D Bangla story about a village boatman on a misty Bengal river at dusk.

## Quick Start
```bash
npm install
npm run dev
```

## Render Starter Story
```bash
npm run render:golpo01
```
