import { Post } from "../lib/types";
import LikeButton from "./like-button";

const fetchPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts`,
    {
      cache: "no-store",
    }
  );
  const posts = (await response.json()) as unknown as Post[];
  return posts;
};

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            {post.title}
            <LikeButton id={post._id} likes={post.likes} likeCount={post.likeCount} />
          </div>
        );
      })}
    </>
  );
}
