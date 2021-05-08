
import { useReducer, useEffect, useMemo } from 'react';
import fabricateContext from '../hooks/createContext';


const reducer = (state, { payload, type } = {}) => {
  const updateQueue = (...changes) => state.queue.map((it) => {
    const appliedChange = changes.find((change) => {
      const [from, to] = change
      if (it.media.url === from.media.url) {
        return true
      }
    })
    if (appliedChange ){
      return appliedChange[1]
    }
    return it
  })

  switch(type){
    case 'NEW_LIST':
      return {
        ...state,
        queue: [
          ...state.queue,
          ...payload.map((m, i) => ({ ...m, position: i }))
        ],
      }
    case 'PLAY':
      const newPlay = {
        ...payload.item,
        isPlaying: true,
      }
      return {
        ...state,
        queue: updateQueue([payload.item, newPlay]),
        playing: newPlay,
      }
    case 'PAUSE':
      const newPause = {
        ...state.playing,
        isPlaying: false,
      }
      return {
        queue: updateQueue([state.playing, newPause]),
        playing: newPause,
      }
    case 'PROGRESSED':
      const newProg = {
        ...payload.item,
        progress: payload.progress
      }
      return {
        queue: updateQueue([payload.item, newProg]),
        playing: newProg,
      }
    case 'SEEKED_TO':
      const newSeeked = {
        ...payload.item,
        seekedTo: payload.seekTo
      }
      return {
        ...state,
        queue: updateQueue([payload.item, newSeeked]),
        playing: newSeeked,
      }
    case 'NEXT':
      const next = state.playing.position + 1
      const nextPlaying = {
        ...state.queue[next],
        progress: 0,
        seekedTo: 0,
        isPlaying: true,
      }
      return {
        ...state,
        queue: updateQueue(
          [state.playing, {...state.playing, isPlaying: false}], 
          [state.queue[next], nextPlaying]
        ),
        playing: nextPlaying
      }
    default:
      return state
  }

}

const initialState = ({ list = [] }) => ({
  playing: {},
  queue: list.map((m, i) => ({...m, position: i})),
})

export const {
  Provider: MediaProvider,
  useContext: useMediaContext
} = fabricateContext(({ list }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState({ list }))
  
  useEffect(() => {
    dispatch({ type: 'NEW_LIST', payload: list})
  }, [list])

  const actions = {
    play: (item) => dispatch({ type: 'PLAY', payload: { item } }),
    pause: () => dispatch({ type: 'PAUSE' }),
    next: () => dispatch({ type: 'NEXT' }),
    progressed: ({ progress, item }) => dispatch({ type: 'PROGRESSED', payload: { progress, item } }),
    seekTo: ({ seekTo, item }) => dispatch({ type: 'SEEKED_TO', payload: { seekTo, item } }),
  }

  return {
    ...state,
    ...actions,
  }
})

export const useItemState = (item) => {
  const { playing } = useMediaContext()
  const { media: { url } } = item

  const { media: playingMedia } = playing
  const { url: playingUrl } = (playingMedia || {})
  const isPlaying = useMemo(() => playingUrl === url && playing.isPlaying, [url, playingUrl, playing.isPlaying])

  return {
    isPlaying
  }
}