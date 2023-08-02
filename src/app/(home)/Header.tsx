"use client";

import Image from 'next/image';
import personImg from "../../../public/person.svg";
import person2Img from "../../../public/person2.svg";
import Navbar from "../../components/NavBar";


const Hero = () => {
  return (
    <div className="bg-blueDarkest">
      <Navbar />
      {/* font type: fascinate */}
      <div className="container grid justify-center ">
        <div className="py-32 max-w-[70ch] grid gap-8 mx-auto  text-center ml-0">
          <div className=" absolute right-0  scale-x-[-1]  translate-x-[10rem] lg:translate-x-[0] translate-y-[-7rem]">
            <Image src={person2Img} height={500} alt="" />
          </div>
          <div className="absolute  translate-x-[-10rem] lg:translate-x-[-18rem] translate-y-[-7rem]">
            <Image src={personImg} height={500} alt="" />
          </div>
          <h1 className="relative z-1 text-6xl text-blueLight font-bold">
            Welcome to Our Complex Blog Platform
          </h1>
          <p className="text-white relative z-1">
            Get ready for an adventure into the captivating world of words and
            wisdom in our simple, yet mesmerizing blog. Let&apos;s dive deep
            into the minds of amazing authors and explore various topics
            together. Are you excited? We sure are!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
