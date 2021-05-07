import { useMediaContext } from "./createMediaContext"
import Media from './MediaPlayer';

export function MediaFeed({ 
  renderMedia,
  className,
}) {
  const { queue } = useMediaContext()
  if('function' !== typeof renderMedia){
    return <>
      { queue.map((item) => (item) => <Media item={item} />)}
    </>
  }

  return <div className={className}>
    { queue.map((item) => renderMedia({ 
      metadata: item.metadata,
      renderPlayer: () => <Media item={item} />,
    }))}
  </div>
}