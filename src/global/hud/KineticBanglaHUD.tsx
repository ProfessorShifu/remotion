import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {banglaFont} from '../fonts';

export interface StoryBeat {
  startFrame: number;
  endFrame: number;
  tag: string;
  headline: string;
  accentWord?: string;
}

export const KineticBanglaHUD: React.FC<{
  beats: StoryBeat[];
  accentColor?: string;
}> = ({beats, accentColor = '#F5B841'}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const activeBeat =
    beats.find((b) => frame >= b.startFrame && frame < b.endFrame) ?? beats[beats.length - 1];

  const pop = spring({
    frame: frame - activeBeat.startFrame,
    fps,
    config: {damping: 16, stiffness: 170, mass: 0.75},
  });

  const translateY = interpolate(pop, [0, 1], [30, 0], {extrapolateRight: 'clamp'});
  const opacity = interpolate(pop, [0, 1], [0, 1], {extrapolateRight: 'clamp'});
  const progressPct = (frame / durationInFrames) * 100;

  const parts = activeBeat.accentWord
    ? activeBeat.headline.split(activeBeat.accentWord)
    : [activeBeat.headline];

  return (
    <AbsoluteFill style={{pointerEvents: 'none', fontFamily: banglaFont}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8,11,20,0.72) 0%, rgba(8,11,20,0) 24%, rgba(8,11,20,0) 64%, rgba(8,11,20,0.88) 100%)',
        }}
      />

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
              backgroundColor: accentColor,
              borderRadius: 999,
            }}
          />
        </div>

        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: 'rgba(15, 23, 42, 0.82)',
              border: `2px solid ${accentColor}`,
              color: accentColor,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {activeBeat.tag}
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 128,
          left: 56,
          right: 56,
          transform: `translateY(${translateY}px)`,
          opacity,
          backgroundColor: 'rgba(8, 11, 20, 0.78)',
          border: `2px solid rgba(245, 184, 65, 0.42)`,
          borderRadius: 24,
          padding: '28px 34px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
        }}
      >
        <div style={{fontSize: 46, fontWeight: 700, lineHeight: 1.4, color: '#F8FAFC'}}>
          {activeBeat.accentWord && parts.length === 2 ? (
            <>
              {parts[0]}
              <span style={{color: accentColor}}>{activeBeat.accentWord}</span>
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
