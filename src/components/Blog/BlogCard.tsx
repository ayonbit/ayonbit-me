"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, type ReactElement } from "react";
import { BsArrowDownRight } from "react-icons/bs";

import type { BlogCardProps } from "../../types/blog.types";

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const BlogCard = ({
  img,
  tags,
  title,
  desc,
  user,
  createdAt,
  className,
  slug,
  index,
  currentPage,
  views,
}: BlogCardProps): ReactElement => {
  // desc is already a server-generated plain text preview (180 chars max)
  const publishedAt = useMemo(() => formatDate(createdAt), [createdAt]);
  const shouldPrioritizeImage = currentPage === 1 && index < 3;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.04,
          duration: 0.35,
          ease: "easeOut",
        },
      }}
      className={`group flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-neutral-100/5 shadow-lg transition-colors duration-300 hover:bg-neutral-100/10 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 ${className || ""}`}
    >
      <Link
        href={`/blog/${slug}`}
        prefetch={false}
        aria-label={`Read ${title}`}
        className="flex h-full flex-col"
      >
        <div className="relative h-48 w-full overflow-hidden sm:h-60">
          {img?.[0] ? (
            <Image
              src={img[0]}
              alt={`Featured image for ${title}`}
              fill
              className="rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={shouldPrioritizeImage}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-700/50">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          {tags?.[0] && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-accent px-2 py-1 text-xs font-medium text-black backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-sm">
              {tags[0]}
            </span>
          )}
        </div>

        <div className="flex grow flex-col p-4 sm:p-5">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-accent sm:text-xl">
            {title}
          </h3>

          <p className="mb-4 line-clamp-3 text-xs text-gray-400 sm:text-sm">
            {desc}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-accent pt-3 sm:pt-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-8 w-8 shrink-0 sm:h-10 sm:w-10">
                <Image
                  src={user?.image || "/default-user.png"}
                  alt={user?.name || "Author"}
                  fill
                  className="rounded-full object-cover"
                  sizes="40px"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium sm:font-semibold">
                  By {user?.name || "Anonymous"}
                </p>

                <p className="text-xs text-gray-400 sm:text-sm">Blogger</p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              {publishedAt && (
                <span className="text-xs text-gray-400 sm:text-sm">
                  {publishedAt}
                </span>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-400 sm:text-sm">
                <span className="transition-colors group-hover:text-accent">
                  {views} views
                </span>

                <BsArrowDownRight
                  className="transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
