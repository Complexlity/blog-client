import { Skeleton } from "../Components/ui/skeleton";
import { getPosts } from "@/lib/serverFunctions";
import { Suspense } from "react";
import PostCard from "./PostCard";

export default async function Posts() {
  return (
    <div className="bg-slate-400 pb-8 pt-6 ">
      <div className="container space-y-4 max-w-[1200px] ">
        <h2 className="font-roboto text-blueDarkest text-5xl font-extrabold">
          Posts
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense fallback={<PostsSkeleton />}>
            <ActualPosts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function PostsSkeleton() {
  const l = [1, 2, 3];
  return (
    <>
      {l.map((_, i) => (
        <Skeleton
          key={i}
          className="w-full h-[500px] sm:h-[450px] bg-blueDark rounded-2xl"
        />
      ))}
    </>
  );
}

async function ActualPosts() {
  let posts = await getPosts();
  if (!posts) posts = [];
  return <>{posts?.map((post) => <PostCard post={post} key={post._id} />)}</>;
}
