import {AbsoluteFill} from 'remotion';
import {COLORS, FONT, OUTLINE} from '../theme';

const TABS = ['素材', '转场', '文字'];

const ASSETS = [
  {label: '旋转', bg: '#E9E3F5', icon: '◎', color: '#7C6BC2'},
  {label: '翻页', bg: '#DFF1E9', icon: '▤', color: '#2FA99B'},
  {label: '故障', bg: '#F7E1E8', icon: '▦', color: '#C9563F'},
  {label: '缩放', bg: '#E1EEF7', icon: '⊕', color: '#3B7FB5'},
  {label: '滑动', bg: '#FBF0CE', icon: '▷', color: '#B08B2E'},
  {label: '溶解', bg: '#ECE7F6', icon: '▧', color: '#7C6BC2'},
];

const SLIDERS = [
  {label: '闪光', value: '70%', pos: 0.7},
  {label: '饱和度', value: '110%', pos: 0.55},
  {label: '缩放冲击', value: '60%', pos: 0.6},
  {label: '速度', value: '7.0×', pos: 0.42},
];

const pad = (n: number) => String(n).padStart(2, '0');

type Props = {
  activeTab: number;
  activeAsset: number;
  timecode: number;
  beat: number;
};

export const EditorShell = ({activeTab, activeAsset, timecode, beat}: Props) => {
  const total = timecode + 60;
  const seconds = Math.floor(total / 30);
  const frames = total % 30;
  const clock = `00:00:${pad(seconds)}:${pad(frames)}`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.paper,
        fontFamily: FONT.ui,
        color: COLORS.ink,
      }}
    >
      {/* faint drafting grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.32,
        }}
      />

      {/* top bar */}
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
          paddingLeft: 18,
          paddingRight: 18,
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          {['#E8736A', '#EFC65A', '#79BE86'].map((c) => (
            <div
              key={c}
              style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: c}}
            />
          ))}
          <div style={{fontSize: 13, color: COLORS.inkSoft, marginLeft: 8}}>
            小克剪辑_最终版_打孔不改(3).mp4
          </div>
        </div>

        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 15,
            letterSpacing: 1,
            backgroundColor: COLORS.white,
            border: SOFT_BORDER,
            borderRadius: 6,
            padding: '3px 14px',
          }}
        >
          {clock}
        </div>

        <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
          <div
            style={{
              fontSize: 12,
              border: SOFT_BORDER,
              borderRadius: 6,
              padding: '4px 10px',
              color: COLORS.inkSoft,
            }}
          >
            720P
          </div>
          <div
            style={{
              fontSize: 13,
              backgroundColor: COLORS.yellowPale,
              border: `1.5px solid ${COLORS.ink}`,
              borderRadius: 6,
              padding: '4px 14px',
            }}
          >
            视频 ▾
          </div>
        </div>
      </div>

      {/* left asset library */}
      <div
        style={{
          position: 'absolute',
          left: 16,
          top: 58,
          width: 248,
          height: 334,
          backgroundColor: COLORS.white,
          border: OUTLINE,
          borderRadius: 14,
          padding: 12,
          boxSizing: 'border-box',
        }}
      >
        <div style={{display: 'flex', gap: 6, marginBottom: 14}}>
          {TABS.map((tab, i) => (
            <div
              key={tab}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 13,
                padding: '5px 0',
                borderRadius: 7,
                border: `1.5px solid ${i === activeTab ? COLORS.ink : COLORS.paperDark}`,
                backgroundColor: i === activeTab ? COLORS.yellow : COLORS.paper,
                fontWeight: i === activeTab ? 700 : 400,
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
          {ASSETS.map((a, i) => (
            <div
              key={a.label}
              style={{
                height: 82,
                borderRadius: 10,
                border: `1.5px solid ${i === activeAsset ? COLORS.ink : COLORS.paperDark}`,
                backgroundColor: a.bg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                transform: `scale(${i === activeAsset ? 1.05 + beat * 0.03 : 1})`,
                boxShadow:
                  i === activeAsset ? `0 3px 0 ${COLORS.ink}` : 'none',
              }}
            >
              <div style={{fontSize: 27, color: a.color, lineHeight: 1}}>
                {a.icon}
              </div>
              <div style={{fontSize: 12, color: COLORS.inkSoft}}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* centre stage framing guides */}
      <div
        style={{
          position: 'absolute',
          left: 300,
          top: 58,
          width: 680,
          height: 334,
          border: `1.5px dashed ${COLORS.paperDark}`,
          borderRadius: 16,
          opacity: 0.7,
        }}
      />

      {/* right inspector */}
      <div
        style={{
          position: 'absolute',
          left: 1010,
          top: 58,
          width: 254,
          height: 334,
          backgroundColor: COLORS.white,
          border: OUTLINE,
          borderRadius: 14,
          padding: '14px 16px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{fontSize: 16, fontWeight: 700, marginBottom: 18}}>
          调整 <span style={{color: COLORS.purple}}>✦</span>
        </div>
        {SLIDERS.map((s, i) => (
          <div key={s.label} style={{marginBottom: 20}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
                color: COLORS.inkSoft,
                marginBottom: 7,
              }}
            >
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
            <div style={{position: 'relative', height: 6}}>
              <div
                style={{
                  position: 'absolute',
                  top: 1,
                  left: 0,
                  width: '100%',
                  height: 4,
                  borderRadius: 3,
                  backgroundColor: COLORS.paperDark,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 1,
                  left: 0,
                  width: `${s.pos * 100}%`,
                  height: 4,
                  borderRadius: 3,
                  backgroundColor: COLORS.teal,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: -5,
                  left: `calc(${s.pos * 100}% - 8px)`,
                  width: 16 + (i === 0 ? beat * 4 : 0),
                  height: 16 + (i === 0 ? beat * 4 : 0),
                  borderRadius: '50%',
                  backgroundColor: COLORS.white,
                  border: `2px solid ${COLORS.tealDark}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const SOFT_BORDER = `1.5px solid ${COLORS.paperDark}`;
