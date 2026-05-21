export type EffectiveMediaPolicy = {
  allowReplay: boolean;
  allowSeek: boolean;
  playLimit: number; // 0 => unlimited
};

export const computeEffectiveMediaPolicy = (
  mode: 'practice' | 'simulation',
  raw: {
    allowReplay?: boolean;
    allowSeek?: boolean;
    playLimit?: number;
  },
): EffectiveMediaPolicy => {
  if (mode === 'simulation') {
    return {
      allowReplay: false,
      allowSeek: false,
      playLimit: raw.playLimit && raw.playLimit > 0 ? Math.min(raw.playLimit, 1) : 1,
    };
  }

  return {
    allowReplay: raw.allowReplay !== false,
    allowSeek: raw.allowSeek !== false,
    playLimit: raw.playLimit && raw.playLimit > 0 ? raw.playLimit : 0,
  };
};

export default { computeEffectiveMediaPolicy };
