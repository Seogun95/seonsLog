/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LogoImg() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <style jsx>{`
        .hover {
          content: url('/svg/logo/logo_hover.svg');
        }
        .active {
          content: url('/svg/logo/logo_active.svg');
        }
      `}</style>
      <Link
        href={'/'}
        className="flex items-center gap-1 text-xl font-bold"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        <img
          src="/svg/logo/logo.svg"
          alt="로고"
          width={30}
          height={30}
          className={`${isHovered ? 'hover' : ''} ${
            isActive ? 'active' : ''
          }  invert`}
        />
        서근 블로그
      </Link>
    </>
  );
}
