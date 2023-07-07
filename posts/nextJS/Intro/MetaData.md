# Metadata

Next.js에는 개선된 SEO 및 웹 공유를 위해 응용 프로그램의 메타데이터(예: HTML head 요소 내의 메타 및 링크 태그)를 정의할 수 있는 Metadata API가 있습니다.

응용 프로그램에 메타데이터를 추가하는 두 가지 방법이 있습니다:

1. 설정 기반 메타데이터: `app/layout.js` 또는 `page.js` 파일에서 정적 메타데이터 객체나 동적 `generateMetadata` 함수를 내보냅니다.
2. 파일 기반 메타데이터: 경로 세그먼트에 정적 또는 동적으로 생성된 특수 파일을 추가합니다.

두 가지 옵션 모두 Next.js가 페이지에 대한 관련 `<head>` 요소를 자동으로 생성합니다. 
`ImageResponse` 생성자를 사용하여 동적 OG 이미지도 생성할 수 있습니다.

## 정적 메타데이터

정적 메타데이터를 정의하려면 `layout.js` 또는 정적 `page.js` 파일에서 `Metadata` 객체를 내보내야 합니다.

layout.tsx / page.tsx

```jsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서근',
  description: 'Next.js 13 연습',
};

```

사용 가능한 모든 옵션은 [API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)에서 확인할 수 있습니다.

## 동적 메타데이터

동적 값을 필요로하는 메타데이터를 가져오기 위해 `generateMetadata` 함수를 사용할 수 있습니다.

[공식 문서](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

```tsx
interface SettingProps {
  params: {
    slug: string;
  };
}

export default function SettingDetail({ params }: SettingProps) {
  return <h1>내정보 - {params.slug} 페이지</h1>;
}

// 동적으로 MetaData 설정 해주는 generateMetadata()
export function generateMetadata({ params }: SettingProps) {
  return {
    title: `${params.slug}`,
  };
}
```

또 다른 예시

```tsx
// TODO: 메타데이터 동적 라우트 설정
// 동적으로 MetaData 설정 해주는 generateMetadata()
export const generateMetadata = async ({
  params: { slug },
}: SettingProps): Promise<Metadata> => {
  const settings = await getSettingMenu(slug);
  return {
    title: `${settings?.menu_kr} | 서근`,
    description: `${settings?.menu_kr} 페이지 입니다.`,
  };
};
```