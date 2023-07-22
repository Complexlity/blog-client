'use client'

import { usePostsContext } from "@/contexts/PostsProvider"
import SinglePost from "./SinglePost"
// import { getSinglePost } from '@/lib/serverFunctions'
import {redirect} from 'next/navigation'
import usePosts from "@/hooks/usePosts"

export default function Post({params}: {params: {id: string}}) {
  const posts = usePosts()
<<<<<<< HEAD
  if(!posts) redirect('/')
  const post = posts.filter(post => post._id === params.id)[0]
  if (!post) redirect('/')
=======
  console.log(posts)
  if(!posts) redirect('/')
  const post = posts.filter(post => post._id === params.id)[0]
  if(!post) redirect('/')
>>>>>>> bug
  return (
    <SinglePost post={post} />
  )
}