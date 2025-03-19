"use client";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/post";
import { useOptimistic } from "react";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updatePostOptimistically] = useOptimistic(
    posts,
    (prevPosts, postId) => {
      const selectedPostIndex = prevPosts.findIndex(
        (post) => post.id === postId
      );

      if (selectedPostIndex === -1) {
        return prevPosts;
      }

      const selectedPost = { ...prevPosts[selectedPostIndex] };
      selectedPost.isLiked = !selectedPost.isLiked;
      selectedPost.likes = selectedPost.likes + (selectedPost.isLiked ? -1 : 1);
      
      const updatedPosts = [...prevPosts];
      updatedPosts[selectedPostIndex] = selectedPost;
     
      return updatedPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePosts(postId) {
    updatePostOptimistically(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePosts} />
        </li>
      ))}
    </ul>
  );
}
