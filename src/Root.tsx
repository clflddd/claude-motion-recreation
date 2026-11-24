import {Composition} from 'remotion';
import {Main} from './Main';
import {DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH} from './theme';

export const RemotionRoot = () => (
  <Composition
    id="ClaudeMotion"
    component={Main}
    durationInFrames={DURATION_IN_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
