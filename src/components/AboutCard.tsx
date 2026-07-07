"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const AboutMe = dynamic(() => import("../components/AboutMe"));
const Education = dynamic(() => import("../components/Education"));
const Experience = dynamic(() => import("../components/Experience"));
const Skills = dynamic(() => import("../components/Skills"));

export const AboutCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto ">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-15 "
        >
          <TabsList className="flex flex-col w-full max-w-95 mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="aboutMe">About Me</TabsTrigger>
          </TabsList>
          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent className="w-full " value="experience">
              <Experience />
            </TabsContent>
            {/* education*/}
            <TabsContent className="w-full " value="education">
              <Education />
            </TabsContent>
            {/* Skills*/}
            <TabsContent className="w-full " value="skills">
              <Skills />
            </TabsContent>
            {/* education*/}
            <TabsContent className="w-full " value="aboutMe">
              <AboutMe />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};
