"use client";

// Dependencies
import type { ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              delay: 1,
              duration: 0.4,
              ease: "easeOut",
            },
          }}
          className="pointer-events-none fixed top-0 h-screen w-screen bg-primary"
        />

        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
