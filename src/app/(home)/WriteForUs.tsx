import { Button } from "@/components/ui/button";
import Image from "next/image";
import scribble from "../../../public/scribble.png";

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
          Unlock Your Writing Potential!
        </h2>
        <p className="max-w-[50ch] mx-auto">
          Do you have a flair for words and a talent for storytelling? Want to
          inspire others and share your thoughts on our platform? Embrace your
          inner wordsmith and become an author for our simple blog today! Trust
          us, it&apos;s a game-changer.
        </p>
        <Button size={"lg"}>Join Us Now</Button>
      </div>
    </div>
  );
};

export default WriteForUs;
