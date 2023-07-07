# 동적 라우팅 ( Dynamic Routing )

[공식 사이트 - 동적 라우팅](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

동적 라우팅(Dynamic Routing)은 Next.js에서 URL 경로에 따라 페이지를 동적으로 생성하는 방
법입니다. 예를 들어, `/posts/1`과 같은 URL을 처리하면 `1`에 해당하는 게시물을 보여주는 페이지를 동적으로 생성할 수 있습니다.

동적 라우트를 설정하기 위해서는 폴더명을 `[ ]` 대괄호로 감싸서 입력해주면 됩니다. 일반적으로는 `slug`라는 폴더명을 사용하기도 합니다.

```plaintext
📦info  
 ┣ 📂[slug]  
 ┃ ┗ 📜page.tsx  
 ┣ 📂mypage  
 ┃ ┗ 📜page.tsx  
 ┗ 📜page.tsx
```

위와 같이 `info` 폴더 안에 `[slug]`로 폴더를 동적으로 라우팅되게 설정한 후, 각 페이지에서는 다음과 같이 경로를 확인할 수 있습니다.

```tsx
interface InfoProps {
  params: {
    slug: string;
  };
}

export default function Mypage({ params }: InfoProps) {
  return <h1>내정보 - {params.slug} 페이지</h1>;
}
```

이제 동적 라우팅이 제대로 설정되었는지 `yarn build`를 통해 확인해보면, 아래와 같이 SSR(서버 사이드 렌더링)로 렌더링되는 것을 확인할 수 있습니다.

![](https://i.imgur.com/S5EPGIa.png)

페이지의 골격은 미리 Pre-rendering(사전 렌더링)되어 있지만, 동적인 부분은 props로 SSR과 같이 생성되어 브라우저에게 전달됩니다.

---

## 페이지 사전 생성

만약 20개의 데이터 컴포넌트 중에서 10개의 컴포넌트만 사전에 SSG(정적 사이트 생성)로 렌더링하고 싶다면 어떻게 해야 할까요?

다이나믹 라우팅을 사용하는 페이지에서 어떤 경로에 한해서 SSG로 사전 렌더링할지를 작성해주면 됩니다.

이때 사용하는 것이 `generateStaticParams`입니다.

```tsx
/**
 * -----------------------------
 * generateStaticParams
 * -----------------------------
 * generateStaticParams 함수는 사전에 미리 생성할 페이지의 경로를 정의합니다.
 * 예를 들어, 'account'와 'setting' 페이지에 대한 경로를 미리 생성하고 싶다면 해당 값을 info 배열에 추가하면 됩니다.
 * 함수는 info 배열의 각 요소를 slug 속성을 가진 객체로 변환하여 반환합니다.
 */

export function generateStaticParams() {
  const info = ['account', 'setting'];
  return info.map(item => ({ slug: item }));
}
```

위 코드에서 `generateStaticParams` 함수는 사전에 생성할 페이지의 경로를 정의합니다. 예를 들어, 'account'와 'setting' 페이지에 대한 경로를

사전에 생성하고 싶다면 해당 값을 `info` 배열에 추가하면 됩니다. 이 함수는 `info` 배열의 각 요소를 `slug` 속성을 가진 객체로 변환하여 반환합니다.

주의해야 할점은 `({ slug: item })`의 형태로 중괄호를 사용하여 객체를 생성하고 반환하는 것입니다. 만약 `return` 문에서 `{}` 없이 `slug: item`만 작성한다면, 해당 객체는 단독으로 존재하게 되므로 올바른 문법이 아니게 됩니다.

![](https://i.imgur.com/sIL0Zvl.png)
