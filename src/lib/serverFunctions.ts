import { Post, User } from "@/lib/types";
import { headers } from "next/headers";

export async function getUser() {
  const Headers = headers();
  const authorization = Headers.get("authorization");
  const cookie = Headers.get("cookie");
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/me`, {
    credentials: "include",
    //@ts-ignore
    headers: {
      "Content-type": "application/json",
      authorization,
      cookie,
    },
  });
  const user = await response.json();
  if (response.ok) {
    return user as User;
  }
  return null;
}

export async function getPosts()  {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts?published=true`,
    {
      cache: 'no-store'
    }
  );
  if(!response.ok) return null
  const posts = (await response.json()) as unknown as Post[];
  return posts;
};

export async function getSinglePost(id: string)  {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${id}`,
    {
      cache: 'no-store'
    }
  );
  if(!response.ok) return null
  const posts = (await response.json()) as unknown as Post;
  return posts;
};
