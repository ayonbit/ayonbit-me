"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

import WorkSliderBtns from "../components/WorkSliderBtns";
import { projectData } from "../lib/data";

type ProjectType = {
  num: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  live?: string;
  github?: string;
  image: string;
};

const PortfolioCard = (): React.ReactElement => {
  const [activeProject, setActiveProject] = useState<ProjectType>(
    projectData[0],
  );

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = useCallback((swiper: SwiperType): void => {
    setActiveProject(projectData[swiper.activeIndex]);
  }, []);

  const handleImageLoad = useCallback((projectNum: string): void => {
    setLoadedImages((prev) => ({
      ...prev,
      [projectNum]: true,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.4,
          duration: 0.4,
          ease: "easeIn",
        },
      }}
      className="flex min-h-[80vh] items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
          {/* Project Details Column */}
          <div className="order-2 flex w-full flex-col xl:order-0 xl:w-[48%]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-outline text-6xl font-extrabold text-transparent">
                  {activeProject.num}
                </span>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {activeProject.title}
                </h2>

                <h3 className="text-xl font-medium text-accent">
                  {activeProject.category}
                </h3>
              </div>

              <p className="text-lg leading-relaxed text-white/80">
                {activeProject.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="mb-2 flex flex-wrap gap-3">
                {activeProject.stack.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-accent transition-colors hover:bg-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="my-4 border-t border-white/20" />

              {/* Project Links */}
              <div className="flex items-center gap-6">
                {activeProject.live && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={activeProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-accent"
                          aria-label="View live project"
                        >
                          <BsArrowUpRight className="text-2xl text-white transition-transform group-hover:scale-110" />
                        </Link>
                      </TooltipTrigger>

                      <TooltipContent side="bottom">
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {activeProject.github && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-accent"
                          aria-label="View GitHub repository"
                        >
                          <BsGithub className="text-2xl text-white transition-transform group-hover:scale-110" />
                        </Link>
                      </TooltipTrigger>

                      <TooltipContent side="bottom">
                        <p>GitHub Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>

          {/* Project Slider Column */}
          <div className="relative w-full xl:w-[52%]">
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              className="group relative"
              onSwiper={(swiper: SwiperType) => {
                swiperRef.current = swiper;
              }}
            >
              {projectData.map((project: ProjectType) => (
                <SwiperSlide key={project.num}>
                  <div className="relative h-75 overflow-hidden rounded-2xl bg-linear-to-br from-white/10 to-white/5 shadow-lg md:h-87.5 xl:h-100">
                    {!loadedImages[project.num] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                        <div className="h-16 w-16 animate-spin rounded-full border-4 border-accent/30 border-t-accent" />
                      </div>
                    )}

                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-fit transition-opacity duration-500 ${
                        loadedImages[project.num] ? "opacity-100" : "opacity-0"
                      }`}
                      priority={project.num === "01"}
                      onLoad={() => handleImageLoad(project.num)}
                      onError={() => handleImageLoad(project.num)}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </SwiperSlide>
              ))}

              <WorkSliderBtns
                containerStyles="absolute bottom-6 right-6 z-10 flex gap-3"
                btnStyles="bg-accent hover:bg-accent-hover text-primary flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-all hover:scale-105"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
