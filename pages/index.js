import React from 'react'
import Layout from '../components/layout'
import { MediaProvider } from '../components/Player/createMediaContext';
import { MediaFeed } from '../components/Player/MediaFeed';
import { useFeed } from '../components/hooks/useFeed';
import { Post } from '../components/Post';
import { MediaFloatingPlayer } from '../components/Player/MediaFloatingPlayer';
import { MediaQueue } from '../components/Player/MediaQueue';

export default function Page () {
  const { posts } = useFeed() 
  return (
    <Layout>
      <h1>FeedIt</h1>
      <MediaProvider list={posts}>
        <MediaFloatingPlayer />
        <MediaQueue className="divide-gray-400 divide-y" />
      </MediaProvider>
    </Layout>
  )
}