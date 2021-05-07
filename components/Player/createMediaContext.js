
import { useReducer, useState } from 'react';
import fabricateContext from '../hooks/createContext';

const reducer = (state, { payload, type }) => {
  switch(type){
    case 'PLAY':
      return {
        ...state,
        playing: payload.media,
      }
    default:
      return state
  }
}

const initialState = {
  playing: {},
}

export const {
  Provider: MediaProvider,
  useContext: useMediaContext
} = fabricateContext(() => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log("state", state)
  const actions = {
    play: (media) => dispatch({ type: 'PLAY', payload: { media } })
  }

  return {
    ...state,
    ...actions,
  }
})