"use client";

import Image from "next/image";
import personImg from "../../public/person.svg";
import person2Img from "../../public/person2.svg";
import Navbar from '@/Components/NavBar'

const Hero = () => {
  return (
    <div className="bg-blueDarkest">
      <Navbar />
      {/* font type: fascinate */}
      <div className="container grid justify-center ">
        <div className="py-12 sm:py-32 max-w-[70ch] grid gap-8 mx-auto  text-center ml-0">
          <div className="hidden lg:block absolute right-0  scale-x-[-1]  translate-x-[10rem] lg:translate-x-[0] translate-y-[-7rem]">
            <Image src={person2Img} height={500} alt="" />
          </div>
          <div className="hidden md:block absolute  translate-x-[-10rem] lg:translate-x-[-18rem] translate-y-[-7rem]">
            <Image src={personImg} height={500} alt="" />
          </div>
          <h1 className="font-roboto relative z-1 text-6xl text-blueLight font-bold">
            Hi! I'm Complexlity. Welcome To My Blog
          </h1>
          <p className="text-white relative z-1">
            I built this platform to share things I know and things I learn. Ranging through topics from development to hardware technology, to even more general things like <i><b>
            how to solve the 4x4 rubiks cube.
            </b></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
