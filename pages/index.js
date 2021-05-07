import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import * as Facebook from 'fb-sdk-wrapper';
import { useSession } from 'next-auth/client';
import { MediaProvider } from '../components/Player/createMediaContext';
import Media from '../components/Player/MediaPlayer';
import { MediaFeed } from '../components/Player/MediaFeed';

const useFeed = () => {
  const [posts, setPosts] = useState([])
  const session = useSession()
  useEffect(() => {
    (async () => {
      await Facebook.load()
      await Facebook.init({
        appId: '926693044836109',
      });
      await Facebook.getLoginStatus()
      Facebook.login({
        scope: 'public_profile,email',
        return_scopes: true
      })

      const { data } = await Facebook.api('/me/posts?fields=attachments{description,title,unshimmed_url,media,subattachments},created_time,message')
      setPosts(data)
    })()
  }, [])
  return {
    posts,
  }
  
}

const filterPosts = (posts) => posts.map((post) => {
  const { attachments: { data } } = post
  const firstAttachment = data[0]
  const { unshimmed_url, media }  = firstAttachment
  if(!media){
    console.log('skipping', post)
    return null
  }
  const { image: { src } } = media
  return {
    metadata: {
      ...firstAttachment,
      createdAt: post.created_time,
    },
    media: {
      url: unshimmed_url,
      image_url: src
    }
  }
}).filter(Boolean)

const Post = ({ renderPlayer, metadata }) => {
  const { createdAt, message } = metadata
  return <div>
    {createdAt}
    {message}
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
  const list = filterPosts(posts)
  return (
    <Layout>
      <h1>FeedIt</h1>
      <MediaProvider list={list}>
        <MediaFeed renderMedia={({ renderPlayer, metadata }) => <Post renderPlayer={renderPlayer} metadata={metadata}/>}/>
      </MediaProvider>
    </Layout>
  )
}