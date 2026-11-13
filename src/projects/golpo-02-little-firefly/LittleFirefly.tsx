import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {banglaFont} from '../../global/fonts';
import {GOLPO02_META} from './config';

const stars = Array.from({length: 48}, (_, i) => ({
  x: (i * 197 + 43) % GOLPO02_META.width,
  y: 80 + ((i * 283 + 17) % 760),
  r: 1.5 + (i % 3) * 0.8,
  phase: i * 0.71,
}));

const Firefly: React.FC<{x: number; y: number; frame: number; scale?: number}> = ({
  x,
  y,
  frame,
  scale = 1,
}) => {
  const pulse = 0.7 + Math.sin(frame / 5) * 0.16;
  const wing = Math.sin(frame / 2.5) * 12;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r="68" fill="#ffd66d" opacity={0.1 * pulse} />
      <circle r="38" fill="#ffd66d" opacity={0.17 * pulse} />
      <ellipse cx="-11" cy="-7" rx="8" ry="15" fill="#d8eff0" opacity="0.82" transform={`rotate(${-25 + wing} -11 -7)`} />
      <ellipse cx="11" cy="-7" rx="8" ry="15" fill="#d8eff0" opacity="0.82" transform={`rotate(${25 - wing} 11 -7)`} />
      <ellipse cx="0" cy="0" rx="12" ry="17" fill="#283a43" />
      <circle cx="0" cy="13" r="6" fill="#fff1a2" opacity={pulse} />
      <circle cx="0" cy="13" r="19" fill="#ffd66d" opacity={0.14 * pulse} />
    </g>
  );
};

const Caption: React.FC<{frame: number; start: number; end: number; children: string}> = ({
  frame,
  start,
  end,
  children,
}) => {
  const opacity = interpolate(frame, [start, start + 16, end - 18, end], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        right: 72,
        bottom: 210,
        color: '#fff3d4',
        fontFamily: banglaFont,
        fontSize: 43,
        lineHeight: 1.55,
        textAlign: 'center',
        textShadow: '0 4px 24px rgba(5, 15, 27, 0.8)',
        opacity,
      }}
    >
      {children}
    </div>
  );
};

