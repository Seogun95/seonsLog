'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routePath } from '@/constants/routes';

import LogoImg from './LogoImg';
export default function Header() {
  const navigation = usePathname();

  return (
    <>
      <header className="sticky top-0 left-0 z-50 flex items-center justify-between w-screen backdrop-blur-sm bg-black/30">
        <nav className="flex items-center justify-start w-full max-w-5xl gap-5 p-5 h-14">
          <LogoImg />
          {routePath.map(({ id, menu_kr, slug }) => (
            <Link
              key={id}
              href={slug}
              className={`${
                navigation?.includes(slug) ? 'text-red-500' : ''
              }  ease-in-out duration-200`}
            >
              {menu_kr}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
