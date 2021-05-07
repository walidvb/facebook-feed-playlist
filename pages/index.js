import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import * as Facebook from 'fb-sdk-wrapper';
import { useSession } from 'next-auth/client';
import { MediaProvider } from '../components/Player/createMediaContext';
import Media from '../components/Player/MediaPlayer';

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

      const { data } = await Facebook.api('/me/posts?fields=attachments{description,title,unshimmed_url,media,subattachments},created_time')
      setPosts(data)
    })()
  }, [])
  return {
    posts,
  }
  
}

const Post = ({ post }) => {
  const { attachments: { data } } = post
  const firstAttachment = data[0]
  const { unshimmed_url, media }  = firstAttachment
  if(!media){
    console.log(firstAttachment)
    return null
  }
  const { image: { src } } = media
  return <Media url={unshimmed_url} image={src}/>
  return <div>
    {Object.entries(data[0]).map((e) => (
      <>
        <span>{e[0]}</span>
        <span>{e[1]}</span>
        </>
    ))}
    <br />
  </div>
}

export default function Page () {
  const { posts } = useFeed()
  return (
    <Layout>
      <h1>FeedIt</h1>
      <MediaProvider>
        {
          posts.map((post) => <Post post={post}/>)
        }
      </MediaProvider>
    </Layout>
  )
}