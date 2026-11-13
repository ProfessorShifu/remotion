# Bangla Motion Studio

A modular, adaptable **Remotion** studio where every video lives in its own isolated project folder under `src/projects/`, while reusable 3D/2D engines, camera rigs, Bangla typography, and effects live globally in `src/global/`.

## Architecture
- `skills/bangla-motion-studio/SKILL.md` — Living studio skill file that evolves as you invent new patterns.
- `skills/bangla-motion-studio/PATTERNS.md` — Catalog of reusable components and camera recipes.
- `src/global/` — Shared, battle-tested building blocks (`CameraRig`, `KineticBanglaHUD`, `Atmospheric3D`, `fonts`, `math`).
- `src/projects/<project-name>/` — Self-contained story/video projects (`config.ts`, `voiceScript.ts`, scene components).

## Included Projects
- **`golpo-01-sonar-toroni`** (*সোনার তরণী*): 30s 3D story of a golden boat on a misty river at dusk.
- **`golpo-02-little-firefly`**: 2D SVG firefly journey through a moonlit village.
- **`golpo-03-gum-journey`**: Longer 3D anatomical comedy/education piece.
- **`golpo-04-padma-diya`** (*পদ্মার প্রদীপ*): **New** — 30s atmospheric 3D story of floating clay diyas on the Padma under moonlight; prayers carried by the river.

## Quick Start
```bash
npm install
npm run dev
```

## Render
```bash
npm run render:golpo01   # Sonar Toroni
npm run render:golpo04   # Padma Diya (new)
```
