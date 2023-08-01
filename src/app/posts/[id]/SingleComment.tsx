'use client'

import { OmittedComment } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import LikeButton from "./LikeButton";
import Image from "next/image";
import defaultImg from "../../../../public/default.svg";
import useSession from "@/hooks/useSession";
import DeleteButton from "./DeleteButton";

function SingleComment({ comment }: { comment: OmittedComment }) {
  const user = useSession()
  // console.log(comment.user)
  return (
    <div className="space-y-4  py-4">
      <div className="profile flex items-center gap-1">
        <Image
          unoptimized
          src={comment.user.imageSrc}
          alt=""
          width={12}
          height={12}
          className="object-cover w-10 h-10 rounded-full object-top"
        />
        <div>
          <p className="font-bold">{comment.user.name}</p>
          <span>{formatDate(comment.createdAt, "full")}</span>
        </div>
      </div>
      <div className="prose">{comment.comment}</div>

      <div className="flex items-center justify-between">
        <LikeButton
          id={comment._id}
          likes={comment.likes}
          likeCount={comment.likeCount}
          type="comments"
        />
        {user?._id === comment.user._id ? <DeleteButton
          id={comment._id}
        /> : null}

      </div>
    </div>
  );
}

export default SingleComment