import { Post } from './types'

const fetchPosts =async  () => {
  const response = await fetch(`${process.env.SERVER_DOMAIN}/posts`, {
    cache: "no-store",
  });
  const posts = await response.json() as unknown as Post[]
  return posts
}

export default async function Home() {
  const posts = await fetchPosts()
  console.log(posts)
  return (
<>
      {posts.map((post) => {
        return <div key={post._id}>{post.title}</div>;
      })}
    </>
  );
}
