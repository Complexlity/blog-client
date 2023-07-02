"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";
import useSession from "@/hooks/useSession";
import axios from 'axios'
import {useMutation} from 'react-query'
import { toast } from "@/Components/ui/use-toast";

interface Props {
  id: string;
  likes: string[];
  likeCount: number;
  type: 'posts' | 'comments'
}


const LikeButton = ({ id, likes, likeCount, type }: Props) => {
  const user = useSession()
  const [likedByMe, setLikedByMe] = useState<boolean>(user ? likes.includes(user?._id) : false);
  const [likeNumber, setLikeNumber] = useState(likeCount)

  const {mutate: likePost, isLoading: isLiking} = useMutation({
    mutationFn: async () => {
      setLikeNumber(likedByMe ? likeNumber - 1 : likeNumber + 1)
      setLikedByMe(!likedByMe)
         await axios.put(
           `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${type}/${id}`,
           null,
           {
             withCredentials: true,
           }
      );
    },
    onSettled(data, error, variables, context) {
      if (error) {
        if (axios.isAxiosError(error)) {
          toast({
            description: `${error.response?.data.message}`,
            variant: 'destructive'
          })
        }
        setLikeNumber(likeNumber);
        setLikedByMe(likedByMe)
      }
    },
  });

  return (
      <div className="flex gap-2 items-center">
      {user ? <HeartWithUser isLiking={isLiking} likePost={likePost} likedByMe={likedByMe} />: <HeartWithoutUser />}
      <p>{likeNumber}</p>
      <p>{user? user.name : null}</p>
      </div>
  )
};

function HeartWithUser({ isLiking, likePost, likedByMe }: { likePost: () => void, likedByMe: boolean, isLiking: boolean }) {
  if (isLiking) likePost = () => {
    return
  }
  return <Heart className={"hover:text-rose-600 cursor-pointer"} fill={ likedByMe ? "red" : 'none' } onClick={likePost}/>
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
