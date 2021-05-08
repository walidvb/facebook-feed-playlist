import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import * as Facebook from 'fb-sdk-wrapper';
import { useSession } from 'next-auth/client';
import { MediaProvider } from '../components/Player/createMediaContext';
import Media from '../components/Player/MediaPlayer';
import { MediaFeed } from '../components/Player/MediaFeed';
import { useWindowScroll } from 'react-use';
import ReactPlayer from 'react-player';
import { DateTime } from 'luxon'
const useFeed = () => {
  const [posts, setPosts] = useState([])
  const [fbLoaded, setfbLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [nextPage, setNextPage] = useState()

  const { y } = useWindowScroll()

  useEffect(() => {
    (async () => {
      await Facebook.load()
      await Facebook.init({
        appId: '926693044836109',
      });
      await Facebook.getLoginStatus()
      Facebook.login({
        scope: 'public_profile,email, user_posts',
        return_scopes: true
      })
      setfbLoaded(true)
      getPosts('/me/posts?fields=attachments{description,title,unshimmed_url,media,subattachments},created_time,message')
    })()
  }, [])
  
  const getPosts = async (url) => {
    setIsLoading(true)
    const { data, paging } = await Facebook.api(url)
    setNextPage(paging.next)
    setPosts(filterPosts(data))
    setIsLoading(false)
  }
  useEffect(() => {
    if ((y + 200 < document.body.clientHeight - window.innerHeight 
      || !fbLoaded)
    ) {
        return
      }
      if(isLoading || !nextPage){
        return
      }
      getPosts(nextPage)
  }, [y, fbLoaded])

  return {
    posts,
  }
  
}

const filterPosts = (posts) => posts.map((post) => {
  if(!post.attachments){
    return
  }
  const { attachments: { data }, created_time, message } = post
  const firstAttachment = data[0]
  const { unshimmed_url, media }  = firstAttachment
  if (!ReactPlayer.canPlay(unshimmed_url)){
    console.log('skipping', post)
    return null
  }
  const { image: { src } } = media
  return {
    metadata: {
      ...firstAttachment,
      createdAt: created_time, 
      message
    },
    media: {
      url: unshimmed_url,
      image_url: src
    }
  }
}).filter(Boolean)

const Post = ({ renderPlayer, metadata }) => {
  const { createdAt, message } = metadata
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' })
  return <div className="mb-8 pt-8">
    <div className="color-gray-700">
      {renderedDate}
    </div>
    <div className="mt-1 mb-4 text-lg">
      {message}
    </div>
    {renderPlayer()}
      <details>
      <summary>
        item
      </summary>
      {JSON.stringify(metadata)}
    </details>
  </div>
}

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