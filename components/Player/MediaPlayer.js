import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useMediaContext } from './createMediaContext';

const Media = ({ url, image, index }) => {
  const [displayIframe, setDisplayIframe] = useState(false)
  const [playing, setPlaying] = useState(false)
  const { nowPlaying, setNowPlaying } = useMediaContext()
  useEffect(() => {
    const isPlaying = nowPlaying === index
    setPlaying(isPlaying)
    setDisplayIframe(isPlaying)
    if (displayIframe) {
    }
  }, [nowPlaying, index, setPlaying])

  useEffect(() => {
    if (nowPlaying === index && (displayIframe || playing)) {
      setNowPlaying(index)
    }
  }, [displayIframe, playing, nowPlaying])

  if (!ReactPlayer.canPlay(url)) {
    return null;
  }

  if (!displayIframe && image) {
    return <div>
      <div style={{ width: "640px", maxWidth: '100vw' }} onClick={() => {
        setDisplayIframe(true)
        setNowPlaying(index)
      }}
        className="relative cursor-pointer"
      >
        <YoutubePlayIcon />
        <img className="w-full" src={image} />
      </div>
    </div>
  }
  return <div>
    <ReactPlayer
      style={{ maxWidth: '100vw' }}
      url={url}
      onPlay={() => setNowPlaying(index)}
      onPause={() => { }}
      onEnded={() => {
        setNowPlaying(index + 1)
        setPlaying(false)
      }}
      controls
      playing={playing}
    />
  </div>
};

export default Media

const RE_YOUTUBE = /(?:v=|youtu\.be\/|list=)([\w-]{10,12})/;
function getThumb(url) {
  let video_id = null;
  const match = RE_YOUTUBE.exec(url);
  if (match) {
    video_id = match[1];
  }

  if (video_id) {
    return `http://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  }
}


const YoutubePlayIcon = ({ className }) => {
  return <div className="absolute inset-0 flex items-center justify-center  ">
    <svg className="w-24" xmlns="http://www.w3.org/2000/svg" version="1.1" id="YouTube_Icon" x="0px" y="0px" viewBox="0 0 1024 721" enableBackground="new 0 0 1024 721" >
      <path id="Triangle" fill="#FFFFFF" d="M407,493l276-143L407,206V493z" />
      <path id="The_Sharpness" opacity="0.12" fillRule="evenodd" clipRule="evenodd" d="M407,206l242,161.6l34-17.6L407,206z" />
      <g id="Lozenge">
        <g>
          <path fill="#282928" d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3h-0.4    c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5    C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3    s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5    C1023.2,238.9,1013,156.3,1013,156.3z M407,493l0-287l276,144L407,493z" />
        </g>
      </g>
    </svg>
  </div>
}