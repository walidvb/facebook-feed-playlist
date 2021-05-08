import { useMediaContext } from "./createMediaContext";
import Media from './MediaPlayer';


export const MediaFloatingPlayer = ({
  hidden
}) => {
  const { playing } = useMediaContext();
  if (!playing.media) {
    return null;
  }
  return <>
    <Media
      // className={hidden && "absolute top-0 pointer-events-none opacity-0"}
      item={playing}
      lazy={false} 
    />
  </>;
};
