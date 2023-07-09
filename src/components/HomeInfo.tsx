'use client';

import { useToggle } from '@/hooks/useShowIcon';

export default function HomeInfo() {
  const [icon, toggleIcon] = useToggle({
    nickname: true,
    job: true,
    location: true,
  });

  const getNicknameText = () => (icon.nickname ? '🙋🏻‍♂️' : '서근');
  const getJobText = () => (icon.job ? '✨' : 'Frontend Junior Developer');
  const getLocationText = () => (icon.location ? '🗺️' : '대전');

  return (
    <>
      <style jsx>{`
        button {
          color: rgb(59, 130, 246);
        }
      `}</style>
      <div className="text-2xl text-b">
        <button onClick={() => toggleIcon('nickname')}>
          {getNicknameText()}
        </button>
        은 <button onClick={() => toggleIcon('job')}>{getJobText()}</button>{' '}
        입니다. 저는{' '}
        <button onClick={() => toggleIcon('location')}>
          {getLocationText()}
        </button>
        에서 활동하며, 신입 SW 개발자로써 다양한 코드 분석과 구조를 이해하며
        배우고, 문제에 직면하면 기록하고 해결책을 찾아갑니다.
      </div>
    </>
  );
}
