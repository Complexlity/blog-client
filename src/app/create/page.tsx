import { Metadata } from "next";
import CreateForm from "./CreateForm";
import { Editor } from "@/app/create/Editor";
import EditorOutput from "./EditorOutput";

export const metadata: Metadata = {
  title: "Create New Post | Complex blog",
  description: "The best create a new post for you blog",
};

export default function createPost() {

  return (
    <div className="h-screen w-screen grid content-center gap-4 justify-center items-center">
      {/* hello world */}
      {/* <Editor/> */}
      <CreateForm />
      
    </div>
  );
}
