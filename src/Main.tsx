import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {
  BAR_FRAMES,
  BEAT_FRAMES,
  SECTION_FRAMES,
  barIndex,
  beatIndex,
  beatPulse,
  beatScale,
} from './beat';
import {COLORS} from './theme';
import {IntroCard} from './components/IntroCard';
import {OutroCard} from './components/OutroCard';
import {EditorShell} from './components/EditorShell';
import {Timeline} from './components/Timeline';
import {Phone} from './components/Phone';
import {Monster} from './components/Monster';
import {Sticker} from './components/Stickers';
import {MotionArrow} from './components/Arrows';

const EDITOR_START = 60;
const EDITOR_LEN = 750;
const OUTRO_START = 810;
const OUTRO_LEN = 90;

/** All cuts land on a beat boundary (60 and 810 are multiples of 15),
 *  so local frames inside each Sequence stay phase-locked to the music. */

const STICKERS = [
  {text: '空心人风!', color: COLORS.teal, x: 250, y: 210, rotate: -8, size: 46},
  {text: '卡点!', color: COLORS.teal, x: 95, y: 385, rotate: -11, size: 42},
  {text: '前方高能', color: COLORS.yellow, x: 105, y: 105, rotate: -4, size: 38},
  {text: 'BONK!', color: COLORS.yellow, x: 345, y: 400, rotate: 9, size: 54},
  {text: '全自动!', color: COLORS.red, x: 840, y: 95, rotate: -7, size: 46},
  {text: '好耶~', color: COLORS.red, x: 125, y: 150, rotate: 7, size: 38},
  {text: '霓虹 NEON', color: COLORS.purple, x: 95, y: 175, rotate: -3, size: 34},
  {text: '拿捏了!', color: COLORS.yellow, x: 520, y: 170, rotate: -5, size: 46},
];

const EditorScene = () => {
  const frame = useCurrentFrame();
  const bar = barIndex(frame);
  const beat = beatIndex(frame);
  const pulse = beatPulse(frame);

  const sceneIdx = Math.floor(frame / 120) % 4;
  const stickerIdx = bar % STICKERS.length;
  const tabIdx = Math.floor(frame / 180) % 3;
  const assetIdx = beat % 6;

  // The playhead crosses the whole timeline over the edit section.
  const playhead = interpolate(frame, [0, EDITOR_LEN - 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // The little red character travels left -> right with a beat-synced hop.
  const mx = interpolate(frame, [0, EDITOR_LEN], [185, 1045]);
  const my = 452 + Math.sin(frame / 88) * 24 - pulse * 20;
  const wave = 0.5 + 0.5 * Math.sin(frame / 12);

  // One sticker per bar; one arrow drawing per two bars.
  const stickerStart = bar * BAR_FRAMES;
  const arrowStart = Math.floor(frame / (BAR_FRAMES * 2)) * (BAR_FRAMES * 2);

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.paper}}>
      <EditorShell
        activeTab={tabIdx}
        activeAsset={assetIdx}
        timecode={frame}
        beat={pulse}
      />

      <Phone scene={sceneIdx} beat={pulse} />

      <MotionArrow
        localFrame={frame - arrowStart}
        variant={Math.floor(frame / (BAR_FRAMES * 2)) % 3}
      />

      <Sticker
        key={stickerIdx}
        {...STICKERS[stickerIdx]}
        frame={frame}
        startFrame={stickerStart}
      />

      <Timeline frame={frame} duration={EDITOR_LEN} beat={pulse} />

      <Monster x={mx} y={my} size={88} wave={wave} beat={pulse} />

      {/* Section accents: a very light full-frame flash every 4 bars. */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.white,
          opacity:
            frame > SECTION_FRAMES && frame % SECTION_FRAMES < 4
              ? interpolate(frame % SECTION_FRAMES, [0, 4], [0.09, 0], {
                  extrapolateRight: 'clamp',
                })
              : 0,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

export const Main = () => {
  const frame = useCurrentFrame();
  const pulse = beatPulse(frame);

  // A global, barely-visible breathing scale keeps the whole frame on the beat.
  const globalScale = beatScale(frame, 0.004);
  const introFade = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const outroFade = interpolate(frame, [OUTRO_START, OUTRO_START + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.paper}}>
      <Audio src={staticFile('beat.wav')} volume={0.82} />

      <AbsoluteFill style={{transform: `scale(${globalScale})`}}>
        <Sequence from={0} durationInFrames={EDITOR_START}>
          <AbsoluteFill style={{opacity: introFade}}>
            <IntroCard />
          </AbsoluteFill>
        </Sequence>

        <Sequence from={EDITOR_START} durationInFrames={EDITOR_LEN}>
          <EditorScene />
        </Sequence>

        <Sequence from={OUTRO_START} durationInFrames={OUTRO_LEN}>
          <AbsoluteFill style={{opacity: outroFade}}>
            <OutroCard />
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>

      {/* Beat marker in the corner: a small dot that pulses on every kick. */}
      <div
        style={{
          position: 'absolute',
          right: 18,
          top: 12,
          width: 9 + pulse * 7,
          height: 9 + pulse * 7,
          borderRadius: '50%',
          backgroundColor: COLORS.red,
          opacity: 0.65,
        }}
      />

      {/* Keep BEAT_FRAMES referenced for clarity of the timing contract. */}
      <AbsoluteFill
        style={{
          opacity: 0,
          pointerEvents: 'none',
          width: BEAT_FRAMES,
        }}
      />
    </AbsoluteFill>
  );
};
