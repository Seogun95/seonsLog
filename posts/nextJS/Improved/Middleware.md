# Middleware

[공식 문서 - 미들웨어](https://nextjs.org/docs/app/building-your-application/routing/middleware)

미들웨어는 웹사이트에서 요청이 처리되기 전에 실행되며 `Vercel` 환경에서는 특이하게도 캐시보다 먼저 수행됩니다. 이를 통해 누구나 접근할 수 없는 개인화된 콘텐츠(예: 특정 사용자의 SSR페이지)를 CDN에 캐싱하여 빠른 응답을 의도하여도 개인화하여 제공할 수 있으며 그런 방식에 효과적이라고 합니다.

미들웨어에서는 `Request` 객체와 `Response` 객체에 접근할 수 있으며, 이를 활용해 요청 정보를 받아와 부가적인 처리를 하고 응답 객체에 무언가를 추가하거나 응답을 변경할 수 있습니다.

- 페이지 렌더링 전에 인증을 확인하거나 요청을 확인합니다.
- 요청 데이터를 사전에 처리하거나 특정 API 요청을 수행하거나 캐시를 관리합니다.
- 요청에 대한 응답을 변환하거나 에러를 처리할 수 있습니다.

간단히 말해, 미들웨어는 문지기 역할을 한다고 생각하면 됩니다. 로그인하지 않은 사용자를 입구에서 지켜보다가 로그인 페이지로 리디렉션하거나, 공통적으로 수행해야 하는 작업을 하거나, 검증을 할 때 사용할 수 있습니다.

## 사용 방법

Next.js 13에서 미들웨어를 사용하기 위해서는 `app` 폴더가 아닌 최상위 폴더인 `src`에서 사용해야 합니다.

```
📦src
┗ 📜middleware.ts
```

```ts
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('미들웨어 체킹 ✅');
}
```

먼저 위와 같이 미들웨어가 잘 작동하는지 콘솔을 통해 확인할 수 있습니다. 이렇게 하면 모든 페이지에 접근할 때 미들웨어가 전역으로 사용되고 있는지 확인할 수 있습니다. 즉, 모든 요청에 대해서 검사할 수 있습니다.

```tsx
import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  console.log('미들웨어 체킹 ✅');
  if (request.nextUrl.pathname.startsWith('/settings/middleware')) {
    console.log(`${request.url}이 홈으로 이동합니다!`);
    return NextResponse.redirect(new URL('/', request.url));
  }
};
```

![](https://i.imgur.com/mtLmbfn.gif)


## config

만약 특정한 페이지에서만 실행이 필요하다면, 아래와 같이 설정할 수 있습니다.

```ts
export const config = {
  matcher: ['/settings/:path+'],
};
```

`export const config`는 미들웨어의 구성 옵션을 정의하는 객체입니다. 여기서 `matcher`는 미들웨어를 적용할 경로 패턴을 지정하는 옵션입니다.

`matcher: ['/settings/:path+']`는 `/settings` 경로를 제외한 `settings/slug` 다이나믹 경로에 해당하는 모든 경로에서 미들웨어를 사용하도록 설정한 것입니다.

여기서 `:path+`는 `:`으로 시작하는 동적 경로 세그먼트를 나타냅니다. `+`는 해당 세그먼트가 하나 이상의 경로 세그먼트를 포함한다는 것을 의미합니다. 따라서 `/settings/slug`뿐만 아니라 `/settings/abc/123`과 같은 경로에도 미들웨어가 적용됩니다.

이렇게 설정된 `matcher` 옵션은 해당 경로 패턴에 매칭되는 모든 요청에 대해 미들웨어 함수가 실행되도록 합니다.

참고로 정규식 표현법에서 `*` 은 path 포함 모든 경로에서 middleware 사용되고, `+`는 path 미포함 모든 경로에서 middleware 사용됩니다.

![](https://i.imgur.com/WTkbhwA.gif)

또한, 영상을 통해 확인할 수 있듯이, `settings` 경로에서 다이나믹 경로에 마우스를 올리면 Next.js에서 데이터를 미리 가져오는 것을 확인할 수 있습니다.


## 미들웨어 실행 순서

다음은 프로젝트의 모든 라우트에 대해 미들웨어가 호출되는 실행 순서입니다. 

1. `next.config.js`의 header 실행
2. `next.config.js`의 redirects 실행
3. **Middleware (rewrites, redirects, etc.) 실행**
4.  `next.config.js`의 `beforeFiles` (rewrites) 실행
5. Filesystem routes (`public/`, `_next/static/`, `pages/`, `app/`, etc.)
6.  `next.config.js`의 `afterFiles` (rewrites) 실행
7. 동적 라우팅 실행 (`/blog/[slug]`)
8. `next.config.js`의 `fallback` (rewrites) 실행

이 순서대로 각각의 단계에서 해당하는 작업이 실행됩니다.