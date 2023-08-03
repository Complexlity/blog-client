"use client";

import CustomCodeRenderer from "@/Components/renderers/CustomCodeRenderer";
import CustomQuoteRenderer from "@/Components/renderers/CustomQuoteRenderer";
import dynamic from "next/dynamic";
import { FC } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
    loading: () => <PostSkeleton />,
  }
);

interface EditorOutputProps {
  content: any;
}

const config = {
  header: {
    disableDefaultStyle: true,
  },
  paragraph: {
    disableDefaultStyle: true,
  },
};

const renderers = {
  code: CustomCodeRenderer,
  quote: CustomQuoteRenderer,
};

function PostSkeleton() {
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

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <>
      <Output renderers={renderers} data={content} config={config} />
    </>
  );
};

export default EditorOutput;
