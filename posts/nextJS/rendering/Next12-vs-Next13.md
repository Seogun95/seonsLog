---
title: 'Next 12 vs Next 13 렌더링 차이'
description:
  'NextJS 12에서는 페이지 전체가 동일한 렌더링 방식을 따르도록 설계되었습니다.'
image: ''
tags:
  - Next12
  - Next13
  - 서버컴포넌트
  - 클라이언트컴포넌트
date: 2023-07-08 02:46:11
category: '렌더링'
---

# Next 12 vs Next 13

![](https://i.imgur.com/GCPE7EY.png)

NextJS 12에서는 페이지 전체가 동일한 렌더링 방식을 따르도록 설계되었습니다. 즉,
`getStaticProps` 또는 `getServerSideProps` 메소드를 사용하여 각 페이지가 ISR,
SSG, 또는 SSR 중 어떤 방식을 사용할지 결정했습니다.

즉, 한 페이지가 전부 ISR 또는 SSG 또는 SSR 로 이루어 지게 됩니다.

하지만 NextJS 13에서는 이러한 방식이 크게 변화하였습니다. 이제는 각각의
컴포넌트를 독립적으로 설정할 수 있게 되었으며, 이를 통해 `Server Component`와
`Client Component`를 결정하게 됩니다.

쉽게 말해 어떤 컴포넌트는 정적인 렌더링 방식인 SSG를, 어떤 컴포넌트는 동적인
렌더링 방식인 SSR을 따르도록 설정할 수 있게 되었습니다.

## 서버 컴포넌트 vs 클라이언트 컴포넌트

- 서버 컴포넌트는 이름에서도 알 수 있듯이 서버에서 렌더링되고 `fetch`됩니다.
- 클라이언트 컴포넌트는 클라이언트(브라우저)에서 렌더링되고` fetch`됩니다.

![](https://i.imgur.com/tumBPqN.png)

위 이미지와 같이, Navbar는 서버 컴포넌트로 하고 그 안의 Search Input은
클라이언트 컴포넌트로 각각 다른 렌더링 설정을 할 수 있게 되었습니다.

### Server Component

서버 컴포넌트는 주로 정적인 데이터를 보여주는 경우나, 사용자와의 상호작용이
필요하지 않은 경우에 사용됩니다. 이런 컴포넌트들은 서버에서 미리 렌더링되어
사용자에게 전달되므로, 사용자 경험이 매끄럽고, 사이트의 성능 개선에도
기여합니다. NextJS 13에서는 기본적으로 모든 컴포넌트가 서버 컴포넌트로
작동합니다.

### Client Component

클라이언트 컴포넌트는 상호작용이 필요한 컴포넌트에서 주로 사용됩니다. 예를 들어,
입력 필드, 버튼, 슬라이더 등이 이에 해당합니다. 이런 컴포넌트들은 클라이언트에서
렌더링되고, 사용자와의 상호작용을 처리합니다.

클라이언트 컴포넌트를 선언하기 위해서는 컴포넌트의 최상단에 `'use client'` 를
작성하면 됩니다.

이렇게 선언된 컴포넌트들은 `onClick`과 같은 이벤트 핸들러, 그리고 `useState`,
`useEffect와` 같은 리액트 라이프사이클 훅을 포함할 수 있습니다.

따라서, 동적인 상호작용이 필요한 컴포넌트와 정적인 정보를 보여주는 컴포넌트를
분리하여 각각 클라이언트 컴포넌트와 서버 컴포넌트로 설정함으로써 페이지의 성능을
최적화하고 사용자 경험을 향상시킬 수 있습니다.

이를 통해 개발자들은 더 유연하게 애플리케이션의 렌더링 전략을 결정하고 관리할 수
있게 되었습니다.
