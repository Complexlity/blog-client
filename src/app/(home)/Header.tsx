"use client";

import Navbar from "../../components/NavBar";

const Hero = () => {
  return (
    <div className="bg-blueDarkest">
      <Navbar />
      {/* font type: fascinate */}
      <div className="container">
        <div className="hero py-8 max-w-[70ch] grid gap-8 items-start ml-0">
          <h1 className="text-6xl text-blueLight font-bold">
            Welcome to Our Complex Blog Platform
          </h1>
          <p className="text-white">
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
