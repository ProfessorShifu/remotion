# THE LOOP

A cinematic, original 2D animated short built with Remotion 4.

## Story

A tired man moves through the same daily rhythm: waking to the alarm, commuting through a crowded city, working under artificial light, returning home, and waking to the same alarm again.

## Visual approach

- Original character drawn in React SVG, with breathing, blinking, walking motion and tired expressions.
- Environments built from original SVG illustration and layered shapes.
- Frame-driven scene timing, captions, atmospheric gradients, vignette and procedural film grain.
- 1920×1080, 30 fps, 30-second short.

No external artwork or stock imagery is required.

## Run

```bash
npm install
npm run start
```

## Render

```bash
npm run build
```

Output: `out/the-loop.mp4`

## Validate

```bash
npm run typecheck
```

## Structure

- `src/Character.tsx`: reusable animated character.
- `src/TheLoop.tsx`: environments, scenes, transitions and film composition.
- `src/Root.tsx`: Remotion composition registration.
- `src/index.ts`: entry point.
