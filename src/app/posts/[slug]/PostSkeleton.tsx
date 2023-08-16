import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostSkeleton() {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#d1d5db">
      <div className="w-full prose mx-auto z-[-10] -mt-5">
        <div className="text-sm text-gray-500">
          <Skeleton height={`30`} />
          <Skeleton height={`30`} width={`80%`} />
          <Skeleton height={`30`} width={`50%`} />
          <Skeleton height={`30`} width={`80%`} />
          <Skeleton height={`30`} width={`40%`} />
          <Skeleton height={`30`} width={`50%`} />
          <Skeleton height={`30`} width={`90%`} />
          <Skeleton height={`30`} width={`80%`} />
          <Skeleton height={`30`} />
        </div>
      </div>
    </SkeletonTheme>
  );
}