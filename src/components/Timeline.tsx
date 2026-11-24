import {interpolate} from 'remotion';
import {TOTAL_BEATS} from '../beat';
import {COLORS, FONT} from '../theme';

const LEFT = 70;
const TRACK_W = 1190;

const CLIPS = [
  {label: '夜空', a: '#241F4B', b: '#5B4F9B', glyph: '☾'},
  {label: '拉面', a: '#F6C445', b: '#E88B3C', glyph: '◡'},
  {label: '柴犬', a: '#8ED2C4', b: '#E8A45C', glyph: '◕'},
  {label: '霓虹', a: '#8A7BD8', b: '#C9563F', glyph: '✦'},
  {label: '拿捏', a: '#3A3170', b: '#B34FA8', glyph: '★'},
  {label: '收工', a: '#241F4B', b: '#8A7BD8', glyph: '☾'},
];

const WAVE = Array.from({length: 170}, (_, i) => {
  const v =
    0.28 +
    0.55 * Math.abs(Math.sin(i * 0.61) * Math.cos(i * 0.17 + 0.4)) +
    0.14 * Math.abs(Math.sin(i * 2.31));
  return Math.min(1, v);
});

type Props = {
  frame: number;
  duration: number;
  beat: number;
};

export const Timeline = ({frame, duration, beat}: Props) => {
  const playhead = interpolate(frame, [0, duration - 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headX = LEFT + playhead * TRACK_W;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 430,
        width: 1280,
        height: 290,
        backgroundColor: COLORS.paperShade,
        borderTop: `2px solid ${COLORS.ink}`,
        fontFamily: FONT.ui,
        color: COLORS.ink,
        boxSizing: 'border-box',
      }}
    >
      {/* ruler */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1280, height: 34}}>
        {Array.from({length: 13}, (_, i) => {
          const x = LEFT + (i / 12) * TRACK_W;
          return (
            <div key={i}>
              <div
                style={{
                  position: 'absolute',
                  left: x,
                  top: 20,
                  width: 1,
                  height: 12,
                  backgroundColor: COLORS.inkSoft,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: x - 12,
                  top: 2,
                  width: 46,
                  fontSize: 11,
                  fontFamily: FONT.mono,
                  color: COLORS.inkSoft,
                }}
              >
                {`0:${String(i * 2).padStart(2, '0')}`}
              </div>
            </div>
          );
        })}
      </div>

      {/* left tool rail */}
      {[
        {glyph: 'T', top: 52},
        {glyph: '▶', top: 108},
        {glyph: '♪', top: 164},
      ].map((t) => (
        <div
          key={t.glyph}
          style={{
            position: 'absolute',
            left: 16,
            top: t.top,
            width: 40,
            height: 40,
            border: `1.5px solid ${COLORS.ink}`,
            borderRadius: 8,
            backgroundColor: COLORS.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {t.glyph}
        </div>
      ))}

      {/* video track */}
      <div
        style={{
          position: 'absolute',
          left: LEFT,
          top: 48,
          width: TRACK_W,
          height: 60,
          border: `1.5px solid ${COLORS.paperDark}`,
          borderRadius: 6,
          display: 'flex',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {CLIPS.map((c, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${c.a}, ${c.b})`,
              borderRight: `1px solid ${COLORS.ink}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '5px 8px',
              color: COLORS.white,
              fontSize: 11,
            }}
          >
            <div style={{opacity: 0.9}}>{c.glyph}</div>
            <div style={{fontSize: 10, opacity: 0.85}}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* audio waveform track */}
      <div
        style={{
          position: 'absolute',
          left: LEFT,
          top: 120,
          width: TRACK_W,
          height: 44,
          border: `1.5px solid ${COLORS.purple}`,
          borderRadius: 6,
          backgroundColor: '#EFEBFA',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '0 6px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {WAVE.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${Math.max(8, h * 32)}px`,
              backgroundColor: COLORS.purple,
              opacity: 0.85,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: LEFT + 10,
          top: 128,
          fontSize: 11,
          fontFamily: FONT.mono,
          color: COLORS.nightMid,
        }}
      >
        2 bars · 小克.wav
      </div>

      {/* beat markers: one inverted triangle per kick */}
      <div style={{position: 'absolute', left: LEFT, top: 182, width: TRACK_W, height: 22}}>
        {Array.from({length: TOTAL_BEATS}, (_, i) => {
          const x = (i / TOTAL_BEATS) * TRACK_W;
          const distance = Math.abs(x - playhead * TRACK_W);
          const lit = distance < 26 ? 1 - distance / 26 : 0;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: 0,
                width: 10 + lit * 5,
                height: 10 + lit * 6,
                backgroundColor: lit > 0 ? COLORS.yellow : '#E2D8AC',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                opacity: 0.55 + lit * 0.45,
              }}
            />
          );
        })}
      </div>

      {/* playhead */}
      <div
        style={{
          position: 'absolute',
          left: headX,
          top: 14,
          width: 2 + beat * 1.5,
          height: 196,
          backgroundColor: COLORS.red,
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: headX - 6,
          top: 8,
          width: 14 + beat * 4,
          height: 12 + beat * 3,
          backgroundColor: COLORS.red,
          borderRadius: 3,
          zIndex: 5,
        }}
      />

      {/* footer */}
      <div
        style={{
          position: 'absolute',
          right: 20,
          bottom: 12,
          fontSize: 11,
          color: COLORS.inkSoft,
        }}
      >
        缩放 0 · 总时长 10.0 s · 120 BPM
      </div>
      <div
        style={{
          position: 'absolute',
          left: 20,
          bottom: 10,
          fontSize: 12,
          color: COLORS.inkSoft,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span>−</span>
        <div
          style={{
            width: 90,
            height: 3,
            backgroundColor: COLORS.paperDark,
            borderRadius: 2,
          }}
        />
        <span>+</span>
      </div>
    </div>
  );
};
