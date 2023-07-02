import { getPosts } from '@/lib/serverFunctions';
import SinglePost from './SinglePost'


export default async function Home() {
  const posts = await getPosts();
  if(posts === null) return <p>Something Went Wrong Please</p>
  if(posts.length === 0) return <p> No Posts In The Database </p>
  return (
    <>
      {posts.map((post) => {
        return (
          <SinglePost post={post} />
        );
      })}
    </>
  );
}
