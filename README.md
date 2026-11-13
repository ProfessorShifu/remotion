# কী হতো যদি কেউ প্রাচীন বাংলার রাজপ্রাসাদ আক্রমণ করত? (3D Remotion Short)

A **36-second, 1080x1920 (9:16, 30 fps)** Zack D. Films–style 3D animated "What If" explainer built with **Remotion** + **@remotion/three** + **Three.js** + **Bangla typography (`Noto Sans Bengali`)**.

## Features
- **Zero Static Transitions:** Continuous, frame-deterministic 3D camera choreography (aerial dive, underwater moat cutaway, rampart orbit, gate charge, and X-ray floor dive into the underground escape tunnel).
- **4-Layer Bengal Rajprasad Defense:**
  1. **পরিখা ও বাঁশের শূল:** Deep moat with submerged sharpened stakes and patrolling crocodiles.
  2. **প্রাচীর ও তীরন্দাজ বুরুজ:** 30ft terracotta brick ramparts with arcing 3D arrow volleys.
  3. **সিংহদরজা ও ফুটন্ত তেল:** Iron-spiked teakwood gate against war elephants + overhead boiling oil pour & impact sparks.
  4. **গুপ্ত সুড়ঙ্গ:** Underground brick-arched escape tunnel beneath the royal sanctum.
- **100% Deterministic:** All camera paths, particles, water ripples, arrow arcs, and torch flickers are driven purely by `useCurrentFrame()`.

## Quick Start
```bash
npm install
npm run dev
```

## Render MP4
```bash
# Software WebGL (works on headless/CPU machines):
npm run render

# Hardware GPU WebGL:
npm run render:gpu
```
