import { CategorizedPosts } from '@/service/markdownData';

import PostCardList from './PostCardList';
import PostCarousel from './PostCarousel';

interface IPostTempProps {
  type: 'list' | 'carousel';
  categoryData: CategorizedPosts;
}

export default function PostSectionTemp({
  type,
  categoryData,
}: IPostTempProps) {
  return (
    <>
      {/* category별로 나눠서 JSX에 나타냄 */}
      {Object.entries(categoryData).map(([category, posts]) => (
        <>
          <article className="grid my-8" key={category}>
            <h2 className="w-full px-3 mb-4 bg-zinc-800">
              {category.split('/')[1]}({posts.length})
            </h2>
            {type === 'list' && <PostCardList posts={posts} />}
            {type === 'carousel' && <PostCarousel posts={posts} />}
          </article>
        </>
      ))}
    </>
  );
}
