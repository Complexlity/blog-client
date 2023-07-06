'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Heart } from "lucide-react";
import Image from "next/image";
import defaultImg from "../../../../public/default.svg";
import {  OmittedComment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function CommentSection({ comments }: { comments: OmittedComment[] }) {

  return (
    <div className="">
  <h3 className="font-semibold text-xl">Comments ({comments.length})</h3>
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
            <span className="font-bold">Complexlity</span>
          </div>
          <Textarea
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
            placeholder="Write a thoughful comment"
          />
          <Button className="justify-self-end">Comment</Button>
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
            {
              comments.length !== 0
                ?
                  comments.map(comment => (
                    <SingleComment comment={comment} />
                    ))
                :
                <h3 className="m-2 text-2xl text-blueDarkest font-bold">No Comments Added Yet</h3>
                }

          </div>
        </div>
      </div>
    </div>
  );
}

function SingleComment({ comment }: { comment: OmittedComment }) {
  console.log(comment)
  return (
    <div className="space-y-4 my-4">
      <div className="profile flex items-center gap-1">
        <Image
          src={defaultImg}
          alt=""
          width={12}
          height={12}
          className="object-cover w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-bold">{comment.user.name}</p>
          <span>{formatDate(comment.createdAt, 'full')}</span>
        </div>
      </div>
      <div className="prose">
        {comment.comment}
      </div>
      <div className="flex items-center">
        <div className="rounded-full p-2 hover:bg-rose-100 hover:text-rose-600">
          <Heart size={23} />
        </div>
        <span>{comment.likeCount}</span>
      </div>
    </div>
  );
}


export default CommentSection;
