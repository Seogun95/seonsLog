---
title: 'Redirect'
description: ''
image:
  'Next.js는 특정 URL로 사용자를 리디렉션(이동)시키는 기능을 Next.js에서는
  Redirect API를 통해 제공합니다.'
tags:
  - redirect
  - router
date: 2023-07-08 02:26:16
category: '성능개선'
---

# Redirect

[공식 문서 - redirect](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)

사용자가 로그인하지 않고 로그인이 필요한 페이지에 접근했을 때나 검색 엔진이
사라진 페이지에 접근했을 때, 특정 URL로 사용자를 리디렉션(이동)시키는 기능을
Next.js에서는 Redirect API를 통해 제공합니다.

## 사용 방법

이 기능을 사용하려면 루트 경로의 `next.config.js` 파일에서 `async`를 포함하여
`redirects()` 함수를 정의하면 됩니다.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/settings/deleted_page',
        destination: '/settings',
        permanent: true,
      },
      {
        source: '/settings/block_page',
        destination: '/settings',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
```

위의 예시 코드에서 `redirects()` 함수는 배열 형태로 리디렉션 규칙을 반환합니다.
각 규칙은 `source`와 `destination`, 그리고 `permanent` 프로퍼티로 구성됩니다.

- `source`: 원래의 URL 경로를 나타냅니다.
- `destination`: 리디렉션 후 이동할 URL 경로를 나타냅니다.
- `permanent`: 리디렉션의 유형을 나타내며, `true`이면 영구 리디렉션(301
  Redirect)을 의미하고, `false`이면 일시적인 리디렉션(302 Redirect)을
  의미합니다.

`permanent` 프로퍼티가 `true`인 경우, 영구 리디렉션이므로 브라우저나 검색 엔진은
해당 URL로 접근 시 항상 리디렉션됩니다. 반면에 `permanent` 프로퍼티가 `false`인
경우, 일시적인 리디렉션이므로 브라우저나 검색 엔진은 해당 URL로 접근 시 임시로
리디렉션되며, 나중에 다시 원래의 URL로 돌아갈 수 있습니다.

위의 예시 코드에서는 `/settings/deleted_page` 경로로 접근 시 `/settings`로 영구
리디렉션되고, `/settings/block_page` 경로로 접근 시 `/settings`로 일시적인
리디렉션됩니다.

> **참고:** 영구 리디렉션(permanent)은 301 Redirect로, 일시적인 리디렉션은 302
> Redirect로 알려져 있습니다. 리디렉션의 유형에 따라 브라우저와 검색 엔진은
> 다르게 처리할 수 있습니다.

![](https://i.imgur.com/T29k4qp.gif)

## 동적으로 Redirect

위의 예시에서는 `next.config.js` 파일에 리디렉션을 설정하는 방법입니다.

동적으로 리디렉션을 설정하는 방법에는 두 가지가 있습니다.

### redirect()

`next/router` 모듈에 있는 `redirect` 함수를 사용할 수 있습니다.

```jsx
if (!settingMenu) {
  redirect('/');
}
```

### router.push

`useRouter` 훅을 사용하여 `router.push` 메소드를 사용하여 리디렉션을 설정할 수
있습니다.

```jsx
import { useRouter } from 'next/router';

export default function RedirectBtn() {
  const router = useRouter();

  const backTo = () => {
    router.back();
  };

  const goSettings = () => {
    router.push('/settings');
  };

  return (
    <div>
      <button onClick={backTo}>Go Back</button>
      <button onClick={goSettings}>Go to Settings</button>
    </div>
  );
}
```

주의할 점은 Next.js에서 서버 측에서는 `onClick` 이벤트를 사용할 수 없으므로
반드시 클라이언트 측 컴포넌트로 생성하여 import 해야 합니다.

뒤로 가기를 위해서는 `router.back()` 메소드를 사용할 수 있고, 특정 경로로
이동하기 위해서는 `router.push()` 메소드를 사용하면 됩니다.
