"use client";

import { ExperienceData } from "../lib/data";

import { ScrollArea } from "./ui/scroll-area";

type ExperienceItemType = {
  duration: string;
  Position: string;
  Company: string;
};

type ExperienceDataType = {
  title: string;
  description: string;
  items: ExperienceItemType[];
};

const experienceData = ExperienceData as ExperienceDataType;

const Experience = () => {
  return (
    <div className="flex flex-col gap-7.5 text-center xl:text-left">
      <h3 className="text-4xl font-bold">{experienceData.title}</h3>

      <p className="mx-auto max-w-150 text-white/60 xl:mx-0">
        {experienceData.description}
      </p>

      <ScrollArea className="h-100">
        <ul className="grid grid-cols-1 gap-7.5 lg:grid-cols-2">
          {experienceData.items.map((item, idx) => (
            <li
              key={idx}
              className="flex h-46 flex-col items-center justify-center gap-1 rounded-xl bg-[#232329] px-10 py-6 lg:items-center"
            >
              <span className="text-accent">{item.duration}</span>

              <h5 className="min-h-10 max-w-65 text-md">{item.Position}</h5>

              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />

                <p className="text-white/60">{item.Company}</p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Experience;
