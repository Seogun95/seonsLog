
서버 컴포넌트와 클라이언트 컴포넌트의 동작 원리를 이해하려면 먼저 `yarn build` 과정을 살펴보는 것이 좋습니다. 각 파일 및 컴포넌트는 다음과 같이 구성되어 있습니다.

```
📦src  
 ┣ 📂app  
 ┃ ┣ 📂about  
 ┃ ┃ ┗ 📜page.tsx  
 ┃ ┣ 📂settings  
 ┃ ┃ ┣ 📂(common)  
 ┃ ┃ ┃ ┗ 📜category.tsx  
 ┃ ┃ ┣ 📂[slug]  
 ┃ ┃ ┃ ┗ 📜page.tsx  
 ┃ ┃ ┣ 📂mypage  
 ┃ ┃ ┃ ┗ 📜page.tsx  
 ┃ ┃ ┣ 📜layout.tsx  
 ┃ ┃ ┗ 📜page.tsx  
 ┃ ┣ 📜favicon.ico  
 ┃ ┣ 📜globals.css  
 ┃ ┣ 📜layout.module.css  
 ┃ ┣ 📜layout.tsx  
 ┃ ┣ 📜not-found.tsx  
 ┃ ┗ 📜page.tsx  
 ┣ 📂components  
 ┃ ┣ 📂(layout)  
 ┃ ┃ ┗ 📜Navigation.tsx  
 ┃ ┗ 📜Counter.tsx  
 ┣ 📂pages  
 ┃ ┗ 📂api  
 ┃ ┃ ┗ 📜hello.ts  
```

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

![](https://i.imgur.com/BWIXwWX.png)
## 클라이언트 컴포넌트 렌더링

빌드가 완료되면, 일부 컴포넌트는 정적 요소들이 HTML에 포함되어 렌더링됩니다. 즉, 클라이언트 컴포넌트가 항상 클라이언트 사이드에서 렌더링되는 것이 아니라, 사용자의 이벤트나 브라우저에서 실행되어야 하는 코드를 포함하는 컴포넌트를 클라이언트 컴포넌트로 간주할 수 있습니다.

처음으로 받아온 정적인 HTML 페이지에는 클라이언트 컴포넌트 내부의 정적 데이터가 포함되어 있지만, 그 안의 JavaScript 코드는 받아오지 않습니다. 그렇기 때문에 Next.js가 빌드될 때 클라이언트 컴포넌트인지 서버 컴포넌트인지를 확인하고, 정적으로 받아올 수 있는 부분만 뽑아 생성하게 됩니다.

이렇게 생성된 정적인 HTML은 먼저 클라이언트로 전달되며, 그 후 필요한 JavaScript 코드가 전달됩니다. 이 과정을 하이드레이션(Hydration)이라고 부르며, 이 과정을 통해 최초 로드 시 사용자에게 빠르게 화면을 보여줄 수 있습니다.

```shell
- info Collecting page data (페이지 데이터 수집 중)
```

![](https://i.imgur.com/3xFeOYi.gif)

또, HTML 파일을 서버에서 받아온 뒤에, NextJS는 클라이언트 컴포넌트를 자동으로 리액트 컴포넌트로 변환하여 사용자에게 보여줍니다. 이렇게 변환된 컴포넌트는 이후 사용자의 상호작용에 동적으로 반응하게 됩니다. 이 과정은 자바스크립트를 통해 클라이언트 측에서 처리됩니다.
![](https://i.imgur.com/rs4r7Kl.png)
## 번들링

Next.js는 서버사이드 렌더링을 통해 초기 페이지 로딩 시간을 단축시키고 사용자 경험을 향상시킵니다. 

이 과정에서, Next.js는 집요하게 클라이언트 컴포넌트의 일부를 정적 HTML로 변환할 수 있는 부분을 찾아내어 프리렌더링 하게 됩니다.

이렇게 하면 필요한 JavaScript 코드의 양을 줄여 최종적인 번들의 크기를 축소하고 성능을 개선하는데 도움을 줍니다. 번들 크기가 작아지면 웹 애플리케이션의 로딩 시간이 단축되어 사용자에게 더 빠른 반응성을 제공할 수 있습니다.