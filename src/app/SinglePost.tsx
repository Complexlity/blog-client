'use client'

import { Comment, Post } from "@/lib/types";
import LikeButton from "./LikeButton";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useMutation } from "react-query";
import { useState } from "react";
import axios from 'axios'
import { useToast } from "@/Components/ui/use-toast";
import useSession from "@/hooks/useSession";


const SinglePost = ({ post }: { post: Post }) => {
  const { toast } = useToast()
  const user = useSession()
  const [comments, setComments] = useState(post.comments)
  const [comment, setComment] = useState('')
  const { mutate: createComment } = useMutation({
    //@ts-ignore
    mutationFn: async () => {

      return await axios.post<Comment>(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${post._id}/comments`, {
        comment
      }, { withCredentials: true})
    },
    onSettled(data, error, variables, context) {
      if (error) {
        toast({
          description: "Something Went Wrong",
          variant: 'destructive'
        })
        return
      }

      if (data) {
        setComment('')
        setComments([...comments, data.data])

        return toast({
          title: "Comment Inserted",
          description: "I was a success"
        })
      }
    }
  })

  function handleSubmit(e: any) {
    e.preventDefault()
    createComment()
  }

  return (
    <div key={post._id}>
      <p>{user ? user.name : null}</p>
      <p>
        {post.title} - by <span className="italic text-sm text-green-600">{post.author.name}</span>
      </p>

      <LikeButton
        id={post._id}
        likes={post.likes}
        likeCount={post.likeCount}
        type={"posts"}
      />
      {comments.map((comment) => {
        return (
          <>
            <p>
              {comment.comment} - {comment.user.name}
            </p>
            <LikeButton
              id={comment._id}
              likes={comment.likes}
              likeCount={comment.likeCount}
              type="comments"
            />
          </>
        );
      })}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="comment here"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
}

export default SinglePost;