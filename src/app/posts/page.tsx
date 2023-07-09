import PostSectionTemp from '@/components/(posts)/PostSectionTemp';
import {
  categorizedPost,
  getNextPosts,
  getPlayPosts,
} from '@/service/markdownData';

export default async function BlogHomepage() {
  const [nextFolder, playFolder] = await Promise.all([
    getNextPosts(),
    getPlayPosts(),
  ]);
  const getNextPost = categorizedPost(nextFolder);
  const getPlayPost = categorizedPost(playFolder);

  return (
    <>
      <h1>NextJS</h1>
      <PostSectionTemp categoryData={getNextPost} type="list" />
      <h1>잡담</h1>
      <PostSectionTemp categoryData={getPlayPost} type="carousel" />
    </>
  );
}
