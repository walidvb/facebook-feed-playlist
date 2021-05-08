import { useMediaContext } from "./createMediaContext"
import Media from './MediaPlayer';

export function MediaFeed({ 
  RenderMedia,
  className,
}) {
  const { playing, queue } = useMediaContext()
  
  if ('function' !== typeof RenderMedia){
    return <>
      { queue.map((item) => (item) => <Media item={item} />)}
    </>
  }

  return <div className={className}>
    {queue.map((item) => {
      const isPlaying = playing.media?.url === item.media.url
      return <RenderMedia 
        item={item}
        isPlaying={isPlaying}
        renderPlayer={() => <Media key={item.media.url} item={item} />}
      />
    })}
  </div>
}