import { Post } from '@/service/markdownData';

import MultiCarousel from './MultiCarousel';
import PostCard from './PostCard';
export default function PostCarousel({ posts }: { posts: Post[] }) {
  return (
    <>
      <MultiCarousel>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </MultiCarousel>
    </>
  );
}
