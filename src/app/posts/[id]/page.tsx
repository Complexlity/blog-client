'use client'

import { usePostsContext } from "@/contexts/PostsProvider"
import SinglePost from "./SinglePost"
// import { getSinglePost } from '@/lib/serverFunctions'
import {redirect} from 'next/navigation'

export default async function Post({params}: {params: {id: string}}) {
  const posts = usePosts()
  // const post = await getSinglePost(params.id)
  // if(!post) redirect('/')
  return (
    <SinglePost post={post} />
  )
}