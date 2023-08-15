import { getUser } from "@/lib/serverFunctions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CreateForm from "./CreateForm";

export const metadata: Metadata = {
  title: "Create New Post | Complexlity's blog",
  description: "Write your own story for the whole world to be a part of",
};

export default async function createPost() {
  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <CreateForm />
    </div>
  );
}
