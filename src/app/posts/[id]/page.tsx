'use client'

import { usePostsContext } from "@/contexts/PostsProvider"
import SinglePost from "./SinglePost"
// import { getSinglePost } from '@/lib/serverFunctions'
import {redirect} from 'next/navigation'
import usePosts from "@/hooks/usePosts"

export default async function Post({params}: {params: {id: string}}) {
  const posts = usePosts()
  if(!posts) redirect('/')
  const post = posts.filter(post => post._id === params.id)[0]
  if(!post) redirect('/')
  return (
    <SinglePost post={post} />
  )
}