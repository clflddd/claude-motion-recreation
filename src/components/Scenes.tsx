import {COLORS, FONT} from '../theme';

const VB = '0 0 194 334';

const svgProps = {
  viewBox: VB,
  width: '100%',
  height: '100%',
  preserveAspectRatio: 'xMidYMid slice',
} as const;

const STARS = [
  [24, 40, 2], [58, 72, 1.5], [92, 32, 2.5], [130, 36, 1.8], [166, 52, 2],
  [38, 112, 1.6], [76, 130, 2.2], [112, 98, 1.4], [152, 128, 2], [18, 158, 1.8],
  [170, 172, 1.5], [52, 188, 1.3], [100, 156, 2.4], [138, 200, 1.7], [28, 220, 2],
  [160, 228, 1.9], [68, 236, 1.4],
];

const NightScene = () => (
  <svg {...svgProps}>
    <defs>
      <linearGradient id="nightBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={COLORS.night} />
        <stop offset="60%" stopColor={COLORS.nightMid} />
        <stop offset="100%" stopColor="#161233" />
      </linearGradient>
      <mask id="moonCut">
        <rect x="0" y="0" width="194" height="334" fill="white" />
        <circle cx="132" cy="52" r="20" fill="black" />
      </mask>
    </defs>
    <rect x="0" y="0" width="194" height="334" fill="url(#nightBg)" />
    {STARS.map(([x, y, r], i) => (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={r}
        fill={i % 4 === 0 ? COLORS.yellow : '#FFF6D8'}
        opacity={0.55 + (i % 3) * 0.15}
      />
    ))}
    <circle cx="143" cy="64" r="22" fill={COLORS.yellow} mask="url(#moonCut)" />
    <path
      d="M 8 250 Q 60 208 112 246 T 194 238"
      fill="none"
      stroke="#C8B96A"
      strokeWidth="1.4"
      opacity="0.65"
    />
    <path
      d="M 0 286 Q 70 250 130 282 T 194 274"
      fill="none"
      stroke="#C8B96A"
      strokeWidth="1.2"
      opacity="0.45"
    />
    {/* little red character silhouette in the night */}
    <g>
      <rect x="82" y="176" width="34" height="30" rx="7" fill={COLORS.red} />
      <circle cx="92" cy="189" r="2.2" fill="#241F2A" />
      <circle cx="106" cy="189" r="2.2" fill="#241F2A" />
      <rect x="86" y="204" width="8" height="9" rx="3" fill={COLORS.redDark} />
      <rect x="104" y="204" width="8" height="9" rx="3" fill={COLORS.redDark} />
    </g>
    {/* cat silhouette at the bottom */}
    <path
      d="M 58 334 Q 56 286 80 274 L 76 252 L 92 264 L 108 252 L 104 274 Q 128 288 126 334 Z"
      fill="#14112E"
    />
    <path d="M 126 320 Q 160 306 152 276" fill="none" stroke="#14112E" strokeWidth="9" strokeLinecap="round" />
  </svg>
);

