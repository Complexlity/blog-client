import Image from 'next/image';
import defaultImg from '../../../public/default.svg'
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ChevronRight } from "lucide-react";
import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';


const PostCard = ({ post }: { post: Post }) => {

  return (
    <div className="rounded-2xl p-4 bg-blueDark grid gap-2 hover:scale-[101%] transition-all duration-150 ease-in-out">
      <Image src={defaultImg} alt="image" className="rounded-lg" />
      <div className="space-y-4">
        <Badge className="bg-green-400 text-blueDarkest hover:text-white hover:opacity-80 ">
          Technology
        </Badge>
        <h2 className="text-xl font-bold text-gray-200">{post.title}</h2>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={defaultImg}
              alt="image"
              className="rounded-full w-12 h-12 object-cover"
            />
            <div className="text-sm grid gap-1 ">
              <p className="text-gray-200 font-bold">{post.author.name}</p>
              <p className="text-gray-300">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          <Link
            href={`/posts/${post._id}`}
            className={buttonVariants({ size: "sm", className: "flex group" })}
          >
            <span>Read</span>{" "}
            <ChevronRight className="group-hover:translate-x-2 transition-all duration-75 ease-in-out" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;