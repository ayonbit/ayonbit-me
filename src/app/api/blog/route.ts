import { NextRequest, NextResponse } from "next/server";

import { getPaginatedBlogPosts } from "../../../lib/blog";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const page = req.nextUrl.searchParams.get("page") || undefined;
    const data = await getPaginatedBlogPosts(page);

    return NextResponse.json(data, { status: 200 });
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
