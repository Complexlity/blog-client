"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";
import { toast } from "@/Components/ui/use-toast";
import useSession from "@/Hooks/useSession";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  likes: string[];
  likeCount: number;
  type: "posts" | "comments";
}

const LikeButton = ({ id, likes, likeCount, type }: Props) => {
  let user = useSession();
  const [likedByMe, setLikedByMe] = useState<boolean>(
    user ? likes.includes(user?._id) : false
  );

  const [likeNumber, setLikeNumber] = useState(likeCount);
  const previouslyLikedByMe = usePrevious(likedByMe);
  const previousLikeNumber = usePrevious(likeCount);
  const router = useRouter();

  useEffect(() => {
    setLikedByMe(user ? likes.includes(user?._id) : false);
  }, [likes]);

  const { mutate: likePost, isLoading: isLiking } = useMutation({
    // @ts-ignore
    mutationFn: async () => {
      // setLikeNumber(likedByMe ? likeNumber - 1 : likeNumber + 1);
      // setLikedByMe(!likedByMe);
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/${type}/${id}`,
        null,
        {
          withCredentials: true,
        }
      );
    },
    onError: (error) => {
      setLikeNumber((prev) => prev - 1);
      setLikedByMe(previouslyLikedByMe!);
      if (axios.isAxiosError(error)) {
        toast({
          description: `${error.response?.data.message}`,
          variant: "destructive",
        });
        return toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    onMutate: () => {
      if (likedByMe) {
        setLikeNumber((prev) => prev - 1);
      } else setLikeNumber((prev) => prev + 1);
      setLikedByMe(!likedByMe);
    },
    onSuccess() {
      router.refresh();
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
        className={`${
          likedByMe ? "text-red-500" : "text-black"
        } hover:text-rose-500`}
        size={23}
        fill={likedByMe ? "red" : "none"}
      />
    </div>
  );
}

function HeartWithoutUser() {
  return (
    <HoverCard openDelay={1} closeDelay={1}>
      <HoverCardTrigger>
        <Heart className="fill-gray-200 text-gray-300" />
      </HoverCardTrigger>
      <HoverCardContent className="border-0 border-transparent p-2 text-gray-600">
        Login to like posts
      </HoverCardContent>
    </HoverCard>
  );
}

export default LikeButton;
