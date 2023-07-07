import SinglePost from "./SinglePost"
import { getSinglePost } from '@/lib/serverFunctions'
import {redirect} from 'next/navigation'

export default async function Post({params}: {params: {id: string}}) {

  const post = await getSinglePost(params.id)
  if(!post) redirect('/')
  return (
    <SinglePost post={post} />
  )
}