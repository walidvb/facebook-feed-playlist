import { useMediaContext } from "./createMediaContext"
import Media from './MediaPlayer';

export function MediaFeed({ 
  renderMedia
}) {
  const { queue } = useMediaContext()
  if('function' !== typeof renderMedia){
    return <>
      { queue.map((item) => (item) => <Media item={item} />)}
    </>
  }
    return <>
      { queue.map((item) => renderMedia({ 
        metadata: item.metadata,
        renderPlayer: () => <Media item={item} />,
      }))}
    </>
}