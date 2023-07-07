# 서버 컴포넌트

[공식 문서 - 서버 컴포넌트](https://nextjs.org/docs/getting-started/react-essentials#why-server-components)

> 서버 컴포넌트는 개발자가 서버 인프라를 더 효과적으로 활용할 수 있게 합니다. 데이터 가져오기를 서버로 이동하여 데이터베이스와 가까이 위치시키고, 서버 컴포넌트는 서버 상에 완전히 유지되므로 클라이언트에게 자바스크립트 코드를 보내지 않아도 됩니다. 이로 인해 번들링되는 자바스크립트 코드의 크기가 작아지며 성능이 향상됩니다. 서버 컴포넌트를 사용하면 React로 개발한 애플리케이션을 PHP나 Ruby on Rails와 유사한 방식으로 개발할 수 있으며, 동시에 React와 컴포넌트 기반 UI 템플릿의 강력함과 유연성을 활용할 수 있습니다.

서버 컴포넌트는 이름에서도 알 수 있듯이 서버에서 렌더링되고 `fetch`됩니다.

서버 컴포넌트는 주로 정적인 데이터를 보여주는 경우나, 사용자와의 상호작용이 필요하지 않은 경우에 사용됩니다. 이런 컴포넌트들은 서버에서 미리 렌더링되어 사용자에게 전달되므로, 사용자 경험이 매끄럽고, 사이트의 성능 개선에도 기여합니다.

## Next.js의 기본 작동 특징

1. Next.js 13부터는 기본적으로 모든 컴포넌트가 서버 컴포넌트로 작동합니다.
2. 서버 컴포넌트로 실행된 코드는 서버에서 만들어져 HTML 형태로 클라이언트에 전송되기 때문에 콘솔 로그는 브라우저에서 실행되지 않습니다.
3. 서버에서 동작하기 때문에 브라우저에서 제공하는 API는 사용할 수 없지만, Node.js API는 사용 가능합니다.

```
📦app  
 ┃ ...
 ┗ 📜page.tsx
```

### 기본적으로 모든 컴포넌트가 서버 컴포넌트로 작동

```tsx
// 기본 작동 특징 2번에 대한 코드

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈 | 서근',
};

export default function Home() {
  console.log('안녕');
  return <h1>홈페이지다!</h1>;
}
```

![](https://i.imgur.com/fj69Z2F.png)

----
### 브라우저에서 제공하는 API는 사용할 수 없지만, Node.js API는 사용 가능

서버 컴포넌트에서는 서버에서 동작하기 때문에 Node.js API에 접근하여 사용할 수 있으며, 브라우저에서 작동하는 상태 관리, 뷰포트에 요소가 보여지는지 여부, 로컬 스토리지와 같은 브라우저 관련 API는 사용할 수 없습니다.

```tsx
import { Metadata } from 'next';
import os from 'os'; // Node.js API

export const metadata: Metadata = {
  title: '홈 | 서근',
};

export default function Home() {
  console.log('안녕');
  console.log('os.hostname() --->', os.hostname());
  return <h1>홈페이지다!</h1>;
}
```

![](https://i.imgur.com/8R9CNos.png)

만약 클라이언트 컴포넌트를 서버 컴포넌트에서 사용하려고 하면 아래와 같이 오류가 발생합니다.

```tsx
import { Metadata }

 from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: '홈 | 서근',
};

export default function Home() {
  const [count, setCount] = useState(0);

  return <h1>홈페이지다!</h1>;
}
```

![](https://i.imgur.com/MqHcK5K.png)

이를 해결하기 위해서는 컴포넌트의 최상단에 `'use client'`를 추가해야 해당 오류를 해결할 수 있습니다.