import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '블로그',
  description: '블로그 페이지 입니다.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article>{children}</article>;
}
