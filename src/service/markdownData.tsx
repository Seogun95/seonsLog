import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface PostMatter {
  title: string;
  description: string;
  tags: string[];
  date: string;
}

interface Post extends PostMatter {
  slug: string;
  content: string;
  readingMinutes: number;
  wordCount: number;
  category: string;
}

const BASE_PATH = '/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

const parsePost = (postPath: string): Post | undefined => {
  try {
    const file = fs.readFileSync(postPath, { encoding: 'utf8' });
    const { content, data } = matter(file);
    const grayMatter = data as PostMatter;

    // md파일에 PostMatter 형식이 없으면 undefined 리턴
    if (!grayMatter.title || !grayMatter.description || !grayMatter.date) {
      return undefined;
    }

    // 카테고리 : 대분류
    const mainCategory =
      path.dirname(postPath).split(path.sep).slice(-2, -1)[0] || '';

    // 카테고리 : 소분류
    const subCategory = path.basename(path.dirname(postPath));
    const formatCategory = `${mainCategory}/${subCategory}`.toUpperCase();

    return {
      ...grayMatter,
      date: dayjs(grayMatter.date).format('YYYY-MM-DD'),
      category: formatCategory,
      wordCount: content.split(/\s+/gu).length,
      readingMinutes: Math.ceil(readingTime(content).minutes),
      slug: postPath
        .slice(postPath.indexOf(BASE_PATH))
        .replace('.md', '')
        .replace(/ /g, ''),
      content,
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * 포스터는 항상 최신순으로 정렬됩니다.
 * @property {string} title - 포스트 제목
 * @property {string} description - 포스트 설명
 * @property {string[]} tags - 포스트 태그 배열
 * @property {string} date - 포스트 날짜
 * @property {string} slug - 포스트 슬러그
 * @property {string} content - 포스트 내용
 * @property {number} readingMinutes - 포스트 읽는 시간 (분)
 * @property {number} wordCount - 포스트 단어 수
 * @property {string} category - 포스트 카테고리
 */

export const getAllPosts = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.md`);
  const posts: Post[] = postPaths
    .map(parsePost)
    .filter((post): post is Post => post !== undefined);

  // 최신순 정렬
  posts.sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf();
  });
  // sort가 된 후, 날짜 형식을 변경
  posts.forEach(post => {
    post.date = dayjs(post.date).fromNow();
  });

  return posts;
};
