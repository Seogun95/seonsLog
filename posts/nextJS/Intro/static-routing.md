---
title: '정적 라우팅'
description:
  'Next.js에서 정적 라우팅은 사전에 미리 정의된 경로에 대해 라우팅하는 방식을
  말합니다'
image: ''
tags:
  - static
  - routing
  - 라우팅
  - 정적
date: 2023-07-08 02:34:38
category: '입문'
---

# 정적 라우팅 ( Static Routing )

[공식 사이트 - 라우팅](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)

Next.js에서 정적 라우팅은 사전에 미리 정의된 경로에 대해 라우팅하는 방식을
말합니다. 정적 라우팅은 빌드 시점에 페이지를 생성하고 서버에 사전에 준비된 정적
파일을 제공함으로써 빠른 성능과 확장성을 제공합니다.

## Next.js 12

### 라우팅

Next.js 12 버전에서는 `pages` 폴더 내부에 `.tsx` 파일을 생성하면 해당 파일이
자동으로 라우트로 등록됩니다.

### 중첩 라우팅

만약 중첩 라우팅이 필요한 경우, `pages` 폴더 내부에 하위 폴더를 생성하고
`index.tsx` 파일을 생성합니다.

```
📦 pages
 ┣ 📂 info
 ┃ ┣ 📜 index.tsx
 ┃ ┗ 📜 mypage.tsx
 ┗ 📜 about.tsx
```

위와 같이 폴더 구조를 작성하면, `/info` 경로로 접근하면 `info/index.tsx` 파일이,
`/info/mypage` 경로로 접근하면 `info/mypage.tsx` 파일이 매핑됩니다.

## Next.js 13

### 라우팅

Next.js 13 버전에서는 폴더 및 파일 기반의 라우팅이 도입되었습니다. `app` 폴더
내에 원하는 경로의 폴더를 생성하고 그 안에 `page.tsx` 파일을 생성합니다.

### 중첩 라우팅

중첩 라우팅이 필요한 경우, `app` 폴더 내부에 라우팅 경로를 나타내는 폴더를
생성하고, 그 안에 중첩될 라우팅 경로를 나타내는 폴더를 생성하고 `page.tsx`
파일을 생성합니다.

```
📦 app
 ┣ 📂 about
 ┃ ┗ 📜 page.tsx
 ┣ 📂 info
 ┃ ┣ 📂 mypage
 ┃ ┃ ┗ 📜 page.tsx
 ┃ ┗ 📜 page.tsx
 ┣ 📜 favicon.ico
 ┣ 📜 globals.css
 ┣ 📜 layout.tsx
 ┗ 📜 page.tsx
```

위와 같이 폴더 구조를 작성하면, `/about` 경로로 접근하면 `app/about/page.tsx`
파일이, `/info` 경로로 접근하면 `app/info/page.tsx` 파일이, `/info/mypage`
경로로 접근하면 `app/info/mypage/page.tsx` 파일이 매핑됩니다.