const RamenScene = () => (
  <svg {...svgProps}>
    <defs>
      <linearGradient id="ramenBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBF0CE" />
        <stop offset="100%" stopColor="#F3D89C" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="194" height="334" fill="url(#ramenBg)" />
    <circle cx="160" cy="52" r="26" fill="#FFFFFF" opacity="0.45" />
    <text x="16" y="52" fontFamily={FONT.hand} fontSize="20" fill={COLORS.ink} opacity="0.75">
      小克拉面
    </text>

    {/* steam */}
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M ${58 + i * 32} 150 q -10 -18 2 -32 q 10 -14 0 -28`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
    ))}

    {/* chopsticks */}
    <g stroke={COLORS.ink} strokeWidth="5" strokeLinecap="round">
      <line x1="118" y1="108" x2="182" y2="66" />
      <line x1="126" y1="118" x2="188" y2="80" />
    </g>

    {/* noodles */}
    <g fill="none" stroke="#F7E3A8" strokeWidth="4" strokeLinecap="round">
      <path d="M 44 184 q 12 -14 24 0 t 24 0 t 24 0 t 24 0" />
      <path d="M 48 194 q 12 -12 24 0 t 24 0 t 24 0" />
    </g>

    {/* bowl */}
    <path
      d="M 24 190 A 73 73 0 0 0 170 190 Z"
      fill="#DE5A40"
      stroke={COLORS.ink}
      strokeWidth="3"
    />
    <path d="M 42 220 Q 97 258 152 220" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.55" />
    <rect x="18" y="184" width="158" height="11" rx="5.5" fill="#FFF6DF" stroke={COLORS.ink} strokeWidth="2.5" />

    {/* toppings */}
    <rect x="42" y="160" width="30" height="30" rx="3" fill="#2E4034" transform="rotate(-12 57 175)" />
    <circle cx="128" cy="172" r="16" fill="#FFF6DF" stroke={COLORS.ink} strokeWidth="2" />
    <circle cx="128" cy="172" r="7.5" fill="#F2A93B" />
    <path d="M 84 168 q 10 -10 20 0" fill="none" stroke="#5B8C5A" strokeWidth="4" strokeLinecap="round" />

    <text x="97" y="300" textAnchor="middle" fontFamily={FONT.hand} fontSize="19" fill={COLORS.ink}>
      空心人风!
    </text>
  </svg>
);

const ShibaScene = () => (
  <svg {...svgProps}>
    <defs>
      <linearGradient id="shibaBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D8F2EA" />
        <stop offset="100%" stopColor="#A8DDD2" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="194" height="334" fill="url(#shibaBg)" />
    {[30, 164].map((x, i) => (
      <text key={i} x={x} y={70} fontSize="18" fill="#FFFFFF" opacity="0.85">✦</text>
    ))}

    {/* ears */}
    <path d="M 42 128 L 50 66 L 88 108 Z" fill="#D98B45" stroke={COLORS.ink} strokeWidth="3" strokeLinejoin="round" />
    <path d="M 152 128 L 144 66 L 106 108 Z" fill="#D98B45" stroke={COLORS.ink} strokeWidth="3" strokeLinejoin="round" />
    <path d="M 53 116 L 56 86 L 78 108 Z" fill="#F6C9A8" />
    <path d="M 141 116 L 138 86 L 116 108 Z" fill="#F6C9A8" />

    {/* head */}
    <ellipse cx="97" cy="182" rx="70" ry="64" fill="#E9A05A" stroke={COLORS.ink} strokeWidth="3" />
    <path
      d="M 32 186 Q 45 150 66 168 Q 80 180 97 176 Q 114 180 128 168 Q 149 150 162 186 Q 160 232 97 240 Q 34 232 32 186 Z"
      fill="#FFF7E9"
    />
    {/* eyes */}
    <ellipse cx="70" cy="172" rx="5.5" ry="7" fill="#2F2C28" />
    <ellipse cx="124" cy="172" rx="5.5" ry="7" fill="#2F2C28" />
    <circle cx="72" cy="169" r="1.8" fill="#FFFFFF" />
    <circle cx="126" cy="169" r="1.8" fill="#FFFFFF" />
    {/* blush */}
    <ellipse cx="52" cy="196" rx="10" ry="6" fill="#F09A9A" opacity="0.65" />
    <ellipse cx="142" cy="196" rx="10" ry="6" fill="#F09A9A" opacity="0.65" />
    {/* nose + mouth */}
    <path d="M 90 196 L 104 196 L 97 204 Z" fill="#2F2C28" />
    <path d="M 97 204 Q 88 214 80 206 M 97 204 Q 106 214 114 206" fill="none" stroke="#2F2C28" strokeWidth="2.5" strokeLinecap="round" />

    <text x="97" y="288" textAnchor="middle" fontFamily={FONT.hand} fontSize="22" fill={COLORS.ink} fontWeight="bold">
      好耶~
    </text>
  </svg>
);

const StageScene = () => (
  <svg {...svgProps}>
    <defs>
      <linearGradient id="stageBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A3A8C" />
        <stop offset="55%" stopColor="#7A55B0" />
        <stop offset="100%" stopColor="#2A2154" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="194" height="334" fill="url(#stageBg)" />

    {/* checkerboard floor */}
    {Array.from({length: 7}, (_, row) => {
      const y0 = 232 + row * 16;
      const inset = row * 4;
      return Array.from({length: 8}, (_, col) => {
        const w = (194 - inset * 2) / 8;
        return (
          <rect
            key={`${row}-${col}`}
            x={inset + col * w}
            y={y0}
            width={w}
            height={16}
            fill={(row + col) % 2 === 0 ? '#6E5AB4' : '#2A2154'}
            opacity={0.75}
          />
        );
      });
    })}

    <text x="97" y="72" textAnchor="middle" fontFamily={FONT.hand} fontSize="34" fontWeight="bold"
      fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth="4" paintOrder="stroke">
      拿捏了!
    </text>
    <text x="97" y="92" textAnchor="middle" fontFamily={FONT.hand} fontSize="13" fill="#FFFFFF" opacity="0.8">
      ✦ 30 秒剪完 ✦
    </text>

    {/* celebrating character */}
    <g>
      <rect x="76" y="150" width="42" height="40" rx="9" fill={COLORS.red} stroke={COLORS.ink} strokeWidth="2.5" />
      <circle cx="88" cy="166" r="2.6" fill="#241F2A" />
      <circle cx="106" cy="166" r="2.6" fill="#241F2A" />
      <path d="M 90 178 q 7 6 14 0" fill="none" stroke="#241F2A" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="82" cy="175" rx="5" ry="3.5" fill={COLORS.pink} opacity="0.8" />
      <ellipse cx="112" cy="175" rx="5" ry="3.5" fill={COLORS.pink} opacity="0.8" />
      <path d="M 78 158 Q 62 138 58 120" fill="none" stroke={COLORS.red} strokeWidth="8" strokeLinecap="round" />
      <path d="M 116 158 Q 132 138 136 120" fill="none" stroke={COLORS.red} strokeWidth="8" strokeLinecap="round" />
      <rect x="82" y="188" width="9" height="12" rx="4" fill={COLORS.redDark} />
      <rect x="103" y="188" width="9" height="12" rx="4" fill={COLORS.redDark} />
    </g>

    {/* floating social bubbles */}
    {[
      {x: 18, y: 118, t: '♥ 10.2w'},
      {x: 128, y: 176, t: '● 2.3k'},
      {x: 22, y: 214, t: '↗ 分享'},
    ].map((b) => (
      <g key={b.t}>
        <rect x={b.x} y={b.y} width={b.x > 100 ? 58 : 62} height="22" rx="11" fill="#FFFFFF" opacity="0.92" />
        <text x={b.x + 7} y={b.y + 15} fontFamily={FONT.ui} fontSize="11" fill={COLORS.nightMid}>
          {b.t}
        </text>
      </g>
    ))}

    <text x="97" y="316" textAnchor="middle" fontFamily={FONT.hand} fontSize="11" fill="#FFFFFF" opacity="0.85">
      @小克 · Opus 5.5
    </text>
  </svg>
);

const SCENES = [NightScene, RamenScene, ShibaScene, StageScene];

export const Scene = ({index}: {index: number}) => {
  const Component = SCENES[((index % SCENES.length) + SCENES.length) % SCENES.length];
  return <Component />;
};
