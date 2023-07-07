'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OmittedComment } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import defaultImg from "../../../../public/default.svg";
import SingleComment from "./SingleComment";

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
                    <>
                    <SingleComment comment={comment} />
                    </>
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



export default CommentSection;
