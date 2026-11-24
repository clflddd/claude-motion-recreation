import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from 'remotion';
import {TOTAL_BEATS, beatPulse} from '../beat';
import {COLORS, FONT} from '../theme';
import {Monster} from './Monster';
import {Phone} from './Phone';

const pop = (frame: number, delay: number) =>
  spring({
    frame: Math.max(0, frame - delay),
    fps: 30,
    config: {damping: 15, stiffness: 130, mass: 0.8},
  });

export const OutroCard = () => {
  const frame = useCurrentFrame();
  const pulse = beatPulse(frame);
  const card = pop(frame, 0);
  const line1 = pop(frame, 6);
  const line2 = pop(frame, 12);
  const line3 = pop(frame, 18);
  const wave = 0.5 + 0.5 * Math.sin(frame / 9);

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.paper}}>
      {/* faint grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.25,
        }}
      />

      {/* faded top bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1280,
          height: 44,
          borderBottom: `2px solid ${COLORS.paperDark}`,
          backgroundColor: COLORS.paperShade,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          opacity: 0.65,
          fontFamily: FONT.ui,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          {['#E8736A', '#EFC65A', '#79BE86'].map((c) => (
            <div key={c} style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: c}} />
          ))}
          <div style={{fontSize: 13, color: COLORS.inkSoft, marginLeft: 8}}>
            小克剪辑_最终版_打孔不改(3).mp4
          </div>
        </div>
        <div style={{fontFamily: FONT.mono, fontSize: 15}}>00:00:29:79</div>
        <div style={{fontSize: 13, color: COLORS.inkSoft}}>720P · 视频 ▾</div>
      </div>

      {/* faded inspector */}
      <div
        style={{
          position: 'absolute',
          left: 1010,
          top: 58,
          width: 254,
          height: 334,
          backgroundColor: COLORS.white,
          border: `2px solid ${COLORS.ink}`,
          borderRadius: 14,
          opacity: 0.3,
          padding: '14px 16px',
          boxSizing: 'border-box',
          fontFamily: FONT.ui,
        }}
      >
        <div style={{fontSize: 16, fontWeight: 700, marginBottom: 20}}>调整 ✦</div>
        {['闪光', '饱和度', '缩放冲击', '速度'].map((s, i) => (
          <div key={s} style={{marginBottom: 22, fontSize: 12, color: COLORS.inkSoft}}>
            {s}
            <div style={{marginTop: 8, height: 5, borderRadius: 3, backgroundColor: COLORS.paperDark}}>
              <div style={{width: `${40 + i * 8}%`, height: 5, borderRadius: 3, backgroundColor: COLORS.teal}} />
            </div>
          </div>
        ))}
      </div>

      {/* sticky note */}
      <div
        style={{
          position: 'absolute',
          left: 52,
          top: 132,
          width: 306,
          height: 300,
          backgroundColor: COLORS.white,
          border: `2px solid ${COLORS.ink}`,
          borderRadius: 5,
          boxShadow: '0 10px 0 rgba(47,44,40,0.08)',
          transform: `translateX(${(1 - card) * -46}px) rotate(${-3 + card * 1.2}deg)`,
          opacity: card,
          fontFamily: FONT.hand,
          color: COLORS.ink,
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '38px 0 0 0',
            backgroundImage: `repeating-linear-gradient(transparent 0px, transparent 31px, #DCE6F2 31px, #DCE6F2 32px)`,
            opacity: 0.85,
          }}
        />
        {/* tape */}
        <div
          style={{
            position: 'absolute',
            left: 112,
            top: -14,
            width: 92,
            height: 28,
            backgroundColor: COLORS.yellowPale,
            transform: 'rotate(-4deg)',
            boxShadow: '0 2px 4px rgba(47,44,40,0.12)',
          }}
        />
        <div style={{position: 'relative', padding: '34px 26px'}}>
          <div style={{fontSize: 22, opacity: line1, transform: `translateY(${(1 - line1) * 10}px)`}}>
            30 秒剪完，
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              marginTop: 10,
              letterSpacing: 1,
              opacity: line2,
              transform: `scale(${0.86 + line2 * 0.14})`,
              transformOrigin: 'left center',
            }}
          >
            Opus 5.5
          </div>
          <svg width="230" height="20" style={{marginTop: -6, opacity: line2}}>
            <path
              d="M 4 12 Q 60 4 118 11 T 226 8"
              fill="none"
              stroke={COLORS.red}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 26,
            bottom: 28,
            fontSize: 18,
            opacity: line3,
          }}
        >
          — 小克 收工 ✦
        </div>
      </div>

      {/* hero phone */}
      <Phone
        scene={3}
        x={478}
        y={72}
        width={240}
        height={410}
        controls={false}
        overscan
        beat={pulse}
      />

      {/* waving character */}
      <Monster x={1012} y={430} size={112} wave={wave} beat={pulse} />

      {/* faded beat markers */}
      <div style={{position: 'absolute', left: 40, top: 646, width: 1200, height: 16, opacity: 0.42}}>
        {Array.from({length: TOTAL_BEATS}, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: (i / TOTAL_BEATS) * 1200,
              top: 0,
              width: 9,
              height: 9,
              backgroundColor: COLORS.yellow,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          right: 24,
          bottom: 12,
          fontSize: 11,
          color: COLORS.inkSoft,
          opacity: interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'}),
          fontFamily: FONT.ui,
        }}
      >
        缩放 0 · 总时长 10.0 s
      </div>
    </AbsoluteFill>
  );
};
