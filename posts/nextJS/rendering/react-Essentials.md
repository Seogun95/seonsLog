---
title: '클라이언트 컴포넌트
'
description: '클라이언트 컴포넌트는 브라우저에서 실행되는 컴포넌트로, 서버에서 프리렌더링된 HTML 파일을 받아와 클라이언트에게 전달받습니다. 클라이언트는 HTML 파일을 받은 후 클라이언트 컴포넌트를 하이드레이션하여 동적으로 상호작용하고 업데이트합니다.'
image: ''
tags:
  - 클라이언트컴포넌트
date: 2023-07-08 02:46:11
category: '렌더링'
---

# 클라이언트 컴포넌트

[공식 문서 - 클라이언트 컴포넌트](https://nextjs.org/docs/getting-started/react-essentials#client-components)

> 클라이언트 컴포넌트는 브라우저에서 실행되는 컴포넌트로, 서버에서 프리렌더링된
> HTML 파일을 받아와 클라이언트에게 전달받습니다. 클라이언트는 HTML 파일을 받은
> 후 클라이언트 컴포넌트를 하이드레이션하여 동적으로 상호작용하고
> 업데이트합니다.
>
> 이를 통해 초기 페이지 로딩 시간을 단축하고 사용자 경험을 향상시킬 수 있습니다.
> 클라이언트 컴포넌트는 서버 사이드 렌더링과 클라이언트 사이드 렌더링의 혼합된
> 방식으로 작동하며, 프리렌더링된 HTML을 기반으로 클라이언트에서 컴포넌트를
> 마운트하고 상호작용을 처리합니다. 이를 통해 초기 렌더링을 서버에서 처리하고,
> 그 이후의 업데이트는 클라이언트에서 수행함으로써 최적의 사용자 경험과 성능을
> 제공할 수 있습니다.

클라이언트 컴포넌트는 서버 컴포넌트와는 달리 브라우저에서 렌더링되고
`fetch`됩니다. 이는 사용자의 상호작용을 필요로 하는 경우에 주로 사용되며,
클라이언트에서 동작하기 때문에 브라우저에서 제공하는 API를 모두 사용할 수
있습니다.

클라이언트 컴포넌트는 동적인 데이터를 처리하거나, 상태 관리, 로컬 스토리지 조작
등의 작업을 수행하는 데 적합합니다.

## Next.js의 클라이언트 컴포넌트 작동 특징

1. 클라이언트 컴포넌트를 사용하려면 컴포넌트의 최상단에 `'use client'`를
   추가해야 합니다.
2. 클라이언트 컴포넌트에서는 브라우저에서 제공하는 API를 모두 사용할 수 있지만,
   Node.js API는 사용할 수 없습니다.
3. 클라이언트 컴포넌트는 JavaScript가 활성화된 클라이언트에서만 렌더링되며,
   사용자의 상호작용에 반응할 수 있습니다.

```tsx
// Counter 컴포넌트
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const onCounterUpHandler = () => {
    setCount(prev => prev + 1);
  };
  const onCounterMinusHandler = () => {
    setCount(prev => prev - 1);
  };
  return (
    <>
      <p>{count}</p>
      <button onClick={onCounterUpHandler}>+</button>
      <button onClick={onCounterMinusHandler}>-</button>
    </>
  );
}

// Home 컴포넌트
import Counter from '@/components/Counter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈 | 서근',
};

export default function Home() {
  console.log('안녕');
  return (
    <>
      <h1> 홈페이지다!</h1>
      <Counter />
    </>
  );
}
```

이처럼 클라이언트 컴포넌트는 사용자 인터페이스의 동적인 요소를 관리하는 데
사용됩니다.

![](https://i.imgur.com/sKuX4o8.png)
