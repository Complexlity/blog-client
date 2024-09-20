import { Facebook, Github, Instagram, Twitch, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="print:hidden border-t-2 border-blueLight text-center container py-4 space-y-4 text-sm">
      <div className="flex justify-center gap-4 items-center">
        <Link href={"https://x.com/Complexlity"}>
          <Twitter className=" text-blueDarkest w-8 h-8 cursor-pointer" />
        </Link>
        <Link href={"https://github.com/Complexlity"}>
          <Github className=" text-blueDarkest w-8 h-8 cursor-pointer" />
        </Link>
        <Link href={"https://warpcast.com/complexlity"}>
          <div className="text-blueDarkest w-10 h-10 flex items-center justify-center  cursor-pointer">
            <img
              className="w-full h-full"
              src="/fc_icon.svg"
              alt="farcaster icon"
            />
          </div>
        </Link>
      </div>
      <div>&copy; {year} Complex Blog. All Rights Reserved</div>
    </div>
  );
};

export default Footer;
