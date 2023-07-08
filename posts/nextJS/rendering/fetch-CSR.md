---
title: 'fetch를 사용한 CSR'
description:
  '한 페이지에서 데이터가 중요하지 않고 나중에 로드되어도 상관 없는 경우에는
  CSR(Client-Side Rendering)로 구현하는 것이 좋습니다.'
image: ''
tags:
  - CSR
  - Fetch
date: 2023-07-08 02:46:11
category: '렌더링'
---

# fetch를 사용한 CSR

한 페이지에서 데이터가 중요하지 않고 나중에 로드되어도 상관 없는 경우에는
CSR(Client-Side Rendering)로 구현하는 것이 좋습니다.

즉, 동적으로 자주 변경되는 데이터가 아니거나 중요하지 않은 경우에는 CSR을
사용하면 됩니다.

![](https://i.imgur.com/Gxcqwh3.png)

## CSR로 구현하는 방법

위의 컴포넌트는 기본적으로 SSR(Server-Side Rendering)로 작동하기 때문에 CSR로
작성할 부분을 클라이언트 컴포넌트로 리팩터링해야 합니다.

아래 코드는 RandomArticle 컴포넌트입니다. 이 컴포넌트는 text라는 상태를 가지고
있으며, 마운트될 때 useEffect를 사용하여 상태를 업데이트합니다.

```tsx
import { useEffect, useState } from 'react';
import styles from '@/components/(settings)/RandomArticle.module.css';

export default function RandomArticle() {
  const [text, setText] = useState('클라이언트 컴포넌트 데이터 로딩 중');

  useEffect(() => {
    fetch('https://meowfacts.herokuapp.com')
      .then(res => res.json())
      .then(({ data }) => setText(data[0]));
  }, []);

  return <article className={styles.article}>{text}</article>;
}
```

![](https://i.imgur.com/0hbEVXb.png)

`yarn build && yarn start`를 사용하여 페이지를 호출하면, 초기에 빌드된 HTML(정적
데이터)을 가져오고, CSR로 불러온 데이터는 다음과 같이 페이지 하단에서
렌더링됩니다.

![](https://i.imgur.com/nlsjmod.png)

![](https://i.imgur.com/3chT51F.gif)

위와 같이 Next.js는 컴포넌트를 탐색하여 가능한 많은 정적 데이터를 미리 HTML로
생성합니다. 클라이언트 컴포넌트의 경우, 필요한 코드를 클라이언트에 보내고
클라이언트에서 컴포넌트가 렌더링되면 하이드레이션(Hydration)이 발생하여
컴포넌트가 페인팅 작업을 수행합니다.

### SSG / ISR / SSR / CSR

- 서버 상에서 정적으로 생성되는 SSG
- 서버에서 주기적으로 업데이트되는 ISR
- 서버에서 요청시마다 생성되는 SSR
- 클라이언트에서 생성되는 CSR
