export interface IRoutePath {
  id: string;
  menu_eng: string;
  menu_kr: string;
  slug: string;
}

export const routePath: IRoutePath[] = [
  {
    id: '1',
    menu_eng: 'blog',
    menu_kr: '블로그',
    slug: '/posts',
  },
  {
    id: '2',
    menu_eng: 'email',
    menu_kr: '이메일',
    slug: '/email',
  },
  {
    id: '3',
    menu_eng: 'about',
    menu_kr: '정보',
    slug: '/about',
  },
  {
    id: '4',
    menu_eng: 'contact',
    menu_kr: '연락',
    slug: '/contact',
  },
];
