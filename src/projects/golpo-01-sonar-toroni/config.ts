import type {CameraKeyframe, StoryBeat} from '../../global';

export const GOLPO01_META = {
  id: 'Golpo01SonarToroni',
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 900, // 30 seconds
} as const;

export const GOLPO01_COLORS = {
  skyBg: '#0B1021',
  fog: '#141E36',
  river: '#10374A',
  bank: '#1E2D24',
  boatWood: '#5C3822',
  boatTrim: '#C98A3E',
  goldGlow: '#F5B841',
  moonlight: '#BFD7EA',
} as const;

export const GOLPO01_BEATS: StoryBeat[] = [
  {
    startFrame: 0,
    endFrame: 150,
    tag: 'গল্প ০১ • সোনার তরণী',
    headline: 'সন্ধ্যার কুয়াশায় ভরা ইছামতী নদীর ঘাট — এক বৃদ্ধ মাঝির অপেক্ষা।',
    accentWord: 'ইছামতী নদীর ঘাট',
  },
  {
    startFrame: 150,
    endFrame: 330,
    tag: 'রহস্যময় আলো',
    headline: 'হঠাৎ দূর থেকে ভেসে এল লণ্ঠন-জ্বলা এক সোনালি কাঠের নৌকা!',
    accentWord: 'সোনালি কাঠের নৌকা',
  },
  {
    startFrame: 330,
    endFrame: 525,
    tag: 'অজানা যাত্রী',
    headline: 'নৌকায় কোনো মাঝি নেই — তবুও জলের স্রোতের বিপরীতে এগিয়ে আসছে!',
    accentWord: 'স্রোতের বিপরীতে',
  },
  {
    startFrame: 525,
    endFrame: 720,
    tag: 'হারানো স্মৃতি',
    headline: 'কাছে আসতেই লণ্ঠনের আলোয় ভেসে উঠল গ্রামের হারানো দিনের সুর।',
    accentWord: 'হারানো দিনের সুর',
  },
  {
    startFrame: 720,
    endFrame: 900,
    tag: 'বাংলার লোককথা',
    headline: 'কিছু নৌকা শুধু যাত্রী নয় — বয়ে নিয়ে চলে সময়ের অমলিন স্মৃতি।',
    accentWord: 'সময়ের অমলিন স্মৃতি',
  },
];

export const GOLPO01_CAMERA: CameraKeyframe[] = [
  {frame: 0, pos: [12, 8, 18], lookAt: [0, 1, 0]},
  {frame: 150, pos: [6.5, 4.2, 11], lookAt: [0, 0.8, 2]},
  {frame: 330, pos: [3.2, 2.2, 6.5], lookAt: [0, 0.9, -2]},
  {frame: 525, pos: [-3.5, 2.6, 3.5], lookAt: [0, 1.1, 0]},
  {frame: 720, pos: [-6, 4.5, 9], lookAt: [0, 1.2, 1]},
  {frame: 900, pos: [10, 9, 19], lookAt: [0, 1.5, 0]},
];
