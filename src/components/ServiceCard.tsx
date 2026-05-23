"use client";

import Link from "next/link";

import { motion, type HTMLMotionProps } from "framer-motion";

import { BsArrowDownRight } from "react-icons/bs";

type ServiceType = {
  num: string;
  slug: string;
  category: string;
  description: string;
};

type ServiceCardProps = HTMLMotionProps<"div"> & {
  service: ServiceType;
  className?: string;
};

export const ServiceCard = ({
  service,
  className,
  ...motionProps
}: ServiceCardProps) => {
  return (
    <motion.div
      {...motionProps}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: "easeIn",
        },
      }}
      className={`group flex flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/5 bg-neutral-100/5 p-6 shadow-lg transition-all duration-300 hover:bg-neutral-100/10 lg:p-8 ${className}`}
    >
      <div className="flex w-full items-start justify-between">
        <span className="bg-linear-to-br from-white/20 to-white/50 bg-clip-text text-5xl font-extrabold text-transparent transition-all duration-500 group-hover:from-accent/80 group-hover:to-primary/80">
          {service.num}
        </span>

        <Link
          href={`/service/${service.slug}`}
          aria-label={`Learn more about ${service.category}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white transition-all duration-300 hover:rotate-45 group-hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-neutral-900 lg:h-16 lg:w-16"
          prefetch={false}
        >
          <BsArrowDownRight className="text-2xl text-primary transition-colors group-hover:text-white lg:text-3xl" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-accent lg:text-3xl">
          {service.category}
        </h2>

        <p className="text-sm leading-relaxed text-white/80 lg:text-base">
          {service.description}
        </p>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </motion.div>
  );
};
