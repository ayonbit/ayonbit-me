"use client";

import { SkillsData } from "../lib/data";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Education = () => {
  return (
    <div className="flex flex-col gap-7.5">
      <div className="flex flex-col gap-7.5 text-center xl:text-left">
        <h3 className="text-4xl font-bold">{SkillsData.title}</h3>

        <p className="mx-auto max-w-150 text-white/60 xl:mx-0">
          {SkillsData.description}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:gap-7.5">
        {SkillsData.skillList.map((skill, idx) => {
          const Icon = skill.icon;

          return (
            <li key={idx}>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="group flex h-37.5 w-full items-center justify-center rounded-xl bg-[#232329]">
                    <div className="text-6xl transition-all duration-300 group-hover:text-accent">
                      <Icon />
                    </div>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p className="capitalize">{skill.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Education;
