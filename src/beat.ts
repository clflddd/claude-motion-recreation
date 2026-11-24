import {interpolate} from 'remotion';

/** Keep in sync with scripts/make-beat.py. */
export const BPM = 120;
export const FPS = 30;
export const BEAT_FRAMES = (60 / BPM) * FPS; // 15
export const BAR_FRAMES = BEAT_FRAMES * 4; // 60
export const SECTION_FRAMES = BAR_FRAMES * 4; // 240
export const TOTAL_BEATS = (FPS * 30) / BEAT_FRAMES; // 60

export const beatFrame = (n: number) => n * BEAT_FRAMES;
export const barFrame = (n: number) => n * BAR_FRAMES;
export const beatIndex = (frame: number) => Math.floor(frame / BEAT_FRAMES);
export const barIndex = (frame: number) => Math.floor(frame / BAR_FRAMES);
export const sectionIndex = (frame: number) => Math.floor(frame / SECTION_FRAMES);
export const phaseInBeat = (frame: number) => (frame % BEAT_FRAMES) / BEAT_FRAMES;
export const phaseInBar = (frame: number) => (frame % BAR_FRAMES) / BAR_FRAMES;

/** 1 exactly on the beat, easing to 0 before the next beat. */
export const beatPulse = (frame: number, decay = 0.72) =>
  interpolate(phaseInBeat(frame), [0, decay], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Convenience scale factor for beat-synced pops. */
export const beatScale = (frame: number, amount = 0.05) =>
  1 + beatPulse(frame) * amount;

/** True during the first `n` frames of a beat (for flashes). */
export const onBeatWindow = (frame: number, n = 3) =>
  frame % BEAT_FRAMES < n;
