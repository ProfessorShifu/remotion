import {loadFont} from '@remotion/google-fonts/NotoSansBengali';

export const {fontFamily: banglaFont} = loadFont('normal', {
  weights: ['400', '600', '700'],
  subsets: ['bengali', 'latin'],
});

export const VIDEO_CONFIG = {
  id: 'RajprasadDefense3D',
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 1080, // 36 seconds @ 30fps
} as const;

export const COLORS = {
  skyBg: '#090D16',
  fog: '#101828',
  terracotta: '#9E4730',
  terracottaDark: '#6E2E1E',
  terracottaLight: '#C46447',
  stone: '#525866',
  stoneDark: '#2E333D',
  gold: '#F5B841',
  goldEmissive: '#FF9F1C',
  moatWater: '#134E5E',
  dangerRed: '#EF4444',
  emberOrange: '#FF6B1A',
  teakWood: '#3A2316',
  iron: '#262930',
  ground: '#1F2A1E',
  tunnelBrick: '#7A3828',
} as const;

export interface StoryBeat {
  startFrame: number;
  endFrame: number;
  layerTag: string;
  headline: string;
  accentWord?: string;
}

export const STORY_BEATS: StoryBeat[] = [
  {
    startFrame: 0,
    endFrame: 85,
    layerTag: 'WHAT IF • বাংলার রাজপ্রাসাদ',
    headline: 'কী হতো যদি কেউ প্রাচীন বাংলার রাজপ্রাসাদ আক্রমণ করত?',
    accentWord: 'রাজপ্রাসাদ',
  },
  {
    startFrame: 85,
    endFrame: 180,
    layerTag: 'অভেদ্য প্রতিরক্ষা',
    headline: 'ভেতরে ঢোকার আগেই অপেক্ষা করত ৪টি ভয়ংকর মৃত্যুফাঁদ!',
    accentWord: '৪টি ভয়ংকর মৃত্যুফাঁদ',
  },
  {
    startFrame: 180,
    endFrame: 285,
    layerTag: 'স্তর ১ • গভীর পরিখা',
    headline: 'চারপাশে ছিল কুমিরভরা গভীর পরিখা — নিচে লুকানো তীক্ষ্ণ শূল!',
    accentWord: 'তীক্ষ্ণ শূল',
  },
  {
    startFrame: 285,
    endFrame: 390,
    layerTag: 'স্তর ১ • জলতল কাটঅ্যাওয়ে',
    headline: 'ভেলা বা সাঁতারে পার হতে গেলেই চূর্ণ হতো শত্রুর প্রথম দল।',
    accentWord: 'চূর্ণ হতো',
  },
  {
    startFrame: 390,
    endFrame: 505,
    layerTag: 'স্তর ২ • তীরন্দাজ বুরুজ',
    headline: '৩০ ফুট উঁচু ইটের প্রাচীর আর চারকোণের উঁচু বুরুজ থেকে—',
    accentWord: 'উঁচু বুরুজ',
  },
  {
    startFrame: 505,
    endFrame: 615,
    layerTag: 'স্তর ২ • তীরের বৃষ্টি',
    headline: 'দেয়ালের ফোকর দিয়ে একসাথে ছুটে আসত শত শত জ্বলন্ত তীর!',
    accentWord: 'জ্বলন্ত তীর',
  },
  {
    startFrame: 615,
    endFrame: 730,
    layerTag: 'স্তর ৩ • সিংহদরজা',
    headline: 'হাতির ধাক্কা ঠেকাতে বিশাল কাঠের দরজায় থাকত লোহার শূল!',
    accentWord: 'লোহার শূল',
  },
  {
    startFrame: 730,
    endFrame: 840,
    layerTag: 'স্তর ৩ • যন্ত্রগুপ্ত ফাঁদ',
    headline: 'আর ঠিক ওপরের গোপন ছিদ্র দিয়ে ঢেলে দেওয়া হতো ফুটন্ত তেল!',
    accentWord: 'ফুটন্ত তেল',
  },
  {
    startFrame: 840,
    endFrame: 960,
    layerTag: 'স্তর ৪ • গুপ্ত সুড়ঙ্গ',
    headline: 'দেয়াল ভাঙলেও মেঝের নিচে থাকত গোপন সুড়ঙ্গ — নিরাপদে পালাতেন রাজা!',
    accentWord: 'গোপন সুড়ঙ্গ',
  },
  {
    startFrame: 960,
    endFrame: 1080,
    layerTag: 'বাংলার স্থাপত্য',
    headline: 'বাংলার রাজপ্রাসাদ শুধু সৌন্দর্য নয় — ছিল এক দুর্ভেদ্য দুর্গ।',
    accentWord: 'দুর্ভেদ্য দুর্গ',
  },
];

export const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const smoothStep = (t: number): number => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};
