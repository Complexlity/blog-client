import { getUser } from "@/lib/serverFunctions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CreateForm from "./CreateForm";

export const metadata: Metadata = {
  title: "Create New Post | Complex blog",
  description: "The best create a new post for you blog",
};

export default async function createPost() {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <CreateForm />
    </div>
  );
}
