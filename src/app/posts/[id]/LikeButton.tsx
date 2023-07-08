"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useSession from "@/hooks/useSession";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "@/components/ui/use-toast";
import { getUser } from "@/lib/serverFunctions";

interface Props {
  id: string;
  likes: string[];
  likeCount: number;
  type: "posts" | "comments";
}

const LikeButton = ({ id, likes, likeCount, type }: Props) => {
  let user = useSession();
  const [likedByMe, setLikedByMe] = useState<boolean>(
    likes.includes(user?._id)
  );

  useEffect(() => {
      setLikedByMe(likes.includes(user?._id))
    }, [])



  const [likeNumber, setLikeNumber] = useState(likeCount);

  const { mutate: likePost, isLoading: isLiking } = useMutation({
    mutationFn: async () => {
      setLikeNumber(likedByMe ? likeNumber - 1 : likeNumber + 1);
      setLikedByMe(!likedByMe);
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
            variant: "destructive",
          });
        }
        setLikeNumber(likeNumber);
        setLikedByMe(likedByMe);
      }
    },
  });

  return (
    <div className="flex gap-1 items-center">
      {user ? (
        <HeartWithUser
          isLiking={isLiking}
          likePost={likePost}
          likedByMe={likedByMe}
        />
      ) : (
        <HeartWithoutUser />
      )}
      <p>{likeNumber}</p>
    </div>
  );
};

function HeartWithUser({
  isLiking,
  likePost,
  likedByMe,
}: {
  likePost: () => void;
  likedByMe: boolean;
  isLiking: boolean;
}) {
  if (isLiking)
    likePost = () => {
      return;
    };
  return (
    <div
      className="rounded-full p-2 hover:bg-rose-100 hover:text-rose-600"
      onClick={likePost}
    >
      <Heart
        size={23}
        fill={likedByMe ? "red" : "none"}
        color={likedByMe ? "red" : "black"}
      />
    </div>
  );
}

function HeartWithoutUser() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Heart className="fill-gray-200 text-gray-300" />
      </HoverCardTrigger>
      <HoverCardContent className="border-0 border-transparent p-2 text-gray-400">
        Login to like posts
      </HoverCardContent>
    </HoverCard>
  );
}

export default LikeButton;
