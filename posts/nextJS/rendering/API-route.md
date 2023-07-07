# API 라우트

먼저 중요한 개념으로 [서버리스 | 유튜브](https://www.youtube.com/watch?v=E4uhnFOwevA)를 보고 오시면 좋습니다!
- [[서버리스|서버리스란? - 개념정리]]

## Next.js 12 버전에서의 API 라우트

Next.js 12 버전에서는 API 파일을 `src/pages/api` 디렉토리에 생성해야 합니다.

Next.js에서 API Route를 정의하기 위해 `src/pages/api/settings/index.ts` 경로에서 GET 요청이 들어오면 `getSettingMenus()` 함수를 사용하여 설정 메뉴를 가져온 후, 200 상태 코드와 함께 JSON 형식으로 응답합니다.

```tsx
import { ISettings, getSettingMenus } from '@/service/settingMenu';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISettings[]>,
) {
  if (req.method === 'GET') {
    const settings = await getSettingMenus();
    return res.status(200).json(settings);
  }
  res.status(200);
}
```

코드의 구조를 살펴보면 다음과 같습니다.

1. `import` 문을 사용하여 `ISettings`와 `getSettingMenus`라는 두 개의 모듈을 가져옵니다. `@/service/settingMenu`는 상대 경로를 사용하여 해당 모듈을 가져옵니다.
2. `NextApiRequest`와 `NextApiResponse`는 Next.js에서 제공하는 타입입니다. 이를 사용하여 요청과 응답 객체의 타입을 지정합니다.
3. `handler`라는 비동기 함수를 `default`로 내보냅니다. 이 함수는 `NextApiRequest`와 `NextApiResponse<ISettings[]>` 타입의 매개변수를 받습니다.
4. 함수 내부에서는 `req.method`을 사용하여 요청 메서드를 확인합니다. GET 메서드인 경우 `getSettingMenus()` 함수를 사용하여 설정 메뉴를 가져옵니다.
5. 가져온 설정 메뉴를 200 상태 코드와 함께 JSON 형식으로 응답합니다.
6. GET 메서드가 아닌 경우에는 200 상태 코드만 응답하고 종료합니다.

이 코드를 사용하면 `/api/settings` 경로로 GET 요청을 보내면 설정 메뉴를 가져올 수 있습니다. 해당 설정 메뉴는 JSON 형식으로 응답됩니다.

그리고 주소창에 `http://localhost:3000/api/settings`를 입력하면 다음과 같이 JSON 형태의 데이터를 받아올 수 있습니다.

```JSON
[
  {
    "id": "123",
    "menu_eng": "mypage",
    "menu_kr": "마이페이지",
    "needPW": true
  },
  {
    "id": "124",
    "menu_eng": "cart",
    "menu_kr": "장바구니",
    "needPW":

 false
  },
  {
    "id": "125",
    "menu_eng": "alarm",
    "menu_kr": "알림",
    "needPW": false
  },
  {
    "id": "126",
    "menu_eng": "security",
    "menu_kr": "보안",
    "needPW": true
  }
]
```

----

## Next.js 13 버전에서의 API 라우트

Next.js 13 버전에서는 새로운 Route Handlers 기능이 도입되었습니다. Route Handlers를 사용하면 웹 요청과 응답 API를 활용하여 특정 경로에 대한 사용자 정의 요청 핸들러를 생성할 수 있습니다.

![](https://i.imgur.com/aBh3z3o.png)

✨ Route Handlers는 `src/app/api` 디렉토리 내에서만 사용할 수 있으며, pages 디렉토리 내의 API Routes와 유사한 기능을 제공합니다. 따라서 API Routes와 Route Handlers를 동시에 사용할 필요는 없습니다.

Route Handlers는 `app` 디렉토리 내의 `route.js|ts` 파일에 정의됩니다. 아래는 예시입니다.

```javascript
// app/api/route.ts

export async function GET(request) {
  // 핸들러 로직
}
```

Route Handlers는 page.js와 layout.js와 유사하게 app 디렉토리 내에서 중첩해서 사용할 수 있지만, page.js와 동일한 경로 세그먼트 레벨에 route.js 파일이 존재해서는 안 됩니다.

`src/app/api/settings/route.js`

```ts
import { getSettingMenus } from '@/service/settingMenu';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const settings = await getSettingMenus();
  return NextResponse.json({ settings });
}
```

이처럼 Next.js 12에서 handler를 사용했을 때보다 훨씬 더 간단하게 사용 가능해졌습니다.

### [지원되는 HTTP 메서드](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#supported-http-methods)

Route Handlers는 다음과 같은 HTTP 메서드를 지원합니다: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`. 지원하지 않는 메서드가 호출되면 Next.js는 `405 Method Not Allowed` 응답을 반환합니다.

### [Static Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#static-route-handlers)

Next.js는 기본적으로 GET 메서드와 Response 객체를 사용할 때 Route Handlers를 정적으로 평가합니다. 아래는 정적 Route Handlers의 예시입니다.

```javascript
// app/items/route.ts

import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return NextResponse.json({ data })
}
```


### [Dynamic Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#dynamic-route-handlers)

동적 Route Handlers는 다음과 같은 경우에 동적으로 평가됩니다.

- GET 메서드와 Request 객체를 사용할 때
- 다른 HTTP 메서드를 사용할 때
- 쿠키와 헤더와 같은 동적 함수를 사용할 때
- 세그먼트 구성 옵션에서 수동으로 동적 모드를 지정한 경우

예를 들어, 다음은 동적 Route Handlers의 예시입니다.

```javascript
// app/products/api/route.ts

import { NextResponse } from 'next/server'
 
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const product = await res.json()
 
  return NextResponse.json({ product })
}
```

POST 메서드도 동적으로 평가되는 Route Handler를 호출합니다.

```javascript
// app/items/route.ts

