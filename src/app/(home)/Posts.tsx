import PostCard from "./PostCard";

const Posts = () => {
  return (
    <div className="bg-slate-400 pb-8 pt-6 ">
      <div className="container space-y-4">
        <h2 className="text-blueDarkest text-5xl font-extrabold">Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}

export default Posts;