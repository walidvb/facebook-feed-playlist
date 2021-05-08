import React from 'react'
import Layout from '../components/layout'
import { MediaProvider } from '../components/Player/createMediaContext';
import { MediaFeed } from '../components/Player/MediaFeed';
import { useFeed } from '../components/hooks/useFeed';
import { Post } from '../components/Post';
import { MediaFloatingPlayer } from '../components/Player/MediaFloatingPlayer';
import { MediaQueue } from '../components/Player/MediaQueue';

const floatingClasses = "fixed bottom-0 max-h-72 z-10 bg-white overflow-y-auto"

export default function Page () {
  const { posts } = useFeed() 
  return (
    <Layout>
      <h1>FeedIt</h1>
      <MediaProvider list={posts}>
        <div className="flex gap-2 grid-cols-[auto,1fr] container mx-auto">
          <MediaQueue className="divide-gray-400 mr-4 divide-y flex-shrink" />
          <div>

            <MediaFloatingPlayer className="sticky top-0" />
          </div>
        </div>
      </MediaProvider>
    </Layout>
  )
}