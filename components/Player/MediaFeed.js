import { useMediaContext } from "./createMediaContext"
import Media from './MediaPlayer';

export const MediaFloatingPlayer = () => {
  const { playing } = useMediaContext();
  if(!playing.media){
    return null
  }
  return <>
    <Media item={playing} lazy={false} />
    <details>
      <summary>
        playing
      </summary>
      {JSON.stringify(playing)}
    </details>
  </>
}

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
    {queue.map((item) => {
      return <RenderMedia
        key={item.media.url}
        item={item}
        renderPlayer={() => <Media key={item.media.url} item={item} />}
      />
    })}
  </div>
}