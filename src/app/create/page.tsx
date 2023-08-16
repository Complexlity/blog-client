import { Metadata } from "next";
import Editor from "./Editor";

export const metadata: Metadata = {
  title: "Create New Post | Complex blog",
  description: "The best create a new post for you blog",
};

export default async function createPost() {
  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <Editor />
    </div>
  );
}
