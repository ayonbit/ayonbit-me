"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import * as Accordion from "@radix-ui/react-accordion";

import { FiChevronDown } from "react-icons/fi";

import { Button } from "../components/ui/button";

type ServiceItemType = {
  title: string;
  icon: string;
  description: string[];
};

type ServiceType = {
  data: ServiceItemType[];
};

type ServiceSlugProps = {
  service: ServiceType;
};

const ServiceSlug = ({ service }: ServiceSlugProps) => {
  return (
    <>
      {/* Services Accordion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2.1,
          duration: 0.5,
        }}
        className="mx-auto w-full md:w-5/6 lg:w-3/4"
      >
        <Accordion.Root type="single" collapsible>
          {service.data.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 2.3 + index * 0.1,
                duration: 0.5,
              }}
            >
              <Accordion.Item
                value={item.title}
                className="border-b border-white/10"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-8 text-left text-xl font-bold text-white transition-colors hover:text-accent md:text-2xl">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{item.icon}</span>

                      <span>{item.title}</span>
                    </div>

                    <motion.div
                      whileHover={{
                        rotate: 180,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="ml-4"
                    >
                      <FiChevronDown className="text-xl text-white transition-colors group-hover:text-accent" />
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <motion.ul
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    className="list-disc space-y-2 pl-6 pt-2"
                  >
                    {item.description.map((desc, i) => (
                      <motion.li
                        key={i}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.1 * i,
                        }}
                        className="p-2 text-md text-white/80"
                      >
                        {desc}
                      </motion.li>
                    ))}
                  </motion.ul>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2.8,
          duration: 0.5,
        }}
        className="mt-12 text-center"
      >
        <Link href="/contact">
          <Button className="px-8 py-6 font-semibold text-primary">
            Let&apos;s Talk?
          </Button>
        </Link>
      </motion.div>
    </>
  );
};

export default ServiceSlug;
