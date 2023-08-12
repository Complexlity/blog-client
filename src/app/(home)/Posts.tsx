import { getPosts } from "@/lib/serverFunctions";
import PostCard from "./PostCard";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Posts = async () => {
  const posts = await getPosts();

  return (
    <div className="bg-slate-400 pb-8 pt-6 ">
      <div className="container space-y-4 max-w-[1200px] ">
        <h2 className="font-roboto text-blueDarkest text-5xl font-extrabold">
          Posts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
