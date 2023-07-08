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
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import useSession from "@/hooks/useSession";

function CommentSection({ postId, comments }: { postId: string, comments: OmittedComment[] }) {
    const { toast } = useToast();
    const user = useSession();
    const [postComments, setpostComments] = useState(comments);
  const [comment, setComment] = useState("");
  console.log(postComments)
  const { mutate: createComment, isLoading } = useMutation({

      //@ts-ignore
      mutationFn: async () => {
        return await axios.post<Comment>(
          `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${postId}/comments`,
          {
            comment,
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
          setpostComments([...postComments, data.data]);

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
                        value={comment}
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
              className="flex px-1 py-1 items-center  w-36 cursor-pointer rounded-md hover:slate-100 border-slate-400 border-2 gap-2"
            >
              Top Comments
              <ChevronDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] divide-y-2 shadow  -mr-2 w-36 rounded-lg overflow-hidden"
            >
              <li className=" grid items-center hover:bg-slate-200 cursor-pointer px-4 py-2 bg-white ">
                Top Comments
              </li>
              <li className="grid items-center hover:bg-slate-200 cursor-pointer px-4 py-2  bg-white ">
                New Comments
              </li>
            </ul>
          </div>
          <div className="divide-y-2">
            {postComments.length !== 0 ? (
              postComments.map((comment) => (
                <>
                  <SingleComment comment={comment} />
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
