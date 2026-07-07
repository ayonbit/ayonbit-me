"use client";
//dependencies

import { motion } from "framer-motion";
import Image from "next/image";
//Profile photo Component
const Photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
        }}
      >
        {/* profile photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.6, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-74.5 h-74.5 xl:w-124.5
          xl:h-124.5 mix-blend-lighten relative"
        >
          <Image
            src={"/assets/updateprofile.png"}
            alt="profile_ayonbit"
            className=" object-fill"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;
