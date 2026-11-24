import {interpolate} from 'remotion';
import {COLORS} from '../theme';

const ROUTES = [
  {d: 'M 210 220 C 320 150, 400 270, 520 186', end: [520, 186], angle: -24},
  {d: 'M 748 190 C 860 128, 940 210, 1008 152', end: [1008, 152], angle: -34},
  {d: 'M 300 404 C 440 320, 600 396, 706 292', end: [706, 292], angle: -42},
] as const;

type Props = {
  localFrame: number;
  variant: number;
};

export const MotionArrow = ({localFrame, variant}: Props) => {
  const route = ROUTES[((variant % ROUTES.length) + ROUTES.length) % ROUTES.length];
  const draw = interpolate(localFrame, [4, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headOpacity = interpolate(localFrame, [26, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fade = interpolate(localFrame, [104, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      viewBox="0 0 1280 430"
      width={1280}
      height={430}
      style={{position: 'absolute', left: 0, top: 0, opacity: fade, zIndex: 4}}
    >
      <path
        d={route.d}
        fill="none"
        stroke={COLORS.red}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1"
        strokeDashoffset={1 - draw}
        pathLength={1}
        opacity="0.9"
      />
      <circle cx={route.d.startsWith('M 210') ? 210 : route.d.startsWith('M 748') ? 748 : 300}
        cy={route.d.startsWith('M 210') ? 220 : route.d.startsWith('M 748') ? 190 : 404}
        r="5" fill={COLORS.red} opacity={draw * 0.9} />
      <g
        transform={`translate(${route.end[0]} ${route.end[1]}) rotate(${route.angle})`}
        opacity={headOpacity}
      >
        <path d="M 0 0 L -18 -7 L -18 7 Z" fill={COLORS.red} />
      </g>
    </svg>
  );
};
