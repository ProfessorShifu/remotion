export const GOLPO04_VOICE_SCRIPT = [
  {
    id: 1,
    time: '00:00.0 - 00:05.3',
    tone: '[calm][atmospheric]',
    sfx: '[sfx: soft river current + distant night insects]',
    narration: 'পদ্মা নদীর তীরে এক নিস্তব্ধ সন্ধ্যা। আকাশ ভরে আছে চাঁদের মোলায়েম আলোয়।',
  },
  {
    id: 2,
    time: '00:05.3 - 00:11.3',
    tone: '[gentle][nostalgic]',
    sfx: '[sfx: soft match strike + warm flame whoosh]',
    narration: 'এক বৃদ্ধা হাতে তুলে নিল মাটির প্রদীপ। স্মৃতির নামে জ্বালালেন ছোট্ট আগুন।',
  },
  {
    id: 3,
    time: '00:11.3 - 00:17.3',
    tone: '[poetic][hopeful]',
    sfx: '[sfx: water lapping + gentle breeze]',
    narration: 'প্রদীপগুলো একের পর এক ভেসে গেল জলের স্রোতে। প্রতিটি আলো যেন এক নীরব প্রার্থনা।',
  },
  {
    id: 4,
    time: '00:17.3 - 00:24.0',
    tone: '[warm][emotional]',
    sfx: '[sfx: soft folk flute + river wind]',
    narration: 'পদ্মা শুধু জল নয়—বয়ে নিয়ে চলে হারানো মুখের নাম আর পুরনো গান।',
  },
  {
    id: 5,
    time: '00:24.0 - 00:30.0',
    tone: '[poetic][closing]',
    sfx: '[sfx: gentle fade + distant temple bell]',
    narration: 'কিছু আলো কখনো নিভে না। নদীর বুকে জ্বলে থাকে চিরকাল।',
  },
] as const;

export const GOLPO04_TTS_TEXT = GOLPO04_VOICE_SCRIPT.map(
  (b) => `[${b.time}] ${b.tone} ${b.sfx}\n${b.narration}`
).join('\n\n');
