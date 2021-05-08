import { useItemState, useMediaContext } from "./createMediaContext"
import MediaControls from './MediaControls';
import { DateTime } from 'luxon';

const Item = ({ item, className }) => {
  const { media: { title, image_url }, metadata: { createdAt} } = item
  const { isPlaying } = useItemState(item)
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' });
  return <div className={`flex items-center group ${className}`}>
    <div class="relative w-12 h-12 bg-center bg-cover flex-shrink-0 mr-2" style={{backgroundImage: `url(${image_url})`}}>
      <MediaControls
        className={`absolute object-center group-hover:opacity-100 ${!isPlaying && 'opacity-0'}`}
        noProgress
        item={item}
      />
    </div>
    <div>
      <div className="text-gray-600 text-xs italic">
        {renderedDate}
      </div>
      <div className={`mr-2 text-sm ${isPlaying && 'font-bold'}`}>
        { title }
      </div>
    </div>
  </div>
}


const PanelTitle = () => (
  <div className="px-2 sticky top-0 bg-white z-10 py-2 border-b border-gray-500">
    Next Up
  </div>
)
export function MediaQueue({
  RenderMedia,
  className,
}) {
  const { queue } = useMediaContext()

  if ('function' !== typeof RenderMedia) {
    return <div className={["w-72 border border-gray-500", className].join(' ')}>
      <PanelTitle />
      { queue.map((item) => <Item 
        key={item.media.url} 
        className="pt-1 mb-1 px-2"
        item={item} 
      />)}
    </div>
  }

  return <div className={["w-64 border border-gray-500", className].join(' ')}>
    <PanelTitle />
    {queue.map((item) => {
      return <RenderMedia
        key={item.media.url}
        item={item}
      />
    })}
  </div>
}