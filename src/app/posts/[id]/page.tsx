
import SinglePost from "./SinglePost"
import { getSinglePost, getUser } from '@/lib/serverFunctions'
import {redirect} from 'next/navigation'
import usePosts from "@/hooks/usePosts"


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Post({params}: {params: {id: string}}) {
  const post = await getSinglePost(params.id)
  if (!post) redirect('/')
  return (
    <SinglePost post={post}
    />
  )
}