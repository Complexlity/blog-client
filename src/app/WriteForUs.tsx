import { Button, buttonVariants } from "@/Components/ui/button";
import Image from "next/image";
import scribble from "../../public/scribble.png";
import Link from "next/link";

const WriteForUs = () => {
  return (
    <div className="bg-blueLight">
      <div className="container text-center py-6 space-y-6">
        <div>
          <Image
            src={scribble}
            alt="scribble"
            width={200}
            className="text-blueDark mx-auto"
          />
        </div>
        <h2 className="font-roboto text-5xl font-bold text-blueDarkest">
          You Can Write Too!
        </h2>
        <p className="max-w-[50ch] mx-auto">
          It is not restricted to only myself. Anyone can write too. Simply create an account, and start sharing your stories! The world can't wait to read from you
        </p>
        <Link href="/signup" className={buttonVariants({size: 'lg'})}>Join Me!</Link>
      </div>
    </div>
  );
};

export default WriteForUs;
