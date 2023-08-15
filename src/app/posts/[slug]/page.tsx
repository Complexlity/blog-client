import { getSinglePost, getUser } from "@/lib/serverFunctions";
import { redirect } from "next/navigation";
import SinglePost from "./SinglePost";
import type { Metadata, ResolvingMetadata } from "next";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


type Props = {
  params: { slug: string };

};


export async function generateMetadata(
  { params,  }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const post = await getSinglePost(slug)
  return {
    title: `${post?.title} | Complexlity's Blog `,
    openGraph: {
      images: [post?.coverImageSource!],
    },
  };
}



export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug);
  const user = await getUser()
  if (!post) redirect("/");
  return (

    <>

  <SinglePost post={post} user={user}
  />;
  </>
  )
}
