'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Heart } from "lucide-react";
import Image from "next/image";
import defaultImg from "../../../public/default.svg";

function CommentSection() {
  return (
    <>
      <h3>Comments (3)</h3>
      <div className="content divide-y-2">
        <div className="grid">
          <div className="flex gap-4 items-center">
            <Image
              src={defaultImg}
              width={24}
              height={24}
              className="rounded-full object-cover h-8 w-8"
              alt=""
            />
            Complexlity
          </div>
          <Textarea placeholder="Write a thoughful comment" />
          <Button className="justify-self-end">Comment</Button>
        </div>

        <div className="comments py-2">
          <div className="dropdown dropdown-bottom p-0">
            <label
              tabIndex={0}
              className="flex px-1 py-1 items-center m-1 w-36 cursor-pointer rounded-md hover:slate-100 border-slate-400 border-2 gap-2"
            >
              Top Comments
              <ChevronDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] divide-y-2 shadow  -mr-2 w-36 rounded-md"
            >
              <li className=" grid items-center hover:bg-slate-200 cursor-pointer px-4 py-2">
                Top Comments
              </li>
              <li className="grid items-center hover:bg-slate-200 cursor-pointer px-4 py-2">
                New Comments
              </li>
            </ul>
          </div>
          <div className="divide-y-2">
            <SingleComment />
            <SingleComment />
          </div>
        </div>
      </div>
    </>
  );
}

function SingleComment() {
  return (
    <div className="space-y-4">
      <div className="profile flex items-center gap-1">
        <Image src={defaultImg} alt="" width={12} height={12} className="object-cover w-8 h-8 rounded-full" />
        <div>
          <p className="font-bold">Complexlity</p>
          <span>Jul 5</span>
        </div>
      </div>
      <div className="prose">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id velit vitae quaerat.
      </div>
      <div className="flex gap-1">
        <Heart /> 1
      </div>
    </div>
  )
}


export default CommentSection;