import { Pause, Play } from "../icons";
import { useMemo } from 'react';
import { useMediaContext, useItemState } from "./createMediaContext";

const VALUE_FACTOR = 100
const MediaControls = ({ item }) => {
  const { playing, play, pause, seekTo } = useMediaContext()
  const { progress } = item
  const { isPlaying } = useItemState(item)
  // id is needed to style the progress bar
  const id = useMemo(() => `input-${Math.floor(Math.random() * 2000)}`, []);

  return <div className="flex items-center">
    <div onClick={() => isPlaying ? pause() : play(item)} className={``} >
      {isPlaying ? <Pause className={`h-12 w-12`} /> : <Play className={`h-12 w-12`} />}
    </div>
    <div className="w-full break-all ml-4">
      <style dangerouslySetInnerHTML={{
        __html: `
        #${id}::-webkit-slider-runnable-track{
          background-size: ${progress / VALUE_FACTOR * 100}% 100%;
        }
      ` }}>
      </style>
      <input
        id={id}
        value={progress}
        type="range"
        min={0}
        className="w-full"
        max={100}
        onChange={({ target: { value } }) => seekTo({ seekTo: parseInt(value)/100, item })}
        tabIndex={1} />
    </div>
  </div>;
};

export default MediaControls