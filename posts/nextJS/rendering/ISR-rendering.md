# ISR 렌더링

[공식 문서](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#how-it-works)

Next.js에서는 SSG(Static Site Generation)을 ISR(Incremental Static Regeneration)으로 변경할 수 있습니다.

주의할 점은 `yarn dev` 모드는 항상 SSR(Server-Side Rendering)로 작동하기 때문에 ISR 작동을 확인하려면 반드시 `yarn build` 후에 `yarn start`로 확인해야 합니다.

## Revalidate

페이지 컴포넌트에서 `revalidate` 변수를 선언하고, 재유효화 주기를 설정합니다. 예를 들어, 매 60초마다 페이지를 재유효화하려면 다음과 같이 변수를 설정합니다.

```tsx
export const revalidate = 60; // 60초마다 페이지를 재유효화
```

revalidate 옵션은 정적 생성된 페이지의 새로운 데이터를 주기적으로 업데이트하는 데 사용됩니다.

예시로, 서버에서 받아온 JSON 데이터를 매핑하여 링크로 만들어주는 컴포넌트를 들어보겠습니다.

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
    "needPW": false
  },
  ...
]
```

```tsx
import { getSettingMenus } from '@/service/settingMenu';
import Link from 'next/link';

export const revalidate = 60;

export default async function SettingHome() {
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
    </>
  );
}
```

만약 `revalidate`을 사용하지 않았다면, 위 컴포넌트는 빌드 시에 정적으로 생성된 HTML 파일이 브라우저에 보내지기 때문에, 빌드 후에 JSON 데이터를 수정하더라도 데이터는 변경되지 않습니다.

![](https://i.imgur.com/vXLT6Vh.png)

하지만 `revalidate`을 사용하여 ISR로 설정하면, 지정된 주기 이후에 서버에서 HTML을 다시 생성하여 브라우저에 전달하게 됩니다.

![](https://i.imgur.com/2f1PhJ2.gif)

## 작동 원리

**Q. Revalidate의 주기를 10초로 지정했다면?**

1. 빌드 시점에 정적으로 렌더링된 라우트에 요청이 들어오면, 처음에는 캐시된 데이터를 보여줍니다.
2. 초기 요청 후 10초 이내에 라우트에 대한 모든 요청은 또한 캐시되며 즉시 처리됩니다.
3. 10초가 지난 후, 다음 요청은 여전히 캐시된(오래된) 데이터를 보여줍니다.
4. Next.js는 백그라운드에서 데이터의 재생성을 시작합니다.
5. 라우트가 성공적으로 생성되면, Next.js는 캐시를 무효화하고 업데이트된 라우트를 보여줍니다. 만약 백그라운드에서의 재생성이 실패하면, 오래된 데이터는 그대로 유지됩니다. 만약 생성되지 않은 라우트 세그먼트에 요청이 들어오면, Next.js는 첫 요청에서 라우트를 동적으로 렌더링합니다. 미래의 요청은 캐시에서 정적 라우트 세그먼트를 제공합니다.


따라서, revalidate 옵션은 서버에서 자동으로 페이지 데이터를 주기적으로 갱신하는 역할을 합니다. 이로 인해 서버와 브라우저 간에 새로운 데이터를 교환하는 데 필요한 시간과 네트워크 트래픽을 줄일 수 있습니다.

그러나, 데이터 제공자가 기본적으로 캐싱을 사용하도록 설정되어 있다면, revalidation은 새로운 데이터를 가져와 ISR(Incremental Static Regeneration) 캐시를 업데이트할 수 없을 수도 있습니다. 

이 경우 데이터 제공자의 캐싱을 비활성화해야 합니다. 캐싱은 요청된 엔드포인트가 Cache-Control 헤더를 반환할 때 CDN에서 발생할 수 있습니다. Vercel에서의 ISR은 캐시를 전역적으로 유지하고 롤백을 처리합니다.

---
