import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { getAllPosts } from '@/service/markdownData';

interface SlugProps {
  params: {
    slugs: string[];
  };
}

export default async function BlogDetailPg({ params: { slugs } }: SlugProps) {
  const slug = `/posts/${[...slugs].join('/')}`;
  const post = getAllPosts().find(post => {
    return post.slug.toLowerCase() === slug.toLowerCase();
  });
  if (!post) {
    redirect('/');
  }

  return (
    <>
      <h1>{post.slug}</h1>
      <h1>{post.category}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </>
  );
}

export const generateMetadata = async ({
  params: { slugs },
}: SlugProps): Promise<Metadata> => {
  return {
    title: `${slugs.pop()} | 서근`,
    description: `${slugs.slice(1, 2)} 페이지 입니다.`,
  };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const getParams = posts.map(item => item.slug.split('/').slice(2, 5));

  return getParams.map(item => ({ slugs: item }));
}
