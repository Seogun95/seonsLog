import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/service/markdownData';

interface ICardProps {
  post: Post;
}
export default function PostCard({
  post: { slug, image, title, description, date },
}: ICardProps) {
  return (
    <li className="w-full rounded-md">
      <Link href={slug}>
        <article className="flex flex-col h-full overflow-hidden duration-150 ease-linear rounded-lg shadow-lg bg-zinc-700 hover:-translate-y-1">
          <div className="relative w-full h-36">
            <Image src={image} fill alt={title} />
          </div>
          <div className="flex flex-col p-3 grow">
            <h3 className="text-base font-bold text-left whitespace-pre">
              {title}
            </h3>
            <p className="w-full text-sm truncate opacity-75">{description}</p>
            <p className="self-end pt-3 mt-auto">
              <time className="p-1 text-xs rounded-md bg-zinc-800 opacity-80">
                {date}
              </time>
            </p>
          </div>
        </article>
      </Link>
    </li>
  );
}
