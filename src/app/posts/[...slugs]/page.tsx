import { Metadata } from 'next';
import Image from 'next/image';
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
    redirect('/blog');
  }

  return (
    <>
      <div style={{ width: '100%', height: '300px', position: 'relative' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
        />
      </div>
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
