"use client";

import useSession from "@/hooks/useSession";
import { OmittedComment, User } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

type Props = {
  comment: OmittedComment
  user: User | null
}


function SingleComment({ comment, user }: Props) {

  return (
    <div className="space-y-4 py-4">
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
          <span>{formatDate(comment.createdAt)}</span>
        </div>
      </div>
      <p className="prose break-all">{comment.comment}</p>

      <div className="flex items-center justify-between">
        <LikeButton
          id={comment._id}
          likes={comment.likes}
          likeCount={comment.likeCount}
          type="comments"
          user={user}
        />
        {user?._id === comment.user._id ? (
          <DeleteButton id={comment._id} />
        ) : null}
      </div>
    </div>
  );
}

export default SingleComment;
