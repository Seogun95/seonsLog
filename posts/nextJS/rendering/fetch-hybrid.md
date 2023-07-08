---
title: 'fetch를 사용한 SSG, ISR, SSR'
description:
  'Next.js에서 fetch를 사용하여 SSG, ISR, SSR 의 형태로 하이브리드 렌더링을
  사용할 수 있습니다.'
image: ''
tags:
  - Fetch
  - SSG
  - ISR
  - SSR
date: 2023-07-08 02:46:11
category: '렌더링'
---

# fetch를 사용한 SSG, ISR, SSR

[공식 문서 - Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)

## fetch의 revalidate

Next.js에서 fetch를 사용하여 SSG, ISR, SSR 의 형태로 하이브리드 렌더링을 사용할
수 있습니다.

API를 사용하여 랜덤하게 바뀌는 문장을 response로 받아오는 상황을 가정해봅시다.
만약 `revalidate`를 사용하지 않고 빌드를 한다면, 페이지는 정적으로 생성되어
브라우저에 전송되기 때문에 시간이 지나도 한 번 정해진 데이터는 변하지 않습니다.

```tsx
import { getSettingMenus } from '@/service/settingMenu';
import axios from 'axios';
import Link from 'next/link';
import styles from '@/app/settings/page.module.css';

export default async function SettingHome() {
  const settings = await getSettingMenus();

  const response = await fetch('https://meowfacts.herokuapp.com')
    .then(res => res.json())
    .then(({ data }) => data[0]);

  return (
    <>
      <h1>설정</h1>
      <ul>
        {settings.map(({ id, menu_kr }) => (
          <li key={id}>
            <Link href={`/settings/${id}`}>{menu_kr}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <article className={styles.article}>{response}</article>
    </>
  );
}
```

만약 지정된 시간마다 데이터를 다시 가져와야 한다면, `revalidate`를 사용하여
Next.js에게 갱신 주기를 알려줄 수 있습니다.

첫 번째 방법) 3초마다 `revalidate` `next: { revalidate: 3 }`을 사용하여 3초마다
`revalidate`을 처리할 수 있습니다.

```tsx
const response = await fetch('https://meowfacts.herokuapp.com', {
  next: { revalidate: 3 },
})
  .then(res => res.json())
  .then(({ data }) => data[0]);
```

두 번째 방법) `cache` 옵션 사용 `cache` 옵션의 기본값은 `'force-cache'`입니다.
이렇게 하면 SSG 처럼 작동합니다.

```tsx
const response = await fetch('https://meowfacts.herokuapp.com', {
  cache: 'force-cache',
})
  .then(res => res.json())
  .then(({ data }) => data[0]);
```

![](https://i.imgur.com/iMe6zQT.png)

- `default`: 기본적인 브라우저 캐싱 규칙을 따릅니다. 브라우저가 요청과 응답을
  캐싱하는 방식을 자동으로 처리합니다.

- `force-cache` (SSG): 요청을 보낼 때 항상 캐시를 사용합니다. 브라우저 캐시에
  유효한 응답이 있는 경우 해당 응답을 반환하고, 캐시가 없는 경우에만 네트워크를
  통해 요청합니다.

- `no-cache`: 캐시된 응답을 사용하지 않고 항상 서버에 요청을 보냅니다. 서버는
  요청에 대한 응답을 캐시할 수 있지만, 응답을 캐시해도 브라우저는 캐시를
  사용하지 않고 서버로부터 새로운 응답을 받습니다.

- `no-store` (SSR): 요청과 응답을 캐시하지 않습니다. 매 요청마다 항상 네트워크를
  통해 데이터를 가져옵니다.

- `only-if-cached`: 오직 브라우저 캐시에서만 응답을 가져옵니다. 캐시에 저장된
  응답이 없는 경우, 네트워크 요청을 하지 않고 실패합니다.

- `reload`: 캐시된 응답을 무시하고 항상 서버로부터 새로운 응답을 가져옵니다.
  브라우저는 요청을 캐시하거나 캐시된 응답을 사용하지 않습니다.

### 노드 fetch랑 브라우저 fetch는 다른건가요?

Next.js 13에서는 Node.js의 `fetch`와 브라우저의 `fetch` API를 모두 사용할 수
있습니다.

Next.js는 fetch() 웹 API를 기반으로 한 데이터 가져오기 시스템을 제공하며, 서버
컴포넌트에서는 async/await를 사용합니다.

Next.js는 동일한 입력을 갖는 fetch 요청(`GET`)을 임시 캐시에 자동으로
저장합니다. 이 최적화를 통해 렌더링 과정 중에 동일한 데이터를 여러 번 가져오는
것을 방지할 수 있습니다.

주의 해야 할 점은 `POST` 요청은 자동으로 중복 제거되지 않습니다

![](https://i.imgur.com/R8QQkm9.png)

따라서, Next.js 13에서는 서버 컴포넌트에서도 fetch를 사용할 수 있으며,
클라이언트 측(브라우저)에서도 fetch를 사용할 수 있습니다. 이를 통해 서버와
클라이언트 모두에서 일관된 데이터 가져오기 기능을 활용할 수 있습니다.

- Next.js 13 Release Notes:
  [Next.js 13 Release Notes](https://nextjs.org/blog/next-13)
- Next.js Documentation:
  [Fetching Data](https://nextjs.org/docs/basic-features/data-fetching)
- MDN Web Docs:
  [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
