# 정적 사이트 생성 (SSG) 렌더링

https://github.com/Seogun95/NextJS_Basic/commit/22c2fbaba3ce1161a0c4efdbdca8c9dbe8e569fb

JSON 형태의 데이터를 서버에서 가져와 컴포넌트를 정적 사이트 생성(SSG)으로 렌더링하기 위해서, 서버에서 params를 정적으로 가져오는 기능을 사용할 수 있습니다.

1. 루트 경로에 `data/settings.json` 파일 생성

```json
// settings.json 파일은 사용자 설정 메뉴의 정보를 담고 있습니다. 
// 각 메뉴는 고유한 id, 영문 이름(menu_eng), 한국어 이름(menu_kr), 비밀번호 필요 여부(needPW)를 갖습니다.

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

2. `src/service/settingMenu.tsx` 파일 생성 및 설정

```tsx
// 설정 메뉴에 대한 데이터를 처리하는 service 파일입니다.

import path from 'path';
import { promises as fs } from 'fs';

// 설정 메뉴 항목을 위한 인터페이스를 선언합니다.
export interface ISettings {
  id: string;
  menu_eng: string;
  menu_kr: string;
  needPW: boolean;
}

// settings.json 파일에서 모든 설정 메뉴 정보를 불러오는 함수입니다.
export async function getSettingMenus(): Promise<ISettings[]> {
  // process.cwd()는 현재 작업 디렉토리를 나타냅니다.
  // 여기서는 Node.js에서 실행 중인 스크립트의 현재 디렉토리를 가리킵니다.
  const filePath = path.join(process.cwd(), 'data', 'settings.json');

  // fs는 Node.js의 파일 시스템 모듈입니다.
  // promises 모듈은 fs 모듈의 함수들을 Promise 기반으로 변경하여 사용할 수 있게 합니다.
  // readFile 함수는 파일의 내용을 비동기적으로 읽어옵니다.
  // filePath 경로에 있는 'settings.json' 파일의 내용을 'utf-8' 인코딩으로 읽어옵니다.
  const data = await fs.readFile(filePath, 'utf-8');

  // JSON.parse 함수를 사용하여 JSON 형식의 문자열을 JavaScript 객체로 변환합니다.
  // 읽어온 JSON 데이터를 파싱하여 ISettings[] 타입의 배열로 반환합니다.
  return JSON.parse(data);
}

// settings.json 파일에서 특정 id에 해당하는 설정 메뉴 정보를 불러오는 함수입니다.
export async function getSettingMenu(
  id: string,
): Promise<ISettings | undefined> {
  const settings = await getSettingMenus();
  return settings.find(item => item.id === id);
}

```

3. `src/app/settings/page.tsx` 파일 생성 및 설정

`settingHome` 컴포넌트를 `Promise` 형태인 `async`/`await`으로 만들어 주고, `getSettingMenus()` 함수를 불러와 맵핑 해줍니다. 

그 뒤에, href는 settings의 `id`를 참조하고, 텍스트 부분은 JSON에서 설정한 `menu_kr` 값을 사용합니다

```tsx
// 이 페이지 컴포넌트는 모든 설정 메뉴를 리스트로 출력합니다.
import { getSettingMenus } from '@/service/settingMenu';
import Link from 'next/link';

export default async function SettingHome() {
// 모든 설정 메뉴를 불러옵니다.
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

4. `src/app/settings/slug/page.tsx` 파일 생성 및 설정

마찬가지로 컴포넌트를 `async`/`await`으로 감싸고, `getSettingMenu`에 slug의 param 매개변수를 넣어준 뒤에, 해당하는 url이 존재 하지 않는다면 NotFound를 출력해줍니다.

```tsx
// 이 페이지 컴포넌트는 특정 설정 메뉴의 세부 정보를 출력합니다.
import NotFound from '@/app/not-found';
import { getSettingMenu, getSettingMenus } from '@/service/settingMenu';
import { Metadata } from 'next';

// props로 전달받는 params에서 slug 값을 추출합니다.
interface SettingProps {
  params: {
    slug: string;
  };
}

// TODO: 서버 파일에 있는 데이터 중 해당 페이지의 정보를 찾아서 보여줌
export default async function SettingDetail({
  params: { slug },
}: SettingProps) {
  const settingMenu = await getSettingMenu(slug);

	// 찾는 메뉴가 없을 경우 NotFound 컴포넌트를 반환합니다.
  if (!settingMenu) {
    return <NotFound />;
  }
  return <h1>내정보 - {settingMenu.menu_kr} 페이지</h1>;
}

```

5. `generateStaticProps()` 함수 사용을 통한 SSG 렌더링 구현

SSG 렌더링을 위해 페이지의 골격을 정적으로 렌더링 하려면 generateStaticProps() 함수를 사용할 수 있습니다.

```tsx
// TODO: 모든 설정의 페이지들을 미리 만들어 렌더링 (SSG)
// 동적 라우팅에서 특정한 path만 static 하게 해주는 generateStaticParams()
export const generateStaticParams = async () => {
  const settings = await getSettingMenus();
  return settings.map(item => ({ slug: item.id }));
};

```

6. 만약, slug 폴더에서 Dynamic metaData를 사용하려면 generateMetadata() 함수를 사용합니다.

```tsx
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
