import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import BlogSingleContent from "../../../components/Blog/BlogSingleContent";
import { getBlogPostBySlug, getPlainTextPreview } from "../../../lib/blog";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createMetadata,
  jsonLdScript,
  siteConfig,
} from "../../../lib/seo";
import type { PageParams } from "../../../types/blog.types";

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const { slug } = await Promise.resolve(params);
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Blog Post",
      description: "Read this article from Ayon Bit's web development blog.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const imageUrl = post.img?.[0]
    ? absoluteUrl(post.img[0])
    : absoluteUrl(siteConfig.ogImage);

  const description =
    getPlainTextPreview(post.desc) ||
    "Read this insightful article on technology, design, and business.";

  return {
    ...createMetadata({
      title: post.title,
      description,
      path: `/blog/${slug}`,
      image: imageUrl,
      type: "article",
      keywords: post.tags,
    }),
    authors: post.user?.name ? [{ name: post.user.name }] : undefined,
    category: post.tags?.[0],
    openGraph: {
      type: "article",
      url: absoluteUrl(`/blog/${slug}`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: post.title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.createdAt,
      authors: post.user?.name ? [post.user.name] : undefined,
      tags: post.tags,
    },
  };
};

const createArticleJsonLd = (
  post: NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>,
) => {
  const description =
    getPlainTextPreview(post.desc) ||
    "Read this article from Ayon Bit's web development blog.";
  const image = post.img?.[0]
    ? absoluteUrl(post.img[0])
    : absoluteUrl(siteConfig.ogImage);

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
      {
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
        headline: post.title,
        description,
        image,
        datePublished: post.createdAt,
        dateModified: post.createdAt,
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        author: {
          "@type": "Person",
          name: post.user?.name || siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        keywords: post.tags,
      },
    ],
  };
};

const BlogSinglePage = async ({
  params,
}: PageParams): Promise<ReactElement> => {
  const { slug } = await Promise.resolve(params);
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(createArticleJsonLd(post))}
      />
      <BlogSingleContent post={post} />
    </>
  );
};

export default BlogSinglePage;
