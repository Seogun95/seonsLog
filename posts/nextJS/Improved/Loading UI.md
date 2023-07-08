---
title: 'Loading UI'
description:
  '로딩 UI는 해당 경로의 페이지 UI가 준비되기 전에 사용자에게 로딩 중임을
  나타내기 위한 UI 컴포넌트입니다.'
image: ''
tags:
  - Loading
  - Suspense
  - 성능최적화
date: 2023-07-08 02:26:16
category: '성능개선'
---

# 로딩 UI

[공식 문서 - 로딩 UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

![](https://i.imgur.com/OVczSbR.png)

로딩 UI는 해당 경로의 페이지 UI가 준비되기 전에 사용자에게 로딩 중임을 나타내기
위한 UI 컴포넌트입니다. 이를 사용하면 React의 suspense boundary와 동일한 기능을
자동으로 사용할 수 있습니다.

## 구현 방법

로딩 UI를 생성하고 싶은 경로 폴더 내에 `loading.tsx` 파일을 생성합니다.

![](https://i.imgur.com/OxgOkQT.png)

```tsx
export default function SettingsLoading() {
  return <h1>로딩중...✨</h1>;
}
```

![](https://i.imgur.com/DYSX5Ak.gif)

로딩 UI를 사용하면 `settings` 폴더 내에서 자동으로 레이아웃 안에
`children`이라는 자식 컴포넌트를 suspense로 감싸게 됩니다. 레이아웃은 정적으로
표시되지만 그 안의 컴포넌트는 페이지가 준비되기 전에 로딩 컴포넌트로 보여지며,
데이터가 로드되면 준비된 컴포넌트를 보여주는 방식입니다.

![](https://i.imgur.com/nyJlubx.png)

Next.js는 실제로 아래와 같은 작동 방식을 제공합니다.

![](https://i.imgur.com/c2QxnLD.png)

작동 원리는 Suspense로 감싸진 Page 컴포넌트의 데이터가 준비되기 전에
fallback으로 지정한 Loading 컴포넌트를 먼저 보여준다는 의미입니다.

### 한계점

만약 loading.tsx 파일을 라우트의 최상위 경로에서 사용한다면, Layout의 children
전체를 묶어서 한 번만 로딩 UI를 보여주기 때문에, Page 컴포넌트가 무거운 작업을
수행한다고 해도 단 한 번만 실행됩니다.

이를 해결하기 위해서는 병렬적으로 수행해야 합니다. 이렇게 하면 페이지가 준비될
때 순차적으로 데이터를 패칭하는 것이 아니라, 병렬적으로 처리되기 때문에 페이지가
준비되는 시간이 훨씬 줄어들게 됩니다.

### 병렬 수행

![](https://i.imgur.com/pAICYNO.png)

병렬 처리하는 대표적인 방법은 Promise.all API를 사용하는 것입니다.

![](https://i.imgur.com/TrPYMNF.png)

만약 artistData와 albumsData에 await를 넣어준다면 해당 함수가 처리되기 전까지
함수가 멈추기 때문에, 변수마다 await를 넣어주는 것이 아니라 병렬 처리되는 부분에
await와 Promise.all API를 사용하는 것이 좋습니다.

하지만 이것도 문제점이 존재합니다. 네트워크 요청을 하는데 시간은 줄일 수 있지만,
이렇게 하면 사용자가 의미있는 로딩을 볼 수 없습니다. 왜냐하면 병렬적으로
처리되어 처리가 되기 전까지 아무런 UI를 볼 수 없기 때문입니다.

이때 사용하는 것이 suspense 바운더리입니다.

### 병렬 수행 Suspense 바운더리

병렬 처리로 두 개의 데이터를 모두 받아오는 것이 아니라, artist를 먼저 await로
받아온 뒤에 Suspense API로 감싸서 albums의 데이터가 받아오기 전에 의미있는
로딩을 보여준 뒤에 albumsData를 받아올 수 있습니다.

이런 식으로 중요한 데이터를 먼저 await로 보여준 뒤에, 부가적인 데이터를
Suspense로 묶어 보여주면 더 의미있는 UI를 만들 수 있게 됩니다.

![](https://i.imgur.com/JUZSRRy.png)

### 주의 사항

주의해야 할 점은 `yarn dev` 명령은 SSR(서버 사이드 렌더링)과 유사하게 작동한다는
것입니다. 동적으로 SSR을 수행해야 할 때 내부 컴포넌트를 **병렬적으로** 표시해야
하는 경우 로딩 UI를 사용하는 것이 의미가 있지만, 서버에서 완전한 SSG(정적 사이트
생성)로 렌더링되는 경우 로딩 UI는 의미가 없습니다.
