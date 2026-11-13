import {loadFont} from '@remotion/google-fonts/NotoSansBengali';

export const {fontFamily: banglaFont} = loadFont('normal', {
  weights: ['400', '600', '700'],
  subsets: ['bengali', 'latin'],
});
