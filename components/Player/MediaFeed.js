import { useMediaContext } from "./createMediaContext"
import Media from './MediaPlayer';

export function MediaFeed({ 
  RenderMedia,
  className,
}) {
  const { queue } = useMediaContext()
  if ('function' !== typeof RenderMedia){
    return <>
      { queue.map((item) => (item) => <Media item={item} />)}
    </>
  }

  return <div className={className}>
    {queue.map((item) => <RenderMedia 
      metadata={item.metadata}
      renderPlayer={() => <Media key={item.media.url} item={item} />}
      />
    )}
  </div>
}