import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import * as Facebook from 'fb-sdk-wrapper';
import { useSession } from 'next-auth/client';

const useFeed = () => {
  const [posts, setPosts] = useState([])
  const session = useSession()
  useEffect(() => {
    (async () => {
      await Facebook.load()
      await Facebook.init({
        appId: '926693044836109',
      });
      const { authResponse: { accessToken } } = await Facebook.getLoginStatus()
      console.log(accessToken)
      console.log('asda')
      Facebook.login({
        scope: 'public_profile,email',
        return_scopes: true
      }).then(() => {
        console.log('logged in')
      });

      const { data } = await Facebook.api('/me/posts')
      console.log("d",data)
      setPosts(data)
    })()
  }, [])
  return {
    posts,
  }
  
}

const Post = ({ post }) => {
  return <div>
    {Object.entries(post).map((e) => (
      <>
        <span>{e[0]}</span>
        <span>{e[1]}</span>
        </>
    ))}
  </div>
}

export default function Page () {
  const { posts } = useFeed()
  return (
    <Layout>
      <h1>FeedIt</h1>
      {
        posts.map((p) => <Post post={post}/>)
      }
    </Layout>
  )
}