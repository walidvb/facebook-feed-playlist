import React from 'react'
import Layout from '../components/layout'
import { MediaProvider, useMediaContext } from '../components/Player/createMediaContext';
import { MediaFeed } from '../components/Player/MediaFeed';
import { useFeed } from '../components/hooks/useFeed';
import { Post } from '../components/Post';
import { MediaFloatingPlayer } from '../components/Player/MediaFloatingPlayer';
import { MediaQueue } from '../components/Player/MediaQueue';
import { useSession, signIn } from 'next-auth/client';
import { DateTime } from 'luxon';

const floatingClasses = "fixed bottom-0 max-h-72 z-10 bg-white overflow-y-auto"


const Details = () =>{
  const { playing } = useMediaContext()
  if(!playing.metadata){
    return null
  }
  const { metadata: { createdAt } } = playing
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' });
  return <div>
    <div className="italics text-gray-600">{renderedDate}</div>
    {playing.metadata.message}
  </div>
}

export default function Page () {
  const { posts } = useFeed()
  const [session, ] = useSession()

  if(!session){
    return <Layout>
      <button onClick={() => signIn()}>Sign in</button>
    </Layout>
  }
  return (
    <Layout>
      <h1>FeedIt</h1>
      <MediaProvider list={posts}>
        <div className="flex gap-2 grid-cols-[auto,1fr] container mx-auto">
          <MediaQueue className="divide-gray-400 mr-4 divide-y flex-shrink" />
          <div>
            <div className="sticky top-0">

              <MediaFloatingPlayer />
              <Details />
            </div>
          </div>
        </div>
      </MediaProvider>
    </Layout>
  )
}