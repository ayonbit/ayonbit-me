import Link from "next/link";
import type { ReactElement } from "react";

import BlogCard from "./BlogCard";

import type { BlogPageContentProps } from "../../types/blog.types";

const getPageHref = (page: number): string => {
  return page <= 1 ? "/blog" : `/blog?page=${page}`;
};

const BlogPageContent = ({
  posts,
  totalPosts,
  totalPages,
  currentPage,
  perPage,
}: BlogPageContentProps): ReactElement => {
  if (!posts.length) {
    return (
      <div className="py-10 text-center text-white/60">
        No blog posts found.
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            {...post}
            index={index}
            currentPage={currentPage}
          />
        ))}
      </div>

      {totalPosts > perPage && (
        <nav
          aria-label="Blog pagination"
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          <Link
            href={getPageHref(Math.max(currentPage - 1, 1))}
            aria-disabled={currentPage <= 1}
            className={`rounded-md border border-white/10 px-4 py-2 text-sm transition-colors ${
              currentPage <= 1
                ? "pointer-events-none text-white/30"
                : "text-white/70 hover:border-accent hover:text-accent"
            }`}
          >
            Previous
          </Link>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Link
                key={page}
                href={getPageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm transition-colors ${
                  page === currentPage
                    ? "border-accent bg-accent text-black"
                    : "border-white/10 text-white/70 hover:border-accent hover:text-accent"
                }`}
              >
                {page}
              </Link>
            ),
          )}

          <Link
            href={getPageHref(Math.min(currentPage + 1, totalPages))}
            aria-disabled={currentPage >= totalPages}
            className={`rounded-md border border-white/10 px-4 py-2 text-sm transition-colors ${
              currentPage >= totalPages
                ? "pointer-events-none text-white/30"
                : "text-white/70 hover:border-accent hover:text-accent"
            }`}
          >
            Next
          </Link>
        </nav>
      )}
    </div>
  );
};

export default BlogPageContent;
