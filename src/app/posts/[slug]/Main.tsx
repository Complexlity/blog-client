"use client";

import CustomCodeRenderer from "@/Components/renderers/CustomCodeRenderer";
import CustomQuoteRenderer from "@/Components/renderers/CustomQuoteRenderer";
import dynamic from "next/dynamic";
import { FC } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import PostSkeleton from "./PostSkeleton";
const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
    loading: () => <PostSkeleton />,
  }
);

interface MainProps {
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



const Main: FC<MainProps> = ({ content }) => {
  return (
    <>
      <Output renderers={renderers} data={content} config={config} />
    </>
  );
};

export default Main;