import { NextResponse } from 'next/server'
 
export async function POST() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  })
 
  const data = await res.json()
 
  return NextResponse.json(data)
}
```

이외에도 Route Handlers는 다양한 기능과 API와 결합하여 사용할 수 있습니다.

### [Route Resolution](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#route-resolution)

라우트는 가장 기본적인 라우팅 단위로 간주할 수 있습니다.

- 라우트는 레이아웃이나 클라이언트 측 내비게이션과 같은 기능에 참여하지 않습니다.
- 같은 경로에 page.js 파일과 route.js 파일을 동시에 사용할 수는 없습니다.

| Page               | Route              | Result       |
| ------------------ | ------------------ | ------------ |
| app/page.js        | app/route.js       | ❌ Conflict  |
| app/page.js        | app/api/route.js   | ✅ Valid      |
| app/[user]/page.js | app/api/route.js   | ✅ Valid      |

```tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
 
// ❌ Conflict
// `app/route.js`
export async function POST(request) {}
```

## Next.js 12와 Next.js 13버전의 변경 사항

Next.js 12버전과 13버전 사이에는 API Routes와 Route Handlers 간에 몇 가지 주요한 변경 사항이 있습니다. 아래는 Next.js 13버전에서 변경된 사항입니다.

1. 이름 변경: 이전에는 API Routes라고 불렸지만, Next.js 13버전에서는 Route Handlers로 이름이 변경

되었습니다.
    
2. 새로운 파일 위치: Next.js 12버전에서는 API Routes를 `pages/api` 디렉토리에 위치시켜야 했습니다. 하지만 Next.js 13버전에서는 Route Handlers를 `app` 디렉토리 내의 `route.js|ts` 파일에 위치시킵니다.
    
3. Route Handlers와 Pages의 연관성: Next.js 12버전에서는 API Routes와 Pages가 서로 다른 디렉토리에 위치했기 때문에 각각의 기능이 분리되어 있었습니다. 그러나 Next.js 13버전에서는 Route Handlers와 Pages가 동일한 디렉토리 내에 위치할 수 있습니다. 이것은 개발자들이 API 요청 핸들링과 페이지 렌더링을 한 곳에서 관리할 수 있게 해줍니다.
    
4. Route Resolution: Next.js 13버전에서는 Route Handlers와 Pages 간에 경로 충돌이 발생할 수 있습니다. 경로 충돌은 Route Handlers와 Pages가 동일한 경로에 존재할 때 발생합니다. 이전 버전에서는 API Routes와 Pages 사이에 경로 충돌이 발생하지 않았지만, Next.js 13버전에서는 이러한 충돌을 해결해야 합니다.
    
5. 확장된 NextRequest와 NextResponse APIs: Next.js 13버전에서는 Request와 Response API 외에도 Next.js는 이들을 확장한 NextRequest와 NextResponse API를 제공합니다. 이러한 API는 고급 사용 사례에 편리한 도우미 함수를 제공하며, Route Handlers에서 활용할 수 있습니다.
    
6. 세그먼트 구성 옵션: Next.js 13버전에서는 Route Handlers가 세그먼트 구성 옵션을 사용하여 동적 라우팅을 지원합니다. 이러한 옵션을 사용하여 동적으로 데이터를 처리하거나 캐싱 및 실행 환경과 관련된 설정을 구성할 수 있습니다.
    
7. 런타임 선택: Next.js 13버전에서는 Route Handlers가 Edge 런타임과 Node.js 런타임을 모두 지원합니다. `runtime` 세그먼트 구성 옵션을 사용하여 런타임을 지정할 수 있습니다.