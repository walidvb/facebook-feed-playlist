import { useMediaContext } from "./createMediaContext";
import Media from './MediaPlayer';


export const MediaFloatingPlayer = () => {
  const { playing } = useMediaContext();
  if (!playing.media) {
    return null;
  }
  return <>
    <Media item={playing} lazy={false} />
    <details>
      <summary>
        playing
      </summary>
      {JSON.stringify(playing)}
    </details>
  </>;
};
