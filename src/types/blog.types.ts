export type BlogAuthor = {
  name: string | null;
  image: string | null;
  email?: string | null;
};

export type PostType = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  img: string[];
  views: number;
  tags: string[];
  createdAt: string;
  user: BlogAuthor | null;
};

export type CommentType = {
  id: string;
  desc: string;
  createdAt: string;
  user: BlogAuthor | null;
};

export type PaginatedPosts = {
  posts: PostType[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
};

export type BlogPageContentProps = PaginatedPosts;

export type BlogCardProps = PostType & {
  index: number;
  currentPage: number;
  className?: string;
  previewText?: string;
};

export type BlogSingleContentProps = {
  post: PostType;
};

export type PageParams = {
  params:
    | {
        slug: string;
      }
    | Promise<{
        slug: string;
      }>;
};

