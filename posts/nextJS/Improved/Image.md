---
title: 'Image'
description:
  'Next.js 13 버전부터는 이미지 최적화를 위해 <img> 태그 대신 Image 컴포넌트를
  사용할 수 있습니다.'
image: ''
tags:
  - Image
  - 최적화
  - Skeleton
date: 2023-07-08 02:26:16
category: '성능개선'
---

# Image

[공식 문서 - Image](https://nextjs.org/docs/app/api-reference/components/image)

Next.js 13 버전부터는 이미지 최적화를 위해 `<img>` 태그 대신 `Image` 컴포넌트를
사용할 수 있습니다.

일반적으로 Next.js에서 이미지를 저장할 때는 이미지 파일을 `public` 폴더에
넣습니다. `public` 폴더는 정적 파일을 저장하는 공용 폴더로 사용됩니다. Next.js는
`public` 폴더에 있는 파일을 그대로 클라이언트에서 접근할 수 있도록 제공합니다.

`Image` 컴포넌트를 사용하면 이미지 로딩 중에 레이아웃 이동(layout shift)이
발생하지 않습니다. 레이아웃 이동은 이미지가 로딩되는 동안 페이지의 구조가
변경되는 것을 의미합니다.

다음은 `next/image` 컴포넌트의 속성(props)과 간단한 설명입니다:

| 속성                                                                                                | 예                                | 유형        | 필수 여부 | 설명                                                               |
| --------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- | --------- | ------------------------------------------------------------------ |
| [src](https://nextjs.org/docs/pages/api-reference/components/image#src)                             | src="/profile.png"                | 문자열      | ✅        | 이미지 파일의 경로를 지정합니다.                                   |
| [width](https://nextjs.org/docs/pages/api-reference/components/image#width)                         | width={500}                       | 숫자(px)    | ✅        | 이미지의 너비를 지정합니다.                                        |
| [height](https://nextjs.org/docs/pages/api-reference/components/image#height)                       | height={500}                      | 숫자(px)    | ✅        | 이미지의 높이를 지정합니다.                                        |
| [alt](https://nextjs.org/docs/pages/api-reference/components/image#alt)                             | alt="Picture of the author"       | 문자열      | ✅        | 이미지에 대한 대체 텍스트를 지정합니다.                            |
| [loader](https://nextjs.org/docs/pages/api-reference/components/image#loader)                       | loader={imageLoader}              | 함수        | -         | 사용자 정의 로더 함수를 지정합니다.                                |
| [fill](https://nextjs.org/docs/pages/api-reference/components/image#fill)                           | fill={true}                       | 부울        | -         | 이미지를 부모 요소에 맞게 채우도록 설정합니다.                     |
| [sizes](https://nextjs.org/docs/pages/api-reference/components/image#sizes)                         | sizes="(max-width: 768px) 100vw"  | 문자열      | -         | 미디어 쿼리에 따라 이미지 크기를 조정합니다.                       |
| [quality](https://nextjs.org/docs/pages/api-reference/components/image#quality)                     | quality={80}                      | 숫자(1-100) | -         | 이미지의 품질을 설정합니다.                                        |
| [priority](https://nextjs.org/docs/pages/api-reference/components/image#priority)                   | priority={true}                   | 부울        | -         | 이미지 로딩 우선순위를 설정합니다.                                 |
| [placeholder](https://nextjs.org/docs/pages/api-reference/components/image#placeholder)             | placeholder="blur"                | 문자열      | -         | 이미지 로딩 중에 보여질 플레이스홀더를 지정합니다.                 |
| [style](https://nextjs.org/docs/pages/api-reference/components/image#style)                         | style={{objectFit: "contain"}}    | 객체        | -         | 이미지에 적용할 스타일 객체를 지정합니다.                          |
| [onLoadingComplete](https://nextjs.org/docs/pages/api-reference/components/image#onloadingcomplete) | onLoadingComplete={img => done()} | 함수        | -         | 이미지 로딩이 완료된 후 실행될 콜백 함수를 지정합니다.             |
| [onLoad](https://nextjs.org/docs/pages/api-reference/components/image#onload)                       | onLoad={event => done()}          | 함수        | -         | 이미지 로딩이 성공적으로 완료된 후 실행될 콜백 함수를 지정합니다.  |
| [onError](https://nextjs.org/docs/pages/api-reference/components/image#onerror)                     | onError(event => fail())          | 함수        | -         | 이미지 로딩 중에 에러가 발생했을 때 실행될 콜백 함수를 지정합니다. |
| [loading](https://nextjs.org/docs/pages/api-reference/components/image#loading)                     | loading="lazy"                    | 문자열      | -         | 이미지 로딩 방식을 설정합니다.                                     |
| [blurDataURL](https://nextjs.org/docs/pages/api-reference/components/image#blurdataurl)             | blurDataURL="data:image/jpeg..."  | 문자열      | -         | 이미지 로딩 중에 보여질 블러된 데이터 URL을 지정합니다.            |

위의 표는 `Image` 컴포넌트에서 사용할 수 있는 주요 속성(props)과 간단한
설명입니다. 이를 참고하여 `Image` 컴포넌트를 사용할 때 필요한 속성을 지정하실 수
있습니다.

## 이미지 최적화

Next.js의 `Image` 컴포넌트는 HTML의 `<img>` 요소를 확장하여 이미지를 자동으로
최적화하는 기능을 제공합니다. 다음과 같은 기능을 포함합니다:

- 크기 최적화: 각 기기에 맞는 올바른 크기의 이미지를 자동으로 제공합니다. WebP와
  AVIF 같은 현대적인 이미지 형식을 사용하여 효율적인 이미지 압축을 수행합니다.
- 시각적 안정성: 이미지 로딩 중에 레이아웃 이동(layout shift)을 방지합니다.
  이미지의 크기를 이미 알고 있으므로 레이아웃의 변화가 없습니다.
- 빠른 페이지 로딩: 이미지는 네이티브 브라우저의 지연 로딩을 사용하여 뷰포트에
  진입할 때만 로드됩니다. 필요한 경우 흐림 업 플레이스홀더가 제공됩니다.
- 자산 유연성: 원격 서버에 저장된 이미지에 대한 온디맨드 이미지 리사이징을
  지원합니다.

`Image` 컴포넌트를 사용하려면 `next/image`에서 import한 후 `src`를 지정합니다:

```jsx
import Image from 'next/image';
import clothesImage from 'public/images/clothes.jpg';

export default function About() {
  return (
    <>
      <Image src={clothesImage} alt="옷" />
      <h1>About 페이지</h1>
    </>
  );
}
```

로컬 이미지로 정적인 포트인 경우 `public` 폴더에 이미지를 저장하고 해당 파일을
import하여 `src` 속성에 전달합니다. 이미지의 크기와 너비는 자동으로 결정되므로
따로 지정할 필요가 없습니다.

외부 이미지로 동적인 포트인 경우 반드시 `width`와 `height` 속성을 지정해주어야
합니다. 외부 이미지 URL을 `src` 속성에 입력하고 `width`와 `height`를 명시적으로
지정합니다.

```jsx
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Image
        src="https://images.unsplash.com/photo-1688362809005-e1d27bf427ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <h1>About 페이지</h1>
    </>
  );
}
```

외부 이미지의 경우 `width`와 `height` 속성을 필수적으로 지정해주어야 합니다.

## next.config.js

외부 이미지를 사용할 때는 `next.config.js` 파일에서 이미지 최적화를 안전하게
허용하는 URL 패턴을 등록해야 합니다. 이를 통해 악의적인 사용을 방지하고 허용되는
이미지 소스를 명확하게 지정할 수 있습니다. `next.config.js` 파일을 다음과 같이
수정하여 설정할 수 있습니다:

```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '',
      },
    ],
  },
};
```

위의 설정은 `images.unsplash.com` 도메인의 이미지만 허용하는 패턴을 등록한
것입니다. `protocol`, `hostname`, `port`, `pathname`을 조합하여 지원되는 URL
패턴을 구체적으로 작성할 수 있습니다.

`remotePatterns`는 외부 URL 이미지의 패턴을 정의하는 배열이며, 여러 개의 패턴을
지정할 수 있습니다.

패턴 객체에는 다음과 같은 속성을 사용합니다:

- `protocol`: 이미지를 가져오는 데 사용할 프로토콜을 지정합니다. 위의 예제에서는
  `https`를 사용합니다.
- `hostname`: 이미지를 호스팅하는 서버의 호스트 이름을 지정합니다. 위의
  예제에서는 `images.unsplash.com`을 사용합니다.
- `port` (옵셔널): 이미지를 호스팅하는 서버의 포트 번호를 지정합니다. 위의
  예제에서는 빈 문자열(`''`)로 지정되어 있으므로 포트 번호가 없음을 의미합니다.
- `pathname`: 이미지 파일이 위치하는 경로를 지정합니다. 경로에
  와일드카드(`**`)를 사용하여 여러 하위 경로를 허용할 수 있습니다.

이렇게 설정하면 `https` 프로토콜을 사용하고 `images.unsplash.com` 도메인의
이미지만 허용합니다.

주의: `next.config.js` 파일을 수정한 후에는 개발 서버를 다시 시작해야 변경
사항이 적용됩니다.

이렇게 `next.config.js` 파일에서 이미지 최적화를 안 전하게 허용하는 URL 패턴을
설정하면 허용할 이미지 소스의 패턴을 명확하게 지정할 수 있습니다.

## 우선 순위 지정

만약 페이지에 다수의 이미지가 존재한다면, Next.js에게 이미지의 우선순위를
지정해주는 것이 좋습니다. 우선순위를 명시하려면 다음과 같이 `priority` prop을
사용하면 됩니다:

```tsx
<Image src={clothesImage} alt="옷" priority />
```

이렇게 `priority` prop을 지정하면 해당 이미지에 대해 로딩 우선순위를 설정할 수
있습니다. 이는 이미지가 로딩되는 동안 페이지의 렌더링 우선순위를 조정하는 데
도움이 됩니다.

## 스켈레톤 지정

이미지가 로딩되는 동안 스켈레톤 UI처럼 로딩 이미지를 추가하고 싶다면 다음과 같이
할 수 있습니다.

정적인 포트에서는 `placeholder` prop에 `'blur'`를 설정하는 것만으로도 스켈레톤
효과를 구현할 수 있습니다:

```tsx
<Image
  src={someImg}
  alt="someImg"
  width={300}
  height={300}
  placeholder="blur"
/>
```

이렇게 설정하면 이미지가 로딩되는 동안 흐릿한 이미지가 플레이스홀더로 표시되어
스켈레톤 효과를 제공합니다.

동적인 포트에서 외부 경로에서 이미지를 받아올 때는 `blurDataURL` prop을 사용하는
것이 좋습니다. `blurDataURL` prop에는 `data:image/gif;base64,`와 같이 base64로
인코딩된 이미지 픽셀 데이터가 들어갑니다. 이미지 픽셀 데이터는 10px 이하로
권장하며, 10px보다 큰 이미지를 인코딩하면 성능 저하에 대한 경고가 콘솔에 표시될
수 있습니다.

```tsx
<Image
  src={someImg}
  alt="someImg"
  width={300}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
/>
```

Next.js에서는 공식적으로 [png-pixel](https://png-pixel.com/) 이라는 사이트에서
base64로 인코딩된 이미지 픽셀을 사용하는 것을 권장하고 있습니다. 이 사이트를
통해 이미지 픽셀을 생성하여 `blurDataURL` prop에 적용할 수 있습니다.
