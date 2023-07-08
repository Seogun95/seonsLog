---
title: 'Rewrite'
description: 'rewriteAPI는 소스 URL을 다른 URL 경로로 매핑하는 기능입니다.'
image: ''
tags:
  - rewrite
  - Configuration
date: 2023-07-08 02:26:16
category: '성능개선'
---

# Rewrite

[공식 문서 - rewrite](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites)

`rewriteAPI`는 소스 URL을 다른 URL 경로로 매핑하는 기능입니다. 이를 통해
프로젝트 내에서 숨겨야 하는 키(key)나 경로(path)를 다른 문자열로 변경하여
보안성을 높일 수 있으며, 긴 경로를 짧은 URL로 대체할 수도 있습니다.

rewrite는 URL 프록시로 동작하여 대상 경로를 감추고, 사용자가 사이트에서 위치를
변경한 것처럼 보이지 않게 만듭니다. 반면, redirect는 새로운 페이지로 경로를
변경하여 URL 변경을 보여줍니다.

```
📦app
 ┣ 📂test
 ┃ ┗ 📂about
 ┃ ┃ ┗ 📂seogun
 ┃ ┃ ┃ ┗ 📜page.tsx
```

위와 같이 복잡한 경로를 `http://localhost:3000/test/about/seogun` 대신
`http://localhost:3000/seogun`으로 접근할 수 있게 됩니다.

## 사용 방법

이 기능을 사용하기 위해서는 루트 경로의 `next.config.js` 파일에서 `async`를
사용하여 `rewrite()` 함수를 정의해야 합니다.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/seogun',
        destination: '/test/about/seogun',
      },
      {
        source: '/item/:slug',
        destination: '/settings/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
```

`redirects()` 는 source와 destination 속성을 가진 객체를 포함하는 배열 또는 객체
배열을 반환하는 비동기 함수입니다. 각 객체는 다음과 같은 속성을 가지고 있습니다:

- `source`: 들어오는 요청 경로 패턴을 나타냅니다.
- `destination`: 경로를 변경하여 이동할 대상 경로를 나타냅니다.
- `basePath`: false 또는 undefined - false이면 basePath는 일치하는 경우
  basePath가 포함되지 않으며, 외부 redirects에 사용할 수 있습니다.
- `locale`: false 또는 undefined - 로컬이 일치하는 경우 로컬이 포함되지 않아야
  하는지 여부를 나타냅니다.
- `has`: type, key 및 value 속성을 가진 has 객체의 배열입니다.
- `missing`: type, key 및 value 속성을 가진 missing 객체의 배열입니다.

위 예시에서는 `/seogun` 경로를 `/test/about/seogun`으로, `/item/:slug` 경로를
`/settings/:slug`로 변경하는 설정이 포함되어 있습니다.

![Rewrite Example](https://i.imgur.com/g7gk48u.gif)

![Rewrite Configuration](https://i.imgur.com/KZLvhCS.png)
