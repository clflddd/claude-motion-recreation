import {COLORS} from '../theme';

type Props = {
  x: number;
  y: number;
  size?: number;
  wave?: number;
  beat?: number;
  flip?: boolean;
};

export const Monster = ({x, y, size = 88, wave = 0, beat = 0, flip = false}: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) scale(${1 + beat * 0.09}) scaleX(${flip ? -1 : 1})`,
        zIndex: 6,
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <ellipse cx="50" cy="93" rx="27" ry="5" fill={COLORS.ink} opacity="0.13" />

        {/* legs */}
        <rect x="29" y="72" width="12" height="17" rx="5" fill={COLORS.redDark} />
        <rect x="59" y="72" width="12" height="17" rx="5" fill={COLORS.redDark} />

        {/* left arm */}
        <rect
          x="2"
          y="45"
          width="15"
          height="10"
          rx="5"
          fill={COLORS.red}
          stroke={COLORS.ink}
          strokeWidth="2"
          transform="rotate(18 9 50)"
        />

        {/* waving right arm */}
        <g transform={`rotate(${-18 - wave * 62} 86 50)`}>
          <rect
            x="84"
            y="44"
            width="16"
            height="10"
            rx="5"
            fill={COLORS.red}
            stroke={COLORS.ink}
            strokeWidth="2"
          />
        </g>

        {/* body */}
        <rect
          x="12"
          y="18"
          width="76"
          height="62"
          rx="14"
          fill={COLORS.red}
          stroke={COLORS.ink}
          strokeWidth="3"
        />
        {/* tuft */}
        <path
          d="M 47 18 Q 44 8 52 6 Q 50 12 57 18"
          fill={COLORS.red}
          stroke={COLORS.ink}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* eyes */}
        <ellipse cx="36" cy="44" rx="4.2" ry={5.4 - beat * 1.6} fill="#241F2A" />
        <ellipse cx="64" cy="44" rx="4.2" ry={5.4 - beat * 1.6} fill="#241F2A" />
        {/* blush */}
        <ellipse cx="26" cy="56" rx="7" ry="4.6" fill={COLORS.pink} opacity="0.85" />
        <ellipse cx="74" cy="56" rx="7" ry="4.6" fill={COLORS.pink} opacity="0.85" />
        {/* mouth */}
        <path
          d="M 43 57 Q 50 63 57 57"
          fill="none"
          stroke="#241F2A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
