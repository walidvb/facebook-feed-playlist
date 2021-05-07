
import { useReducer, useState, useEffect } from 'react';
import fabricateContext from '../hooks/createContext';

const reducer = (state, { payload, type } = {}) => {
  switch(type){
    case 'NEW_LIST':
      return {
        ...state,
        queue: payload.map((m, i) => ({ ...m, position: i }))
      }
    case 'PLAY':
      return {
        ...state,
        playing: {
          ...payload.media,
          isPlaying: true,
        },
      }
    case 'PAUSE':
      return {
        ...state,
        playing: {
          ...payload.media,
          isPlaying: false,
        },
      }
    case 'NEXT':
      const next = state.playing.position + 1
      return {
        ...state,
        playing: state.queue[next]
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
    play: (media) => dispatch({ type: 'PLAY', payload: { media } }),
    next: () => dispatch({ type: 'NEXT' }),
    
  }

  return {
    ...state,
    ...actions,
  }
})