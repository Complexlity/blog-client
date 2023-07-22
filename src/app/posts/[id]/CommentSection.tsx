'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OmittedComment } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import defaultImg from "../../../../public/default.svg";
import SingleComment from "./SingleComment";
import { Comment, Post } from "@/lib/types";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import useSession from "@/hooks/useSession";
import { cn } from "@/lib/utils";

function CommentSection({ postId, comments }: { postId: string, comments: OmittedComment[] }) {
    const { toast } = useToast();
    const user = useSession();
    const [postComments, setPostComments] = useState(comments);
  const [newComment, setComment] = useState("");
  const [commentOrder, setCommentOrder] = useState('New')
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

  useEffect(() => {
    if (commentOrder === "New") {
    const sortedComments = [...postComments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
      setPostComments(sortedComments);

    } else if (commentOrder === "Top") {
      const sortedComments = [...postComments].sort(
        (a, b) => b.likeCount - a.likeCount
      );
      setPostComments(sortedComments);
    }
  }, [commentOrder]);


    function handleSubmit(e: any) {
      e.preventDefault();
      createComment();
    }

  return (
    <div className="">
      <h3 className="font-semibold text-xl">Comments ({postComments.length})</h3>
      <div className="content divide-y-2">
        <div className="grid gap-4 my-6">
          <div className="flex gap-2 items-center">
            <Image
              src={defaultImg}
              width={24}
              height={24}
              className="rounded-full object-cover h-8 w-8"
              alt=""
            />
            <span className="font-bold">{user?.name}</span>
          </div>
          <form className="grid" onSubmit={handleSubmit}>
            <Textarea
              className="resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
              placeholder="Write a thoughful comment"
              onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        value={newComment}
            />
            <Button isLoading={isLoading} className="justify-self-end">
              Comment
            </Button>
          </form>
        </div>

        <div className="comments py-2">
          <div className="dropdown dropdown-bottom p-0">
            <label
              tabIndex={0}
              className="flex px-1 py-1 items-center justify-between w-[9.5rem] cursor-pointer rounded-md hover:slate-100 border-slate-400 border-2 gap-2"
            >
              {commentOrder === "Top" ? 'Top Comments' : commentOrder  === 'New' ? "New Comments" : null}
              <ChevronDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] divide-y-2 shadow  -mr-2 w-36 rounded-lg overflow-hidden"
            >
              <li onClick={() => {
                setCommentOrder("Top")
              }} className={cn([`grid items-center hover:bg-slate-300 cursor-pointer px-4 py-2 bg-white`, commentOrder === 'Top' ? 'bg-slate-200': ''])}>
                Top Comments
              </li>
              <li onClick={() => {
                setCommentOrder("New")
              }} className={cn([`grid items-center hover:bg-slate-300 cursor-pointer px-4 py-2 bg-white`, commentOrder === 'New' ? 'bg-slate-200': ''])}>
                New Comments
              </li>
            </ul>
          </div>
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
