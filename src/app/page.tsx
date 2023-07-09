import { Metadata } from 'next';

import HomeImgContactCard from '@/components/HomeImgContactCard';
import HomeInfo from '@/components/HomeInfo';

export const metadata: Metadata = {
  title: '홈 | 서근',
};

export default function Home() {
  return (
    <section>
      <article className="flex flex-col w-full gap-8">
        <HomeImgContactCard />
        <HomeInfo />
      </article>
    </section>
  );
}