export const LittleFirefly: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleIn = spring({frame: frame - 14, fps, config: {damping: 18, stiffness: 90}});
  const titleOut = interpolate(frame, [105, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const endCard = interpolate(frame, [752, 812, 900], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fireflyX = interpolate(
    frame,
    [0, 100, 210, 330, 440, 540, 650, 760, 900],
    [118, 175, 320, 420, 560, 675, 745, 840, 880],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)},
  );
  const fireflyY = interpolate(
    frame,
    [0, 100, 210, 330, 440, 540, 650, 760, 900],
    [1200, 1110, 870, 730, 810, 950, 1040, 1110, 980],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)},
  );
  const drift = Math.sin(frame / 11) * 9;
  const warmGlow = interpolate(frame, [480, 610, 900], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#101d36', overflow: 'hidden'}}>
      <svg
        viewBox="0 0 1080 1920"
        width="100%"
        height="100%"
        style={{position: 'absolute', inset: 0}}
        aria-label="A firefly guides a little village home through a moonlit night"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#111c36" />
            <stop offset="0.56" stopColor="#243b55" />
            <stop offset="1" stopColor="#536273" />
          </linearGradient>
          <linearGradient id="hill" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0" stopColor="#304b42" />
            <stop offset="1" stopColor="#172e2e" />
          </linearGradient>
          <radialGradient id="moon">
            <stop stopColor="#fff5c7" />
            <stop offset="0.72" stopColor="#f4d893" />
            <stop offset="1" stopColor="#e9c87f" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <rect width="1080" height="1920" fill="url(#sky)" />
        <circle cx="810" cy="310" r="150" fill="url(#moon)" opacity="0.45" />
        <circle cx="810" cy="310" r="72" fill="#f7e8ba" />
        <circle cx="838" cy="292" r="72" fill="#172642" opacity="0.14" />

        {stars.map((star) => (
          <circle
            key={star.phase}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#f9edce"
            opacity={0.34 + (Math.sin(frame / 13 + star.phase) + 1) * 0.25}
          />
        ))}

        <path d="M0 890 Q210 730 430 850 T860 800 Q970 770 1080 830 V1460 H0Z" fill="#24374a" />
        <path d="M0 1030 Q250 890 505 1015 T1080 930 V1530 H0Z" fill="#1e3a3b" />

        <g opacity={0.72} fill="#172c35">
          <path d="M72 1050V855L208 740L344 855V1060Z" />
          <path d="M208 740L344 855H72Z" fill="#192d3a" />
          <rect x="123" y="900" width="48" height="60" rx="2" fill="#edc679" opacity={0.6} />
          <rect x="237" y="900" width="48" height="60" rx="2" fill="#edc679" opacity={0.45} />
          <path d="M785 990V850L895 760L1008 850V1000Z" />
          <path d="M785 850L895 760L1008 850Z" fill="#192d3a" />
          <rect x="826" y="882" width="38" height="52" fill="#edc679" opacity={0.38} />
        </g>

        <g>
          <path d="M539 1230V937L741 786L950 937V1230Z" fill="#b88761" />
          <path d="M500 950L741 752L990 950L958 978L741 807L530 978Z" fill="#553e43" />
          <path d="M567 1002V1210H713V1060Q741 1028 769 1060V1210H918V1002L741 864Z" fill="#c99a6d" />
          <path d="M713 1210V1061Q741 1023 769 1061V1210Z" fill="#513e3c" />
          <circle cx="741" cy="1104" r="7" fill="#eacb87" />
          <rect x="604" y="993" width="83" height="97" rx="4" fill="#5e5147" stroke="#e0ba7d" strokeWidth="8" />
          <rect x="615" y="1004" width="61" height="75" fill="#f6ca75" opacity={0.74 + warmGlow * 0.2} />
          <path d="M645 1005V1079M615 1041H676" stroke="#72564a" strokeWidth="6" />
          <rect x="796" y="993" width="83" height="97" rx="4" fill="#5e5147" stroke="#e0ba7d" strokeWidth="8" />
          <rect x="807" y="1004" width="61" height="75" fill="#f6ca75" opacity={0.45 + warmGlow * 0.48} />
          <path d="M837 1005V1079M807 1041H868" stroke="#72564a" strokeWidth="6" />
          <circle cx="837" cy="1041" r="68" fill="#ffc85b" opacity={warmGlow * 0.24} filter="url(#softGlow)" />
        </g>

        <path d="M0 1270Q205 1175 395 1287T790 1245Q945 1185 1080 1250V1920H0Z" fill="url(#hill)" />
        <path d="M0 1440Q245 1328 430 1437T835 1400Q992 1344 1080 1405V1920H0Z" fill="#193634" />

        <g fill="#e8ce9a" opacity="0.48">
          <path d="M100 1490q-20-45 0-83q20 38 0 83m0-45q-36-14-45-39q31 3 45 39m0 7q33-18 46-44q-33 10-46 44" />
          <path d="M970 1510q-20-45 0-83q20 38 0 83m0-45q-36-14-45-39q31 3 45 39m0 7q33-18 46-44q-33 10-46 44" />
          <path d="M280 1620q-16-37 0-68q16 31 0 68m0-37q-29-12-36-32q25 3 36 32m0 6q27-15 38-36q-27 8-38 36" />
        </g>

        <path
          d={`M${fireflyX - 18} ${fireflyY + drift + 22} Q${fireflyX - 100} ${fireflyY + drift + 20} ${fireflyX - 195} ${fireflyY + drift + 64}`}
          fill="none"
          stroke="#ffe98b"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.34"
        />
        <Firefly x={fireflyX} y={fireflyY + drift} frame={frame} scale={1.18} />
        {[0, 1, 2, 3].map((i) => {
          const x = 278 + i * 132 + Math.sin(frame / 17 + i) * 19;
          const y = 1310 + i * 47 + Math.cos(frame / 19 + i) * 17;
          const twinkle = 0.25 + (Math.sin(frame / 8 + i * 2) + 1) * 0.32;
          return <circle key={i} cx={x} cy={y} r={5 + (i % 2) * 2} fill="#ffdf77" opacity={twinkle} />;
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,18,35,.32), transparent 35%, transparent 65%, rgba(8,20,25,.45))',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 185,
          left: 56,
          right: 56,
          textAlign: 'center',
          fontFamily: banglaFont,
          color: '#fff0cc',
          opacity: titleIn * titleOut,
          transform: `translateY(${(1 - titleIn) * 26}px)`,
          textShadow: '0 6px 30px rgba(8, 15, 30, .65)',
        }}
      >
        <div style={{fontSize: 28, letterSpacing: 4, color: '#eacb87'}}>একটি ছোট্ট রূপকথা</div>
        <div style={{fontSize: 94, fontWeight: 700, lineHeight: 1.25, marginTop: 18}}>জোনাকির পথ</div>
        <div style={{width: 94, height: 3, background: '#f0ce84', margin: '26px auto 0', opacity: 0.75}} />
      </div>

      <Caption frame={frame} start={110} end={255}>অন্ধকার রাতে, ছোট্ট এক জোনাকি হারিয়ে গেল।</Caption>
      <Caption frame={frame} start={265} end={410}>দূরের জানালায় জ্বলছিল একটি একলা আলো।</Caption>
      <Caption frame={frame} start={420} end={565}>নিজের আলোয় সে খুঁজে নিল ফেরার পথ।</Caption>
      <Caption frame={frame} start={570} end={730}>একটি ছোট্ট আলোও—কারও ঘর উষ্ণ করে।</Caption>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(13, 27, 43, 0.62)',
          opacity: endCard,
          fontFamily: banglaFont,
          textAlign: 'center',
          color: '#fff0cc',
          pointerEvents: 'none',
        }}
      >
        <div style={{fontSize: 30, color: '#eacb87', letterSpacing: 3}}>আলো ভাগ করলে কমে না</div>
        <div style={{fontSize: 86, fontWeight: 700, marginTop: 20}}>জোনাকির পথ</div>
        <div style={{fontSize: 24, marginTop: 36, color: '#d7dfdc'}}>একটি বাংলা ২ডি অ্যানিমেটেড গল্প</div>
      </div>
    </AbsoluteFill>
  );
};
