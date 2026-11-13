export const GOLPO01_VOICE_SCRIPT = [
  {
    id: 1,
    time: '00:00.0 - 00:05.0',
    tone: '[calm][atmospheric]',
    sfx: '[sfx: gentle river waves + evening crickets]',
    narration: 'সন্ধ্যার কুয়াশায় ঢাকা ইছামতী নদীর ঘাটে, এক বৃদ্ধ মাঝি একা বসে ছিল।',
  },
  {
    id: 2,
    time: '00:05.0 - 00:11.0',
    tone: '[curious][wonder]',
    sfx: '[sfx: soft flute swell + distant oar splash]',
    narration: 'হঠাৎ ঘন কুয়াশা ভেদ করে দূর থেকে ভেসে এল লণ্ঠন-জ্বলা এক সোনালি কাঠের নৌকা!',
  },
  {
    id: 3,
    time: '00:11.0 - 00:17.5',
    tone: '[mysterious][tense]',
    sfx: '[sfx: water ripple + low drone]',
    narration: 'অবাক করা ব্যাপার—নৌকায় কোনো মাঝি নেই, তবুও স্রোতের বিপরীতে এগিয়ে আসছে!',
  },
  {
    id: 4,
    time: '00:17.5 - 00:24.0',
    tone: '[warm][emotional]',
    sfx: '[sfx: warm dotara melody + lantern chime]',
    narration: 'ঘাটের কাছে আসতেই লণ্ঠনের আলোয় ভেসে উঠল গ্রামের হারানো দিনের সুর।',
  },
  {
    id: 5,
    time: '00:24.0 - 00:30.0',
    tone: '[poetic][closing]',
    sfx: '[sfx: gentle fade + river breeze]',
    narration: 'কিছু নৌকা শুধু যাত্রী নয়—বয়ে নিয়ে চলে সময়ের অমলিন স্মৃতি।',
  },
] as const;

export const GOLPO01_TTS_TEXT = GOLPO01_VOICE_SCRIPT.map(
  (b) => `[${b.time}] ${b.tone} ${b.sfx}\n${b.narration}`
).join('\n\n');
