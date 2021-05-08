import React from 'react'
import Layout from '../components/layout'
import { useSession } from 'next-auth/client';
import { MediaProvider } from '../components/Player/createMediaContext';
import Media from '../components/Player/MediaPlayer';
import { MediaFeed } from '../components/Player/MediaFeed';
import ReactPlayer from 'react-player';
import { useFeed } from '../components/hooks/useFeed';
import { Post } from '../components/Post';

export default function Page () {
  const { posts } = useFeed()
  return (
    <Layout>
      <h1>FeedIt</h1>
      <MediaProvider list={posts}>
        <MediaFeed
          RenderMedia={Post}
          className="divide-gray-400 divide-y"
        />
      </MediaProvider>
    </Layout>
  )
}