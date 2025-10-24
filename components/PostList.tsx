
import React from 'react';
import { Post, User } from '../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  currentUser: User;
}

const PostList: React.FC<PostListProps> = ({ posts, currentUser }) => {
  return (
    <div className="space-y-8">
      {posts.map(post => (
        <PostCard key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default PostList;
