import type { Metadata } from "next";
import type { ReactElement } from "react";

import BlogPageContent from "../../components/Blog/BlogPageContent";
import { getPaginatedBlogPosts, getPlainTextPreview } from "../../lib/blog";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  createMetadata,
  jsonLdScript,
} from "../../lib/seo";

export const revalidate = 300;
type BlogPageProps = {
  searchParams?:
    | {
        page?: string | string[];
      }
    | Promise<{
        page?: string | string[];
      }>;
};

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await Promise.resolve(searchParams);
  const currentPage = Number(params?.page) || 1;
  const path = currentPage > 1 ? `/blog?page=${currentPage}` : "/blog";

  return createMetadata({
    title: currentPage > 1 ? `Blog - Page ${currentPage}` : "Blog",
    description:
      "Read Ayon Bit's articles about web development, Next.js, React, UI/UX, Shopify, performance, and practical technology insights.",
    path: "/blog",
    canonicalPath: currentPage > 1 ? "/blog" : undefined,
    keywords: ["web development blog", "Next.js blog", "React tutorials"],
  });
}

const BlogPage = async ({
  searchParams,
}: BlogPageProps): Promise<ReactElement> => {
  const params = await Promise.resolve(searchParams);
  const data = await getPaginatedBlogPosts(params?.page);

  // Strip full HTML content from blog list posts (only need preview)
  // and generate preview text on the server
  const lightweightPosts = data.posts.map((post) => ({
    ...post,
    desc: getPlainTextPreview(post.desc || "", 180),
  }));

  const dataWithLightweightPosts = {
    ...data,
    posts: lightweightPosts,
  };

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ayon Bit blog posts",
    itemListElement: lightweightPosts.map((post, index) => ({
      "@type": "ListItem",
      position: (data.currentPage - 1) * data.perPage + index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.createdAt,
        author: {
          "@type": "Person",
          name: post.user?.name || "Ayon Bit",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          collectionPageJsonLd({
            name: "Blog",
            description:
              "Read Ayon Bit's articles about web development, Next.js, React, UI/UX, Shopify, performance, and practical technology insights.",
            path: "/blog",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          blogListJsonLd,
        ])}
      />
      <header className="mb-4 text-center lg:mb-4">
        <h1 className="mb-4 text-3xl font-bold text-accent sm:mb-6 sm:text-4xl md:text-5xl">
          My Latest Blog
        </h1>

        <p className="mx-auto max-w-3xl text-sm text-white/60 sm:text-base md:text-lg">
          Discover insightful articles and stay updated with the latest trends
          in technology, design, and business.
        </p>
      </header>

      <BlogPageContent {...dataWithLightweightPosts} />
    </>
  );
};

export default BlogPage;
