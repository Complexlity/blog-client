import { OmittedComment } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import LikeButton from "./LikeButton";
import Image from "next/image";
import defaultImg from "../../../../public/default.svg";

function SingleComment({ comment }: { comment: OmittedComment }) {
  console.log(comment)
  return (
    <div className="space-y-4  py-4">
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
          <span>{formatDate(comment.createdAt, "full")}</span>
        </div>
      </div>
      <div className="prose">{comment.comment}</div>
      <div className="flex items-center">
        <LikeButton
          id={comment._id}
          likes={comment.likes}
          likeCount={comment.likeCount}
          type="comments"
        />
      </div>
    </div>
  );
}

export default SingleComment