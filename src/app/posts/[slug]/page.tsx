import { getSinglePost } from "@/lib/serverFunctions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SinglePost from "./SinglePost";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const post = await getSinglePost(slug);

  const fcMetadata: Record<string, string> = {
    "fc:frame": "vNext",
    "fc:frame:image": `${post?.coverImageSource}`,
    "fc:frame:button:1": "Read",
    "fc:frame:button:1:action": "link",
    "fc:frame:image:aspect_ratio": "1:1",
    "fc:frame:button:1:target": `${process.env.HOST}/posts/${slug}`,
    "of:version": "vNext",
    "of:image": `${post?.coverImageSource}`,
    "of:button:1": "Read",
    "of:button:1:action": "link",
    "of:button:1:target": `${process.env.HOST}/posts/${slug}`,
    "of:image:aspect_ratio": "1:1",
    "of:accepts:xmtp": "2024-02-01",
    "of:accepts:lens": "1.1",
  };

  return {
    title: `${post?.title} | Complexlity's Blog`,
    description: post?.content.slice(0, 120) + "...",
    openGraph: {
      images: [post?.coverImageSource!],
    },
    other: {
      ...fcMetadata,
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug);

  if (!post) redirect("/");
  return (
    <>
      <SinglePost post={post} slug={params.slug} />;
    </>
  );
}
