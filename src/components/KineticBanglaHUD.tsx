import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {banglaFont, COLORS, STORY_BEATS, VIDEO_CONFIG} from '../theme';

export const KineticBanglaHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const activeBeat =
    STORY_BEATS.find((b) => frame >= b.startFrame && frame < b.endFrame) ??
    STORY_BEATS[STORY_BEATS.length - 1];

  const localFrame = frame - activeBeat.startFrame;
  const pop = spring({
    frame: localFrame,
    fps,
    config: {damping: 15, stiffness: 180, mass: 0.7},
  });

  const translateY = interpolate(pop, [0, 1], [34, 0], {extrapolateRight: 'clamp'});
  const opacity = interpolate(pop, [0, 1], [0, 1], {extrapolateRight: 'clamp'});
  const progressPct = (frame / VIDEO_CONFIG.durationInFrames) * 100;

  // Highlight accent phrase in gold
  const parts = activeBeat.accentWord
    ? activeBeat.headline.split(activeBeat.accentWord)
    : [activeBeat.headline];

  return (
    <AbsoluteFill style={{pointerEvents: 'none', fontFamily: banglaFont}}>
      {/* Subtle top/bottom gradient vignette for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(9,13,22,0.72) 0%, rgba(9,13,22,0) 24%, rgba(9,13,22,0) 62%, rgba(9,13,22,0.88) 100%)',
        }}
      />

      {/* Top Progress Bar & Layer Pill */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            height: 6,
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.16)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              backgroundColor: COLORS.gold,
              borderRadius: 999,
            }}
          />
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div
            style={{
              display: 'inline-block',
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: 'rgba(15, 23, 42, 0.82)',
              border: '2px solid rgba(245, 184, 65, 0.65)',
              color: COLORS.gold,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 0.4,
            }}
          >
            {activeBeat.layerTag}
          </div>
        </div>
      </div>

      {/* Punchy Lower-Third Bangla Storytelling Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 130,
          left: 56,
          right: 56,
          transform: `translateY(${translateY}px)`,
          opacity,
          backgroundColor: 'rgba(9, 13, 22, 0.78)',
          border: '2px solid rgba(245, 184, 65, 0.4)',
          borderRadius: 24,
          padding: '28px 34px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.38,
            color: '#F8FAFC',
          }}
        >
          {activeBeat.accentWord && parts.length === 2 ? (
            <>
              {parts[0]}
              <span style={{color: COLORS.gold}}>{activeBeat.accentWord}</span>
              {parts[1]}
            </>
          ) : (
            activeBeat.headline
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
