import Link from 'next/link';

import { getAllPosts } from '@/service/markdownData';

export default async function BlogHomepage() {
  const allpost = await getAllPosts();

  return (
    <>
      <h1>블로그 홈</h1>
      <ul>
        {allpost.map((post, i) => (
          <li key={i}>
            <Link href={post.slug}>
              <p>{post.title}</p>
              <p>
                {post.description.length > 30
                  ? `${post.description.slice(0, 30)}...`
                  : post.description}
              </p>
              <span>{post.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
