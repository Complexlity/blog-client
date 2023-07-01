"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserContext } from "@/Contexts/SessionProvider";
import useSession from "@/hooks/useSession";

const LikeButton = ({ id }: { id: string }) => {
  const [status, setStatus] = useState<string>("none");
  const user = useSession()
  
  function likePost() {
    alert(id);
  }

  return <Heart fill={status} onClick={likePost} />;
};

export default LikeButton;
