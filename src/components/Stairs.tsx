//dependencies
import type { ReactElement } from "react";

import { motion, type Variants } from "framer-motion";

//variants
const stairAnimation: Variants = {
  initial: {
    top: "0%",
  },

  animate: {
    top: "100%",
  },

  exit: {
    top: ["100%", "0%"],
  },
};

//calculate the resever index for staggered delay
const reverseIndex = (index: number): number => {
  const totalSteps = 6;

  return totalSteps - index - 1;
};

//Stairs
const Stairs = (): ReactElement => {
  return (
    <>
      {/* render 6 motion divs, each represting a step of the stairs.
    Each div will have the same animation defined by the stairAnimation object.
    The delay for each div is calculated sinamically based on it's reversed index,
    creating a staggered effect with decreasing delay for each subsequent step.
     */}
      {[...Array(6)].map((_: undefined, index: number) => {
        return (
          <motion.div
            key={index}
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.1,
            }}
            className="relative h-full w-full bg-white"
          />
        );
      })}
    </>
  );
};

export default Stairs;
