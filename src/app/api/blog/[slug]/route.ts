import { NextRequest, NextResponse } from "next/server";

import { getBlogPostBySlug } from "../../../../lib/blog";

export const revalidate = 3600;

type RouteContext = {
  params:
    | {
        slug: string;
      }
    | Promise<{
        slug: string;
      }>;
};

export const GET = async (
  _req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> => {
  try {
    const { slug } = await Promise.resolve(context.params);
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 },
    );
  }
};
