import PostCard from "./PostCard";

const Posts = () => {
  return (
    <div className="bg-orangeAccent pb-20 pt-16 ">
      <div className="container space-y-6">
        <h2 className="text-blueDarkest text-5xl font-extrabold">Posts</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}

export default Posts;