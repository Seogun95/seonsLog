import { Post } from '@/service/markdownData';

import PostCard from './PostCard';

export default function PostCardList({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </ul>
  );
}
