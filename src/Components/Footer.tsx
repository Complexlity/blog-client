import { Facebook, Github, Instagram, Twitch, Twitter } from "lucide-react";


const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className="border-t-2 border-blueLight text-center container py-4 space-y-4 text-sm">
      <div className="flex justify-center gap-4">
        <Facebook className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Twitter className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Twitch className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Github className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
        <Instagram className="fill-blueDarkest text-blueDark w-8 h-8 cursor-pointer" />
      </div>
      <div>&copy; {year} Complex Blog. All Rights Reserved</div>
    </div>

  );
};

export default Footer;
