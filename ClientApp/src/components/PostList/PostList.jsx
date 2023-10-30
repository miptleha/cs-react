import React from 'react';
import PostItem from '../PostItem/PostItem';

const PostList = ({ posts, showForm, setPost }) => {
  if (posts.length === 0) {
    return <h2>No Posts</h2>
  }

  return (
    <div>
      {posts.map(i =>
        <PostItem key={i.id} item={i} showForm={showForm} />
      )}
    </div>
  );
}

export default PostList;