"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import { useMemo, useState, type ReactElement } from "react";
import { FaCalendar, FaComments, FaEye } from "react-icons/fa";

import ShareButtons from "../ShareButton";
import { Button } from "../ui/button";
import Comments from "./Comments";

import type { BlogSingleContentProps } from "../../types/blog.types";

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

const BlogSingleContent = ({ post }: BlogSingleContentProps): ReactElement => {
  const [commentCount, setCommentCount] = useState<number>(0);

  const sanitizedContent = useMemo((): string => {
    return DOMPurify.sanitize(post.desc || "", {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
      FORBID_TAGS: ["script", "style"],
      FORBID_ATTR: ["onerror", "onload", "onclick"],
    });
  }, [post.desc]);

  const publishedAt = useMemo(
    () => formatDate(post.createdAt),
    [post.createdAt],
  );

  return (
    <section className="container mx-auto px-4 py-12 text-white">
      <header className="mb-8 space-y-5">
        <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Image
              src={post.user?.image || "/default-user.png"}
              alt={post.user?.name || "Blog author"}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />

            <span className="font-semibold text-white">
              {post.user?.name || "Anonymous"}
            </span>
          </div>

          {publishedAt && (
            <div className="flex items-center gap-1">
              <FaCalendar size={12} />

              <span>{publishedAt}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <FaComments size={12} />

            <span>{commentCount} comments</span>
          </div>

          <div className="flex items-center gap-1">
            <FaEye size={12} />

            <span>{post.views} views</span>
          </div>

          {post.tags?.[0] && (
            <Button className="ml-auto font-normal">{post.tags[0]}</Button>
          )}
        </div>
      </header>

      <article
        className="
          prose
          prose-invert
          mb-8
          max-w-none
          text-lg
          leading-relaxed
          text-white/90
          prose-h1:my-6
          prose-h1:text-4xl
          prose-h1:font-bold
          prose-h2:my-5
          prose-h2:text-3xl
          prose-h2:font-semibold
          prose-h3:my-4
          prose-h3:text-2xl
          prose-h3:font-semibold
          prose-p:my-4
          prose-p:text-base
          prose-img:mx-auto
          prose-img:my-6
          prose-img:h-auto
          prose-img:max-w-full
          prose-img:rounded-lg
          prose-table:w-full
          prose-th:bg-gray-700
          prose-td:border-t
          prose-td:border-gray-600
          prose-code:rounded
          prose-code:bg-gray-700
          prose-code:px-1
          prose-code:py-0.5
          prose-pre:rounded-lg
          prose-pre:bg-gray-800
          prose-pre:p-4
        "
        dangerouslySetInnerHTML={{
          __html: sanitizedContent,
        }}
      />

      <footer className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">Popular Tags:</p>

          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span key={tag} className="rounded bg-white/10 px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="mb-1 font-medium">Share this post:</p>

          <ShareButtons title={post.title} />
        </div>
      </footer>

      <Comments postSlug={post.slug} onCommentCountChange={setCommentCount} />
    </section>
  );
};

export default BlogSingleContent;
