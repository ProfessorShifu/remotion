import type {CameraKeyframe, StoryBeat} from '../../global';

export const GOLPO04_META = {
  id: 'Golpo04PadmaDiya',
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 900, // 30 seconds
} as const;

export const GOLPO04_COLORS = {
  skyBg: '#0A0F1E',
  fog: '#121A2E',
  river: '#0D2E3C',
  bank: '#1A2A22',
  diyaClay: '#8B5A2B',
  diyaFlame: '#FFB347',
  diyaGlow: '#FFD166',
  moonlight: '#C5D8E8',
  accent: '#F4A261',
} as const;

export const GOLPO04_BEATS: StoryBeat[] = [
  {
    startFrame: 0,
    endFrame: 160,
    tag: 'গল্প ০৪ • পদ্মার প্রদীপ',
    headline: 'পদ্মা নদীর তীরে এক নিস্তব্ধ সন্ধ্যা — আকাশ ভরে আছে চাঁদের আলোয়।',
    accentWord: 'চাঁদের আলোয়',
  },
  {
    startFrame: 160,
    endFrame: 340,
    tag: 'স্মৃতির আলো',
    headline: 'এক বৃদ্ধা হাতে তুলে নিল মাটির প্রদীপ — স্মৃতির নামে জ্বালালেন আগুন।',
    accentWord: 'স্মৃতির নামে',
  },
  {
    startFrame: 340,
    endFrame: 520,
    tag: 'ভাসমান প্রার্থনা',
    headline: 'প্রদীপগুলো একের পর এক ভেসে গেল জলের স্রোতে — প্রতিটি আলো এক প্রার্থনা।',
    accentWord: 'এক প্রার্থনা',
  },
  {
    startFrame: 520,
    endFrame: 720,
    tag: 'নদীর স্মৃতি',
    headline: 'পদ্মা শুধু জল নয় — বয়ে নিয়ে চলে হারানো মুখের নাম ও গান।',
    accentWord: 'হারানো মুখের নাম',
  },
  {
    startFrame: 720,
    endFrame: 900,
    tag: 'বাংলার আত্মা',
    headline: 'কিছু আলো কখনো নিভে না — নদীর বুকে জ্বলে থাকে চিরকাল।',
    accentWord: 'চিরকাল',
  },
];

export const GOLPO04_CAMERA: CameraKeyframe[] = [
  {frame: 0, pos: [10, 7.5, 16], lookAt: [0, 0.8, 0]},
  {frame: 160, pos: [5.5, 3.8, 9], lookAt: [0, 0.6, 1]},
  {frame: 340, pos: [1.8, 2.4, 5.5], lookAt: [0, 0.5, -1]},
  {frame: 520, pos: [-4, 2.8, 4], lookAt: [0, 0.7, 0]},
  {frame: 720, pos: [-7, 5, 10], lookAt: [0, 1.2, 1]},
  {frame: 900, pos: [8, 8.5, 18], lookAt: [0, 1.4, 0]},
];
