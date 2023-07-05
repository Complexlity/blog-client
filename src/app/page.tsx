import { getPosts } from "@/lib/serverFunctions";
import SinglePost from "./SinglePost";
import Header from "@/components/Header";

export default async function Home() {
  // const posts = await getPosts();
  // if (posts === null) return <p>Something Went Wrong Please</p>;
  // if (posts.length === 0) return <p> No Posts In The Database </p>;
  return (
    <>
      <Header />
      {/* <Posts/> */}
      {/* {posts.map((post) => {
        return <SinglePost post={post} />;
      })} */}
    </>
  );
}
