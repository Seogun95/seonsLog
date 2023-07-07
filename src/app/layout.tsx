import './globals.css';

import { Metadata } from 'next';
import localFont from 'next/font/local';

import { META } from '../constants/seo';

const myFont = localFont({
  src: './fonts/Maplestory-Light.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: META.TITLE,
    template: `%s | ${META.TITLE}`,
  },
  description: META.DESCRIPTION,
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/ko-KR',
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: META.TITLE,
    description: META.DESCRIPTION,
    type: 'website',
    url: META.PAGE_URL,
    images: [
      {
        url: META.THUMBNAIL_URL,
        width: 800,
        height: 600,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: META.TITLE,
    description: META.DESCRIPTION,
    images: [META.THUMBNAIL_URL],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={myFont.className}>
      <body>
        <section>{children}</section>
      </body>
    </html>
  );
}
