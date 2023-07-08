import Link from 'next/link';

import { getAllPosts, Post } from '@/service/markdownData';

interface CategorizedPosts {
  [category: string]: Post[];
}

export default async function BlogHomepage() {
  const allpost = await getAllPosts();
  const categorizedPosts: CategorizedPosts = allpost.reduce(
    (acc: CategorizedPosts, post: Post) => {
      if (!acc[post.category]) {
        acc[post.category] = [];
      }
      acc[post.category].push(post);
      return acc;
    },
    // eslint-disable-next-line comma-dangle
    {},
  );

  return (
    <>
      <h1>블로그 홈</h1>
      {/* category별로 나눠서 JSX에 나타냄 */}
      {Object.entries(categorizedPosts).map(([category, posts]) => (
        <>
          <div key={category}>
            <h2>{category}</h2>
            <span>{posts.length}</span>
            <ul>
              {posts.map((post, i) => (
                <li key={i}>
                  <Link href={post.slug}>
                    <p>{post.title}</p>
                    <p>
                      {post.description.length > 50
                        ? `${post.description.slice(0, 50)}...`
                        : post.description}
                    </p>
                    <span>{post.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <hr />
        </>
      ))}
    </>
  );
}
