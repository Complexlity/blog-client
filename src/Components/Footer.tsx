import { Facebook, Github, Instagram, Twitch, Twitter } from "lucide-react";
import Link from "next/link";


const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className="border-t-2 border-blueLight text-center container py-4 space-y-4 text-sm">
      <div className="flex justify-center gap-4">
        <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
          <Facebook className=" text-blueDarkest w-8 h-8 cursor-pointer" />
        </Link>
        <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
          <Twitter className=" text-blueDarkest w-8 h-8 cursor-pointer" />
        </Link>
        <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
          <Twitch className=" text-blueDarkest w-8 h-8 cursor-pointer" />
        </Link>
        <Link href={"https://github.com/Complexlity"}>
          <Github className=" text-blueDarkest w-8 h-8 cursor-pointer" />
        </Link>
        <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
          <Instagram className=" text-blueDarkest w-8 h-8 cursor-pointer" />
        </Link>
      </div>
      <div>&copy; {year} Complex Blog. All Rights Reserved</div>
    </div>
  );
};

export default Footer;
