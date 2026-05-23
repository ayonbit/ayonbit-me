import { AboutMeData } from "../lib/data";

const AboutMe = () => {
  return (
    <div className="flex flex-col gap-7.5 text-center xl:text-left">
      <h3 className="text-4xl font-bold ">{AboutMeData.title}</h3>
      <p className="max-w-150 text-white/60 mx-auto xl:mx-0 ">
        {AboutMeData.description}
      </p>

      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-155 mx-auto xl:mx-0">
        {AboutMeData.info.map((item, idx) => {
          return (
            <li
              key={idx}
              className="flex justify-center items-center xl:justify-start xl:items-start gap-4"
            >
              <span className="text-white/60">{item.fieldName}</span>
              <span className="text-md xl:text-xl">{item.fieldValue}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AboutMe;
