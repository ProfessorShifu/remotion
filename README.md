# Prostuti Motion Studio

A Remotion 4 + React + TypeScript campaign studio for **প্রস্তুতি (Prostuti)**.

## Output compositions

| Composition | Canvas | Runtime | FPS |
| --- | ---: | ---: | ---: |
| `Prostuti-Landscape` | 1920 × 1080 | 54 sec | 30 |
| `Prostuti-Vertical` | 1080 × 1920 | 54 sec | 30 |
| `Prostuti-Square` | 1080 × 1080 | 54 sec | 30 |

## Run and render

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
npm run render:landscape
npm run render:vertical
npm run render:square
```

MP4 outputs are written under `out/`.

## Campaign scenes

1. Logo and brand opening
2. Competitive-exam preparation challenge
3. Connected preparation categories diagram
4. Exam-category overview
5. Five key product capability cards
6. A four-step preparation flow
7. Brand close and prostuti.co call to action

Edit scene copy, timings and motion in `src/compositions/ProstutiCampaign.tsx`. Shared tokens are in `src/theme.ts`; reusable visual components are in `src/components/`.

## Brand and asset requirements

- Palette: blue `#3158D8`, navy `#17243B`, white `#FFFFFF`, background `#F7F9FD`, mint `#DFF6ED`.
- Add the exact approved logo as `public/assets/prostuti-logo.png`. The brand component intentionally references this asset rather than redrawing the supplied mark.
- Add licensed Bengali fonts for reproducible typography across render machines.
- Animated category diagrams and abstract panels are illustrative graphics, not actual platform screenshots.
- Replace product-facing visuals with approved screenshots before publishing a product-accurate campaign.
- No invented statistics, testimonials, awards or government endorsements are included.
- Audio is intentionally not fabricated or bundled. Add only properly licensed music/SFX in `public/audio/` and wire them into the composition after assets are supplied.

## Project layout

- `src/index.ts`: Remotion entry
- `src/Root.tsx`: composition registrations
- `src/compositions/ProstutiCampaign.tsx`: campaign scenes and sequencing
- `src/components/`: reusable visual components
- `src/theme.ts`: brand tokens
- `remotion.config.ts`: render settings

Keep `remotion` and `@remotion/cli` on the same exact version.
