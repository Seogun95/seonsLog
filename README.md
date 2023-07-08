# NextJS로 개인 블로그

프로젝트 기간: 2023. 07. 06 ~

## 목표 MVP

- [x] 마크다운 포스트 파일 경로를 동적으로 가져오기 [2023.07.06]
- [x] 포스트 파일 파싱 함수 정의: 포스트 파일을 파싱하여 `Post` 객체로 변환하는
      함수를 정의. 이 함수는 파일 경로를 입력받아 파일을 읽고, Front Matter와
      내용을 추출한 후, 유효성을 검사하고 필요한 가공 작업을 수행한 뒤 `Post`
      객체를 반환해야함. [2023.07.07]
- [x] 모든 포스트 가져오기 함수 정의: 포스트 파일들을 읽어와 `Post` 객체들로
      변환한 후, 최신 순서로 정렬하여 반환하는 함수를 정의. [2023.07.07]
- [x] 다중 동적 라우팅 SSG 렌더링 [2023.07.07]
- [x] 포스팅 홈 페이지 카테고리별 정렬 [2023.07.08]
- [x] 프로그래스 로딩 바 [2023.07.08]
- [ ] 네비게이션바 라우팅 링크 enum으로 생성 왼쪽: (이름(로고), 블로그, 이메일,
      알아보기) / 오른쪽: (깃허브, 티스토리)
- [ ] 메인 홈 페이지 구성
- [ ] 마크다운 스타일링 및 코드블럭 하이라이트 적용
- [ ] 이메일 전송 페이지 (nodemailer)
- [ ] 포스팅 디테일 페이지 - 왼쪽 사이드바에 각 카테고리에 맞는 포스팅 목록 링크
      생성
- [ ] 포스팅 디테일 페이지 - 오른쪽 사이드바에 각 H1, H2 테그에 맞는 플로팅 목차
      생성

---

## 사용 라이브러리

- [ ] react-icons
- [ ] react-multi-carousel
- [x] react-markdown
- [ ] react-syntax-highlighter
- [ ] nodemailer
- [ ] yup
- [ ] react-hook-form
- [x] tailwindcss
- [x] glob
- [x] gray-matter
- [x] reading-time
- [x] dayjs
- [x] @kfarwell/nextjs-toploader

## 사용 플러그인

- [ ] eslint-plugin-import : import 순서 및 기타 eslint를 통해 구문 관리
- [ ] prettier-plugin-tailwindcss : 테일윈드의 클래스 정렬을 위한 클래스 순서 플러그인

