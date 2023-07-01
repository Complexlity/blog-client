"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserContext } from "@/Contexts/SessionProvider";
import useSession from "@/hooks/useSession";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";


const LikeButton = ({ id, likes, likeCount }: { id: string, likes: string[], likeCount: number }) => {
  const user = useSession()
  // const user = null
  const [likedByMe, setLikedByMe] = useState<boolean>(user ? likes.includes(user?._id) : false);
  const [likeNumber, setLikeNumber] = useState(likeCount)
  async function likePost() {
    setLikedByMe(!likedByMe)
    setLikeNumber(likedByMe ? likeNumber - 1 : likeNumber + 1)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${id}`,{
      method: "PUT",
      credentials: "include"
    })
    
  }

  return (
      <div className="flex gap-2 items-center">
      {user ? <HeartWithUser likePost={likePost} likedByMe={likedByMe} />: <HeartWithoutUser />}
    <p>{likeNumber}</p>
      </div>
  )
};

function HeartWithUser({ likePost, likedByMe }: { likePost: () => void, likedByMe: boolean}) {
  return <Heart className={"hover:fill-rose-400"} color={"black"} fill={ likedByMe ? "red" : 'none' } onClick={likePost}/>
}

function HeartWithoutUser() {
  return (

    <HoverCard>
      <HoverCardTrigger><Heart  className="fill-gray-200 text-gray-300" /></HoverCardTrigger>
    <HoverCardContent className="border-0 border-transparent p-2 text-gray-400">
      Login to like posts
    </HoverCardContent>
  </HoverCard>
    )

}

export default LikeButton;
