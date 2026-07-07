// Fields needed for blog list
const LIST_POST_SELECT = {
  id: true,
  slug: true,
  title: true,
  desc: true,
  img: true,
  views: true,
  tags: true,
  createdAt: true,
  user: {
    select: {
      name: true,
      image: true,
      email: true,
    },
  },
} as const;

import { cache } from "react";

import prisma from "./prisma";

import type { PaginatedPosts, PostType } from "../types/blog.types";

export const BLOG_POSTS_PER_PAGE = 6;

// Fields needed for single blog post
const SINGLE_POST_SELECT = {
  id: true,
  slug: true,
  title: true,
  desc: true,
  img: true,
  views: true,
  tags: true,
  createdAt: true,
  user: {
    select: {
      name: true,
      image: true,
      email: true,
    },
  },
} as const;

const normalizePage = (page?: string | string[]): number => {
  const value = Array.isArray(page) ? page[0] : page;
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
};

const serializePost = (
  post: Omit<PostType, "createdAt"> & {
    createdAt: Date;
  },
): PostType => ({
  ...post,
  createdAt: post.createdAt.toISOString(),
});
export const getPaginatedBlogPosts = cache(
  async (pageParam?: string | string[]): Promise<PaginatedPosts> => {
    const currentPage = normalizePage(pageParam);
    const skip = (currentPage - 1) * BLOG_POSTS_PER_PAGE;

    const [rawPosts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: BLOG_POSTS_PER_PAGE,
        orderBy: {
          createdAt: "desc",
        },
        select: LIST_POST_SELECT,
      }),
      prisma.post.count(),
    ]);

    const posts: PostType[] = rawPosts.map(serializePost);
    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / BLOG_POSTS_PER_PAGE),
      currentPage,
      perPage: BLOG_POSTS_PER_PAGE,
    };
  },
);

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<PostType | null> => {
    if (!slug) {
      return null;
    }

    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      select: SINGLE_POST_SELECT,
    });

    return post ? serializePost(post) : null;
  },
);

// Strip HTML for preview text - runs on server, not client
export const getPlainTextPreview = (html: string, maxLength = 160): string => {
  if (!html) return "";

  const text = html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// Generate preview on the server for blog list items
export function getPostPreview(html: string, maxLength = 180): string {
  return getPlainTextPreview(html, maxLength);
}
