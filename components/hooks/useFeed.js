import { useEffect, useState } from 'react';
import * as Facebook from 'fb-sdk-wrapper';
import { useWindowScroll } from 'react-use';
import ReactPlayer from 'react-player';

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

  const [nextPage, setNextPage] = useState();

  const { y } = useWindowScroll();

  useEffect(() => {
    (async () => {
      await Facebook.load();
      await Facebook.init({
        appId: '926693044836109',
      });
      await Facebook.getLoginStatus();
      Facebook.login({
        scope: 'public_profile,email, user_posts',
        return_scopes: true
      });
      setfbLoaded(true);
      getPosts('/me/posts?fields=attachments{description,title,unshimmed_url,media,subattachments},created_time,message');
    })();
  }, []);

  const getPosts = async (url) => {
    setIsLoading(true);
    const { data, paging } = await Facebook.api(url);
    setNextPage(paging.next);
    setPosts(filterPosts(data));
    setIsLoading(false);
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
    posts,
  };
};
