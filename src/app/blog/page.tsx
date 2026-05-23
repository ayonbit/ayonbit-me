import type { Metadata } from "next";
import type { ReactElement } from "react";

import BlogPageContent from "../../components/Blog/BlogPageContent";
import { getPaginatedBlogPosts } from "../../lib/blog";
import { createMetadata } from "../../lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Blog",
    description:
      "Read Ayon Bit's articles about web development, Next.js, React, UI/UX, Shopify, performance, and practical technology insights.",
    path: "/blog",
    keywords: ["web development blog", "Next.js blog", "React tutorials"],
  }),
};

type BlogPageProps = {
  searchParams?:
    | {
        page?: string | string[];
      }
    | Promise<{
        page?: string | string[];
      }>;
};

const BlogPage = async ({
  searchParams,
}: BlogPageProps): Promise<ReactElement> => {
  const params = await Promise.resolve(searchParams);
  const data = await getPaginatedBlogPosts(params?.page);

  return (
    <>
      <header className="mb-4 text-center lg:mb-4">
        <h1 className="mb-4 text-3xl font-bold text-accent sm:mb-6 sm:text-4xl md:text-5xl">
          My Latest Blog
        </h1>

        <p className="mx-auto max-w-3xl text-sm text-white/60 sm:text-base md:text-lg">
          Discover insightful articles and stay updated with the latest trends
          in technology, design, and business.
        </p>
      </header>

      <BlogPageContent {...data} />
    </>
  );
};

export default BlogPage;
