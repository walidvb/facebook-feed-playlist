
import { useReducer, useState, useEffect } from 'react';
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
          ...payload.item,
          isPlaying: false,
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
  }

  return {
    ...state,
    ...actions,
  }
})