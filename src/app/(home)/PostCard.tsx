import Image from 'next/image';
import defaultImg from '../../../public/default.svg'
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ChevronRight } from "lucide-react";
import { Post } from '@/lib/types';
import { formatDate, getCategoryColor } from '@/lib/utils';


const PostCard = ({ post }: { post: Post }) => {

  
  return (
    <div className="rounded-2xl p-4 bg-blueDark grid gap-2 hover:scale-[101%] transition-all duration-150 ease-in-out">
      {post.coverImageSource ?
        <div className="h-full aspect-square overflow-hidden rounded-lg">
          <Image
            className="object-cover w-full object-top "
            unoptimized
            src={post.coverImageSource}
            alt="image"
            width={48}
            height={48}

          />
        </div>
        :
        null
      }
      <div className="space-y-4">
        <Badge style={{backgroundColor: getCategoryColor(post.category)}} className="text-blueDarkest hover:text-white hover:opacity-80 ">
          {post.category}
        </Badge>
        <h2 className="text-xl font-bold text-gray-200">{post.title}</h2>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={post.author.imageSrc}
              alt="image"
              width={12}
              height={12}
              className="rounded-full w-12 h-12 object-cover"
              unoptimized
            />
            <div className="text-sm grid gap-1 ">
              <p className="text-gray-200 font-bold">{post.author.name}</p>
              {/* @ts-expect-error Date object confused as string*/}
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