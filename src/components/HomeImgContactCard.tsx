import Image from 'next/image';
import Link from 'next/link';

export default function HomeImgContactCard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-72 h-72">
        <Image src="/svg/logo/logo.svg" fill alt="메인 사진" />
      </div>
      <h4>Hello, there! I'm SEOGUN</h4>
      <Link href="/contact" className="px-4 py-1 mt-4 bg-yellow-600 rounded-xl">
        Contact Me
      </Link>
    </div>
  );
}
