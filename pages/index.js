import React, { useState } from 'react'
import Layout from '../components/layout'

const useFeed = () => {
  const [posts, setPosts] = useState([])

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