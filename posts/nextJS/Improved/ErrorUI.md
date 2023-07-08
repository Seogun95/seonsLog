---
title: 'ERROR UI'
description:
  'error.js 파일을 사용하여 중첩된 라우트에서 런타임 에러를 처리 할 수 있습니다.'
image: ''
tags:
  - Error
  - Reset
date: 2023-07-08 02:26:16
category: '성능개선'
---

# Error UI

[공식 문서 - 로딩 UI](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

error.js 파일을 사용하여 중첩된 라우트에서 런타임 에러를 처리 할 수 있습니다.

![](https://i.imgur.com/cVizhnN.png)

## 구현 방법

Error UI를 생성하고 싶은 경로 폴더 내에 `error.tsx` 파일을 생성합니다.

- 리액트 에러 바운더리가 포함된 라우트 세그먼트와 해당 세그먼트의 중첩된 자식
  컴포넌트를 자동으로 래핑합니다.
- 파일 시스템 계층 구조를 사용하여 특정 세그먼트에 맞는 에러 UI를 조정할 수
  있습니다.
- 영향을 받은 세그먼트에 대한 에러를 격리하면서 나머지 앱은 정상적으로
  작동합니다.
- 전체 페이지 리로드 없이 에러에서 복구하기 위한 기능 추가합니다.

error.js 파일 내에 있는 React 컴포넌트를 생성하여 특정 세그먼트에 대한 에러 UI를
만들 수 있습니다.

```tsx
'use client'; // 에러 컴포넌트는 클라이언트 컴포넌트여야 합니다.

import { useEffect } from 'react';

interface iError {
  error: Error;
  reset: () => void;
}

export default function SettingsError({ error, reset }: iError) {
  useEffect(() => {
    // 에러를 오류 보고 시비스에 기록합니다.
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>문제가 발생했습니다!</h2>
      <button
        onClick={() => reset()} // 세그먼트 다시 렌더링을 시도하여 에러에서 복구합니다.
      >
        다시 시도하기
      </button>
    </div>
  );
}
```

일부러 Error를 생성해서 직접 확인해보도록 하겠습니다.

`src/app/settings/page.tsx`

```tsx
import { getSettingMenus } from '@/service/settingMenu';
import Link from 'next/link';
import RandomArticle from '@/components/(settings)/RandomArticle';

export default async function SettingHome() {
  throw new Error('에러발생!');
  const settings = await getSettingMenus();

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
      <RandomArticle />
    </>
  );
}
```

![](https://i.imgur.com/cmo0PhP.gif)

## error.js 파일이 작동하는 방식

![](https://i.imgur.com/HRTEcUD.png)

- error.js 파일은 자식 세그먼트 또는 page.js 컴포넌트를 래핑하는 React 에러
  바운더리를 자동으로 생성합니다.
- error.js 파일에서 내보내는 React 컴포넌트는 대체 컴포넌트로 사용됩니다.
- 에러 바운더리 내에서 에러가 발생하면 에러가 포함되고 대체 에러 컴포넌트가
  렌더링됩니다.
- 대체 에러 컴포넌트가 활성화된 경우, 에러 바운더리 위의 레이아웃은 상태를
  유지하고 상호 작용 가능한 상태를 유지하며, 에러 컴포넌트에서 에러에서 복구하기
  위한 기능을 표시할 수 있습니다.

### 에러에서 복구하기

에러의 원인은 가끔 일시적일 수 있습니다. 이러한 경우 단순히 다시 시도하는 것으로
문제를 해결할 수 있습니다.

에러 컴포넌트는 reset() 함수를 사용하여 사용자에게 에러에서 복구하도록 안내할 수
있습니다. 이 함수를 실행하면 세그먼트의 다시 렌더링을 시도합니다. 성공하면 대체
에러 컴포넌트가 다시 렌더링 결과로 대체됩니다.

아래는 error.js 파일에서 복구를 위해 사용되는 예시입니다.

```jsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>문제가 발생했습니다!</h2>
      <button onClick={() => reset()}>다시 시도하기</button>
    </div>
  );
}
```

### 중첩된 라우트

특수 파일을 통해 생성된 React 컴포넌트는 특정 중첩된 계층 구조에서 렌더링됩니다.

예를 들어, 두 개의 세그먼트를 포함하는 중첩된 라우트에서 두 세그먼트 모두
layout.js와 error.js 파일을 포함하는 경우, 다음과 같은 단순화된 컴포넌트 계층
구조에서 렌더링됩니다.

![](https://i.imgur.com/BUnjjN0.png)

중첩된 에러 컴포넌트 계층 구조

error.js 파일은 중첩된 라우트에서의 동작에 영향을 줍니다.

![](https://i.imgur.com/RagoDwD.png)

- 에러는 가장 가까운 부모 에러 바운더리로 전달됩니다. 따라서 error.js 파일은
  해당 세그먼트의 모든 중첩된 자식 세그먼트의 에러를 처리합니다. 세분화된 에러
  UI는 라우트의 중첩 폴더의 다른 수준에 error.js 파일을 배치함으로써 구현할 수
  있습니다.
- 에러 바운더리는 동일한 세그먼트의 layout.js 컴포넌트에서 발생한 에러를
  처리하지 않습니다. 이러한 에러 바운더리는 해당 레이아웃 컴포넌트의 내부에
  중첩되어 있기 때문입니다.

### 레이아웃에서 에러 처리하기

error.js 바운더리는 동일한 세그먼트의 layout.js 또는 template.js 컴포넌트에서
발생한 에러를 캐치하지 않습니다. 이러한 계층 구조는 에러가 발생했을 때 중요한
UI(예: 내비게이션)가 표시되고 작동할 수 있도록 유지하기 위한 것입니다.

특정 레이아웃 또는 템플릿 내에서 에러를 처리하려면 레이아웃의 부모 세그먼트에
error.js 파일을 배치하면 됩니다.

### 루트 레이아웃에서 에러 처리하기

루트 앱의 에러 바운더리는 루트 앱의 레이아웃(layout.js) 또는
템플릿(template.js)에서 발생한 에러를 캐치하지 않습니다.

이러한 루트 컴포넌트에서 에러를 처리하기 위해 루트 앱 디렉토리에 있는 error.js의
변형인 global-error.js를 사용합니다.

global-error.js 에러 바운더리는 앱 전체를 감싸며, 활성화되면 루트 레이아웃을
대체하는 대체 에러 컴포넌트가 렌더링됩니다. 따라서, global-error.js는 자체적으로
`html` 및 `body` 태그를 정의해야 합니다.

global-error.js는 가장 세분화되지 않은 에러 UI로, 전체 애플리케이션에 대한
"캐치-올" 에러 처리로 간주할 수 있습니다. 루트 컴포넌트는 일반적으로 덜
동적이므로 대부분의 에러는 다른 error.js 바운더리에서 처리될 것입니다.

global-error.js가 정의되더라도, 루트 레이아웃에 루트 error.js를 정의하는 것이
권장됩니다. 이렇게 함으로써 루트 레이아웃에는 전역으로 공유되는 UI와 브랜딩이
포함됩니다.

app/global-error.tsx 파일의 예시입니다.

```jsx
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>문제가 발생했습니다!</h2>
        <button onClick={() => reset()}>다시 시도하기</button>
      </body>
    </html>
  );
}
```

### 서버 에러 처리

데이터 가져오기나 서버 컴포넌트 내에서 에러가 발생하면 Next.js는 발생한 Error
객체를 가장 가까운 error.js 파일로 에러 속성으로 전달합니다.

next dev를 실행할 때는 에러가 직렬화되어 서버 컴포넌트에서 클라이언트의
error.js로 전달됩니다. 프로덕션에서 next start를 실행할 때는 보안을 위해
일반적인 에러 메시지와 에러 메시지의 해시(.digest)와 함께 에러로 전달됩니다. 이
해시는 서버 로그와 대응할 때 사용할 수 있습니다.
