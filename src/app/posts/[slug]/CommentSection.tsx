"use client";

import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";
import useSession from "@/hooks/useSession";
import { Comment, OmittedComment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SingleComment from "./SingleComment";

function CommentSection({
  postId,
  comments,
}: {
  postId: string;
  comments: OmittedComment[];
}) {
  const MAXIMUM_COMMENT_LENGTH = 100;
  const { toast } = useToast();
  const user = useSession();
  const [postComments, setPostComments] = useState(comments);
  const [newComment, setComment] = useState("");
  const allowance = MAXIMUM_COMMENT_LENGTH - newComment.length;

  useEffect(() => {
    setPostComments(comments);
  }, [comments]);

  const { mutate: createComment, isLoading } = useMutation({
    //@ts-ignore
    mutationFn: async () => {
      return await axios.post<Comment>(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${postId}/comments`,
        {
          comment: newComment,
        },
        { withCredentials: true }
      );
    },
    onSettled(data, error, variables, context) {
      if (error) {
        if (isAxiosError(error)) {
          toast({
            description: error.response?.data.message,
            variant: "destructive",
          });
          return;
        }
      }

      if (data) {
        setComment("");
        setPostComments([data.data, ...postComments]);

        return toast({
          title: "Comment Inserted",
          description: "I was a success",
        });
      }
    },
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    createComment();
  }

  const almostTooLong = allowance < 10;
  function updateComment(e: any) {
    const newValue = e.target.value;
    if (newValue.length > MAXIMUM_COMMENT_LENGTH) {
      return;
    }
    setComment(e.target.value);
  }

  return (
    <div className="">
      <h3 className="font-semibold text-xl">
        Comments ({postComments.length})
      </h3>
      <div className="content divide-y-2">
        {user ? (
          <div className="grid gap-4 my-6">
            <div className="flex gap-2 items-center">
              <Image
                src={user.imageSrc}
                width={24}
                height={24}
                className="rounded-full object-cover h-10 w-10 object-top"
                alt=""
                unoptimized
              />
              <span className="font-bold">{user.name}</span>
            </div>
            <form className="grid" onSubmit={handleSubmit}>
              <TextareaAutosize
                placeholder="Write a thoughful comment"
                className="resize-none border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 text-lg mb-4"
                minRows={2}
                onChange={updateComment}
                value={newComment}
              />
              <div
                className={cn(
                  `${
                    almostTooLong ? "bg-red-200" : "bg-blue-400"
                  } rounded-full  justify-self-end  flex items-center justify-center w-10 h-10 mb-2`
                )}
              >
                {allowance}
              </div>
              <Button isLoading={isLoading} className="justify-self-end">
                Comment
              </Button>
            </form>
          </div>
        ) : null}
        <div className="comments py-2">
          <div className="divide-y-2">
            {postComments.length !== 0 ? (
              postComments.map((comment) => (
                <>
                  <SingleComment comment={comment} key={comment._id} />
                </>
              ))
            ) : (
              <h3 className="m-2 text-2xl text-blueDarkest font-bold">
                No Comments Added Yet
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
