
import { useReducer, useEffect } from 'react';
import fabricateContext from '../hooks/createContext';

const reducer = (state, { payload, type } = {}) => {
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
      return {
        ...state,
        playing: {
          ...payload.item,
          isPlaying: true,
        },
      }
    case 'PAUSE':
      return {
        ...state,
        playing: {
          ...state.playing,
          isPlaying: false,
        },
      }
    case 'PROGRESSED':
      return {
        queue: state.queue.map((item) => {
          if(item === payload.item){
            return {
              ...item, 
              progress: payload.progress
            }
          }
          return item
        }),
        playing: {
          ...state.playing,
          progress: payload.progress,
        },
      }
    case 'NEXT':
      const next = state.playing.position + 1
      return {
        ...state,
        playing: {
          ...state.queue[next],
          isPlaying: true,
        }
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
  }

  return {
    ...state,
    ...actions,
  }
})