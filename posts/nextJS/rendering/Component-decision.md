# 서버와 클라이언트 선택

[공식 문서](https://nextjs.org/docs/getting-started/react-essentials#when-to-use-server-and-client-components)

Server Components (서버 컴포넌트)와 Client Components (클라이언트 컴포넌트) 중 어떤 것을 선택해야 할지 결정하기 위해, 우리는 Client Component가 필요한 경우를 제외하고는 Server Components를 사용하는 것을 권장합니다.

| 해야 할 일                                       | Server Component | Client Component |
|---------------------------------------------------|------------------|------------------|
| 데이터 가져오기                                   | ✅                | ❌                |
| 백엔드 리소스에 접근 (직접적으로)                 | ✅                | ❌                |
| 서버에 민감한 정보 유지 (액세스 토큰, API 키 등) | ✅                | ❌                |
| 서버에 의존하고 있는 무거운 동작 / 클라이언트 자바스크립트 축소 | ✅                | ❌                |
| 상호작용 및 이벤트 리스너 추가  (`onClick()`, `onChange()`, etc)                 | ❌                | ✅                |
| 상태 및 라이프사이클 효과 사용  (`useState()`, `useReducer()`, `useEffect()`, etc)                 | ❌                | ✅                |
| 브라우저 전용 API 사용                           | ❌                | ✅                |
| 상태, 효과 또는 브라우저 전용 API에 의존하는 사용자 정의 훅 사용 |  | ✅                |
| React 클래스 컴포넌트 사용                       | ❌                | ✅                |

참고: 
✅는 해당 작업에 대해 해당 컴포넌트 유형이 적합하다는 것을 나타내며, 
❌은 해당 작업에 일반적으로 사용되지 않는 컴포넌트 유형을 나타냅니다.

![](https://i.imgur.com/y4aygmY.png)

