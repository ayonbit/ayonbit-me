"use client";

// Dependencies
import dynamic from "next/dynamic";
// Internal Dependencies
import DownloadCvButton from "../components/DownloadCvButton";
import Photo from "../components/Photo";

// Dynamic Imports
const Stats = dynamic(() => import("../components/Stats"));
const Socials = dynamic(() => import("../components/Socials"), { ssr: false });

// Home Page
const Home = () => {
  return (
    <section className="min-h-screen py-12 xl:py-0">
      <div className="container mx-auto h-full px-4 xl:px-0">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 gap-8 xl:gap-0">
          {/* Text */}
          <div className="text-center xl:text-left order-2 xl:order-0">
            <span className="text-xl">Web Developer</span>
            <h1 className="h1">
              Hello I&apos;m <br />
              <span className="text-accent">Ayon Bit</span>
            </h1>
            <p className="max-w-125 mb-9 text-white/80 mx-auto xl:mx-0">
              Experienced software developer skilled in multiple programming
              languages, collaborative, and effective at providing technical
              guidance. Dedicated to staying current with industry trends and
              motivated to create high-quality software.
            </p>
            {/* Button and Social Media */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <DownloadCvButton />
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="grid grid-cols-4 gap-4 md:flex md:flex-row xl:flex-row"
                  iconStyles="w-9 h-9 border border-accent 
              rounded-full flex justify-center items-center 
              text-white hover:bg-white hover:text-primary 
              hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* Photo */}
          <div className="order-1 xl:order-0 mb-8 xl:mb-0 max-w-sm xl:max-w-md mx-auto xl:mx-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
