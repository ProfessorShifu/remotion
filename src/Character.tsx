import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

type Props = {x?: number; y?: number; scale?: number; walking?: boolean; tired?: boolean; facing?: 'left'|'right';};
export const Character: React.FC<Props> = ({x=0,y=0,scale=1,walking=false,tired=false,facing='right'}) => {
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const step=walking ? Math.sin((f/fps)*Math.PI*5.5) : 0;
  const breath=Math.sin(f/17)*2.2;
  const blink=[72,75,189,192,344,347,518,521,701,704].some(v=>f%750>=v&&f%750<=v+1);
  const slump=tired?7:0;
  return <g transform={`translate(${x} ${y+breath}) scale(${scale*(facing==='left'?-1:1)} ${scale})`}>
    <ellipse cx="0" cy="3" rx="48" ry="9" fill="#090d16" opacity=".28"/>
    <g transform={`translate(0 ${Math.abs(step)*3})`}>
      <path d={`M-19 82 L-24 ${132+step*13} L-9 ${134+step*13} L5 91 M12 83 L21 ${130-step*13} L36 ${131-step*13} L31 87`} fill="none" stroke="#252b3b" strokeWidth="15" strokeLinecap="round"/>
      <path d="M-29 135 Q-14 128 -4 136 L-2 143 L-35 143Z M18 135 Q34 128 44 136 L47 143 L14 143Z" fill="#d7c5a8"/>
    </g>
    <path d={`M-34 34 Q-38 48 -31 91 Q-8 105 28 91 Q38 56 27 34Z`} fill="#596579" stroke="#202a3a" strokeWidth="3"/>
    <path d="M-29 43 Q-7 56 28 42" fill="none" stroke="#8994a4" strokeWidth="2" opacity=".45"/>
    <path d="M-29 39 Q-45 49 -43 70 M27 40 Q44 49 41 67" fill="none" stroke="#d4a77f" strokeWidth="12" strokeLinecap="round"/>
    <path d="M-12 27 Q-13 39 -9 45 L9 45 Q14 36 11 25" fill="#d6a982"/>
    <ellipse cx="0" cy="0" rx="27" ry="32" fill="#e0b58e" stroke="#9e725b" strokeWidth="2"/>
    <path d="M-26 -9 Q-29 -37 0 -35 Q29 -36 27 -7 Q17 -19 5 -20 Q-9 -13 -26 -9" fill="#292a32"/>
    <path d="M-24 -4 Q-17 -11 -8 -7 M7 -7 Q17 -12 24 -4" fill="none" stroke="#42352f" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="-10" cy={blink?0:-1} rx="3" ry={blink?1:4} fill="#20232b"/>
    <ellipse cx="10" cy={blink?0:-1} rx="3" ry={blink?1:4} fill="#20232b"/>
    <path d={tired?"M-5 13 Q0 9 5 13":"M-5 12 Q0 16 5 12"} fill="none" stroke="#865c4e" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M-24 -1 Q-31 4 -25 10 M24 -1 Q31 4 25 10" fill="none" stroke="#c58e70" strokeWidth="2"/>
    {tired&&<path d="M-20 4 Q-13 0 -6 4 M7 4 Q14 0 21 4" stroke="#8d6456" strokeWidth="2" fill="none" opacity=".55"/>}
    <path d="M-30 33 Q-45 48 -40 73" stroke="#d9b08b" strokeWidth="9" fill="none" strokeLinecap="round"/>
  </g>;
};