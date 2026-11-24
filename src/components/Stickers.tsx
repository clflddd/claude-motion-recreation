import {interpolate, spring} from 'remotion';
import {COLORS, FONT} from '../theme';

type Props = {
  text: string;
  color: string;
  x: number;
  y: number;
  rotate: number;
  size: number;
  frame: number;
  startFrame: number;
};

export const Sticker = ({
  text,
  color,
  x,
  y,
  rotate,
  size,
  frame,
  startFrame,
}: Props) => {
  const local = Math.max(0, frame - startFrame);
  const pop = spring({
    frame: local,
    fps: 30,
    config: {damping: 11, stiffness: 190, mass: 0.7},
  });
  const fadeOut = interpolate(local, [48, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const jitter = Math.sin(local * 0.9) * 1.4;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + jitter,
        transform: `rotate(${rotate}deg) scale(${0.3 + pop * 0.7})`,
        opacity: Math.min(1, pop * 1.6) * fadeOut,
        transformOrigin: 'left center',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontFamily: FONT.hand,
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.1,
          color,
          WebkitTextStroke: `2.5px ${COLORS.ink}`,
          paintOrder: 'stroke fill',
          textShadow: `3px 4px 0 ${COLORS.ink}33`,
          whiteSpace: 'nowrap',
          letterSpacing: 1,
        }}
      >
        {text}
      </div>
    </div>
  );
};
