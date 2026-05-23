"use client";

import Link from "next/link";

import { socials } from "../lib/data";

type SocialsProps = {
  containerStyles?: string;
  iconStyles?: string;
};

const Socials = ({ containerStyles, iconStyles }: SocialsProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.path}
            className={iconStyles}
            target="_blank"
          >
            <Icon />
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
