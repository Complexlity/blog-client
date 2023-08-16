import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function EditorSkeleton() {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#d1d5db">
      <div className="max-w-[65ch] mb-0 w-full mx-auto">
        <form id="subreddit-post-form" className="w-full grid">
          <div className="flex gap-2 items-center my-2">
            <Skeleton circle={true} height={32} width={32} />
            <Skeleton width={`150px`} height={24} />

            <Skeleton
              width={"120px"}
              height={32}
              className="rounded-full"
              borderRadius={`9999vw`}
            />
          </div>

          <div className="">
            <div id="" className="min-h-[45vh] mb-2">
              <Skeleton height={`100%`} className="h-full  min-h-[45ch]" />
            </div>
            <p className="text-sm text-gray-500 w-full max-w-[500px] mx-auto">
              <Skeleton height={`35px`} />
            </p>
          </div>
        </form>
      </div>
    </SkeletonTheme>
  );
}