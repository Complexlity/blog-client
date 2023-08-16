import { getSinglePost } from "@/lib/serverFunctions";
import { redirect } from "next/navigation";
import SinglePost from "./SinglePost";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug);
  if (!post) redirect("/");
  return (

    <>
     
  <SinglePost post={post}
  />;
  </>
  )
}
