import './globals.css';
import { Nanum_Gothic, Open_Sans } from 'next/font/google';
import { Metadata } from 'next';
import { META } from '../constants/seo';
import localFont from 'next/font/local';

//sans는 variable fonts이기때문에 font-weight 설정 필요 없음
const sans = Open_Sans({ subsets: ['latin'] });
//나눔고딕은 variable fonts가 아니기때문에 font-weight 설정 필요
const gothic = Nanum_Gothic({
  weight: '700',
  subsets: ['latin'],
});

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
