import {COLORS, FONT} from '../theme';
import {Scene} from './Scenes';

type Props = {
  scene: number;
  beat?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  controls?: boolean;
  label?: string;
  overscan?: boolean;
};

const Control = ({kind}: {kind: 'prev' | 'play' | 'next'}) => (
  <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden>
    {kind === 'prev' ? (
      <g fill={COLORS.ink}>
        <rect x={2} y={3} width={2} height={10} rx={1} />
        <path d="M14 3 L6 8 L14 13 Z" />
      </g>
    ) : kind === 'next' ? (
      <g fill={COLORS.ink}>
        <rect x={12} y={3} width={2} height={10} rx={1} />
        <path d="M2 3 L10 8 L2 13 Z" />
      </g>
    ) : (
      <path d="M3 2 L14 8 L3 14 Z" fill={COLORS.ink} />
    )}
  </svg>
);

export const Phone = ({
  scene,
  beat = 0,
  x = 535,
  y = 62,
  width = 210,
  height = 350,
  controls = true,
  label,
  overscan = false,
}: Props) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          height,
          borderRadius: 30,
          backgroundColor: '#242120',
          border: '3px solid #151312',
          padding: 8,
          boxSizing: 'border-box',
          boxShadow: overscan ? '0 14px 0 rgba(47,44,40,0.14)' : '0 8px 0 rgba(47,44,40,0.12)',
          transform: `scale(${1 + beat * 0.012})`,
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 22,
            overflow: 'hidden',
            backgroundColor: COLORS.night,
          }}
        >
          <Scene index={scene} />

          {/* notch */}
          <div
            style={{
              position: 'absolute',
              top: 5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 54,
              height: 11,
              borderRadius: 7,
              backgroundColor: '#151312',
              zIndex: 5,
            }}
          />

          {label ? (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '62%',
                transform: 'translate(-50%, -50%) rotate(-3deg)',
                backgroundColor: COLORS.yellow,
                color: COLORS.ink,
                fontFamily: FONT.hand,
                fontWeight: 700,
                fontSize: 17,
                padding: '4px 12px',
                borderRadius: 5,
                border: `1.5px solid ${COLORS.ink}`,
                whiteSpace: 'nowrap',
                zIndex: 4,
              }}
            >
              {label}
            </div>
          ) : null}
        </div>
      </div>

      {controls ? (
        <div
          style={{
            position: 'absolute',
            left: x + width / 2 - 52,
            top: y + height + 6,
            width: 104,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 3,
          }}
        >
          <Control kind="prev" />
          <Control kind="play" />
          <Control kind="next" />
        </div>
      ) : null}
    </>
  );
};
