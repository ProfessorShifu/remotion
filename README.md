# Prostuti Motion Studio

A Remotion 4 + React + TypeScript studio for producing branded motion-graphics campaigns for **প্রস্তুতি (Prostuti)**.

## Campaign compositions

| Composition ID | Canvas | Duration | Frame rate |
| --- | ---: | ---: | ---: |
| `Prostuti-Landscape` | 1920 × 1080 (16:9) | 54 sec | 30 fps |
| `Prostuti-Vertical` | 1080 × 1920 (9:16) | 54 sec | 30 fps |
| `Prostuti-Square` | 1080 × 1080 (1:1) | 54 sec | 30 fps |

## Requirements

- Node.js 20 LTS or newer
- npm
- A supported FFmpeg installation/runtime

## Run locally

```bash
npm install
npm run dev
```

Open Remotion Studio and select one of the three campaign formats.

## Render videos

```bash
npm run render:landscape
npm run render:vertical
npm run render:square
```

Rendered MP4 files are written to `out/`.

## Campaign sequence

1. Brand reveal and positioning
2. The preparation challenge
3. Prostuti platform introduction
4. Target examination categories
5. Five preparation features
6. A simple preparation workflow
7. Brand close and website CTA

Scene durations and transition timing live in `src/compositions/ProstutiCampaign.tsx`.

## Brand system

| Token | Value |
| --- | --- |
| Primary blue | `#3158D8` |
| Dark navy | `#17243B` |
| White | `#FFFFFF` |
| Background | `#F7F9FD` |
| Mint accent | `#DFF6ED` |

The campaign uses Bengali-first copy with a Bengali-capable font stack. For consistent output on every render machine, install a properly licensed Bengali font (for example, Hind Siliguri or Noto Sans Bengali) and register it in the project.

## Official assets and factual accuracy

- Put the exact approved logo at `public/assets/prostuti-logo.png`. Do not redraw or approximate the official mark.
- Put approved platform screenshots under `public/assets/` before producing a final product-accurate cut.
- The animated diagrams and dashboard-style visuals currently in this project are illustrative storytelling graphics. They are not screenshots and must not be presented as live platform UI.
- No user counts, pass rates, testimonials, awards, or government affiliations are asserted.
- Add licensed music and sound effects under `public/audio/` only after confirming usage rights. The composition intentionally does not bundle a soundtrack.

## Structure

- `src/Root.tsx`: output format registrations
- `src/compositions/ProstutiCampaign.tsx`: full campaign and scene timing
- `src/components/`: reusable brand, typography, feature, and glass-panel primitives
- `src/theme.ts`: shared brand tokens
- `remotion.config.ts`: render configuration

## Editing

Update copy, scene timing, colors, and motion in the composition and shared components. Keep `remotion` and all `@remotion/*` dependencies on the same exact version.
