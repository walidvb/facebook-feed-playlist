import { useMediaContext } from "./createMediaContext";
import Media from './MediaPlayer';


export const MediaFloatingPlayer = ({
  hidden,
  className
}) => {
  const { playing } = useMediaContext();
  if (!playing.media) {
    return null;
  }
  return <>
    <Media
      className={[className, hidden && "absolute top-0 pointer-events-none opacity-0"].join(' ')}
      item={playing}
      lazy={false} 
    />
  </>;
};
