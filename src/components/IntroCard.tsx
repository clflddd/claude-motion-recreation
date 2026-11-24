import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../theme';

const TOKENS = [
  {t: 'const ', c: '#5B57C9'},
  {t: '剪辑软件', c: COLORS.tealDark},
  {t: ' = ', c: COLORS.ink},
  {t: '小克', c: COLORS.red},
  {t: '.写代', c: COLORS.tealDark},
];
const TOTAL = TOKENS.reduce((sum, tok) => sum + tok.t.length, 0);

export const IntroCard = () => {
  const frame = useCurrentFrame();
  const enter = spring({
    frame,
    fps: 30,
    config: {damping: 16, stiffness: 120, mass: 0.8},
  });
  const shown = Math.min(TOTAL, Math.floor(frame / 2));
  const blink = frame % 15 < 9 ? 1 : 0.22;

  let acc = 0;
  const parts = TOKENS.map((tok, i) => {
    const start = acc;
    acc += tok.t.length;
    const visible = Math.max(0, Math.min(tok.t.length, shown - start));
    return (
      <span key={i} style={{color: tok.c}}>
        {tok.t.slice(0, visible)}
      </span>
    );
  });

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.paper}}>
      <div
        style={{
          position: 'absolute',
          left: 360,
          top: 265,
          width: 560,
          height: 190,
          borderRadius: 10,
          border: `2px solid ${COLORS.ink}`,
          backgroundColor: COLORS.white,
          boxShadow: '0 12px 0 rgba(47,44,40,0.08)',
          overflow: 'hidden',
          transform: `translateY(${(1 - enter) * 16}px) scale(${0.94 + enter * 0.06})`,
          opacity: interpolate(frame, [0, 6], [0, 1], {extrapolateRight: 'clamp'}),
        }}
      >
        {/* title bar */}
        <div
          style={{
            height: 32,
            backgroundColor: COLORS.paperShade,
            borderBottom: `1.5px solid ${COLORS.paperDark}`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 12,
            position: 'relative',
          }}
        >
          {['#E8736A', '#EFC65A', '#79BE86'].map((c) => (
            <div
              key={c}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: c,
                marginRight: 7,
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: FONT.hand,
              fontSize: 13,
              color: COLORS.inkSoft,
            }}
          >
            小克.js — 编辑
          </div>
        </div>

        {/* code */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            padding: '14px 22px',
            fontFamily: FONT.mono,
            fontSize: 20,
            lineHeight: '32px',
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column', color: '#C3BCAC', fontSize: 14}}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div style={{whiteSpace: 'pre', fontWeight: 600}}>
            {parts}
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 20,
                backgroundColor: COLORS.red,
                opacity: blink,
                verticalAlign: '-3px',
                marginLeft: 2,
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
