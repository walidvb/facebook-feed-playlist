import { Pause, Play } from "../icons";
import { useMemo } from 'react';
import { useMediaContext } from "./createMediaContext";

const VALUE_FACTOR = 100
const MediaControls = ({ item }) => {
  const { playing, play, pause, seekTo } = useMediaContext()
  const { progress } = item
  const isPlaying = useMemo(() => playing.isPlaying && playing.media?.url === item.media.url, [item, playing])
  const id = useMemo(() => `input-${Math.floor(Math.random() * 2000)}`, []);
  return <div className="flex items-center">
    <div
      onClick={() => isPlaying ? pause() : play(item)}
      className={``}
    >
      {isPlaying ? <Pause className={`h-12 w-12`} /> : <Play className={`h-12 w-12`} />}
      {isPlaying ? 'on' : 'off'}
    </div>
    <div className="w-full break-all ml-4">
      <style dangerouslySetInnerHTML={{
        __html: `
        #${id}::-webkit-slider-runnable-track{
          // background-size: ${progress / VALUE_FACTOR * 100}% 100%;

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
        onChange={({ target: { value } }) => seekTo({ progress: parseInt(value), item })}
        tabIndex={1} />
    </div>
  </div>;
};

export default MediaControls