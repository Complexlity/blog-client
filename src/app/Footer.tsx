import { Facebook, Twitter, Instagram, Twitch, Github } from "lucide-react";


const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className="bg-blueLight">
    <div className="text-center container py-12 space-y-4 text-xl">
      <div className="flex justify-center gap-4">
        <Facebook className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Twitter className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Twitch className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Github className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Instagram className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
      </div>
      <div>&copy; {year} Complex Blog. All Rights Reserved</div>
    </div>
    </div>
  );
};

export default Footer;
