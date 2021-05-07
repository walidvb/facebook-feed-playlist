import { useMediaContext } from "./createMediaContext"
import Media from './MediaPlayer';

export function MediaFeed() {
  const { queue } = useMediaContext()

  return <>
    {queue.map((item) => <Media item={item} />)}
  </>
}