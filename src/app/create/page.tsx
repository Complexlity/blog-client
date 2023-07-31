import { Metadata } from "next";
import CreateForm from "./CreateForm";
import { getUser } from "@/lib/serverFunctions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create New Post | Complex blog",
  description: "The best create a new post for you blog",
};

export default async function createPost() {
  const user = await getUser()
  if(!user) redirect("/login")
  return (
    <div className="h-screen w-screen grid content-center gap-4 justify-center items-center">
      <CreateForm />

    </div>
  );
}
