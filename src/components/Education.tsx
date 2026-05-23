import { EducationData } from "../lib/data";
import { ScrollArea } from "./ui/scroll-area";

const Education = () => {
  return (
    <div className="flex flex-col gap-7.5 text-center xl:text-left">
      <h3 className="text-4xl font-bold ">{EducationData.title}</h3>
      <p className="max-w-150 text-white/60 mx-auto xl:mx-0 ">
        {EducationData.description}
      </p>
      <ScrollArea className="h-100">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
          {EducationData.items.map((item, idx) => {
            return (
              <li
                key={idx}
                className="bg-[#232329] h-46 py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-center gap-1"
              >
                <span className="text-accent">{item.Duration}</span>
                <h3 className="text-md max-w-65 min-h-10">{item.Degree}</h3>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <p className="text-white/60">{item.Institute}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default Education;
