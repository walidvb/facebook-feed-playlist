import { useEffect, useState } from 'react';
import * as Facebook from 'fb-sdk-wrapper';
import { useWindowScroll } from 'react-use';
import ReactPlayer from 'react-player';
import { useSession } from 'next-auth/client';

const filterPosts = (posts) => posts.map((post) => {
  if (!post.attachments) {
    return
  }
  const { attachments: { data }, created_time, message } = post
  const firstAttachment = data[0]
  const { unshimmed_url, media, title, description } = firstAttachment
  if (!ReactPlayer.canPlay(unshimmed_url)) {
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
      image_url: src,
      title,
      description
    }
  }
}).filter(Boolean)

export const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [fbLoaded, setfbLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fbSession, setFbSession] = useState()
  
  const [nextPage, setNextPage] = useState();

  const { y } = useWindowScroll();

  useEffect(() => {
    (async () => {
      await Facebook.load();
      await Facebook.init({ appId: 926693044836109 });
      console.log('app initid')
      const s = await Facebook.getLoginStatus();
      console.log('current status: ', s)
      setFbSession(s.authResponse)
      if(!s.status !== 'connected'){
        Facebook.login({
          scope: 'public_profile,email,user_posts',
          return_scopes: true
        }).then((res) => {
          console.log('logged in status: ')
          setfbLoaded(true);
          getPosts('/me/posts?fields=attachments{description,title,unshimmed_url,media,subattachments},created_time,message', {
            accessToken: s.authResponse.accessToken
          });
        })
      }else{
        getPosts('/me/posts?fields=attachments{description,title,unshimmed_url,media,subattachments},created_time,message', {
          accessToken: s.authResponse.accessToken
        });
      }
      })();
  }, []);

  const getPosts = async (url, params = fbSession) => {
    setIsLoading(true);
    const { data, paging, ...ap } = await Facebook.api(url, params);
    setIsLoading(false);
    if(!paging){
      console.error("Couldn't fetch", { data, paging, ...ap})
      return
    }
    setNextPage(paging.next);
    setPosts(filterPosts(data));
  };
  useEffect(() => {
    if ((y + 200 < document.body.clientHeight - window.innerHeight
      || !fbLoaded)) {
      return;
    }
    if (isLoading || !nextPage) {
      return;
    }
    getPosts(nextPage);
  }, [y, fbLoaded]);

  return {
    isLoading: !fbLoaded,
    isLoggedIn: Boolean(fbSession),
    posts,
  };
};
