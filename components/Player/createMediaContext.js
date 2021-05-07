
import { useState } from 'react';
import fabricateContext from '../hooks/createContext';

export const {
  Provider: MediaProvider,
  useContext: useMediaContext
} = fabricateContext(() => {
  const [nowPlaying, setNowPlaying] = useState()
  return {
    nowPlaying,
    setNowPlaying
  }
})