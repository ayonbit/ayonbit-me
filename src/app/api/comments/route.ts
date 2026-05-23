import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

import { authOptions } from "../../../utils/auth";

export const dynamic = "force-dynamic";

interface CreateCommentBody {
  desc: string;
  postSlug: string;
}

// GET /api/comments?slug=the-post-slug
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      {
        error: "Missing slug in query",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postSlug: slug,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comments, {
      status: 200,
    });
  } catch (err) {
    console.error("GET /api/comments error:", err);

    return NextResponse.json(
      {
        error: "Failed to load comments",
      },
      {
        status: 500,
      },
    );
  }
}

// POST /api/comments
export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  const { desc, postSlug }: CreateCommentBody = await req.json();

  if (!desc?.trim() || !postSlug) {
    return NextResponse.json(
      {
        error: "Missing desc or postSlug in body",
      },
      {
        status: 400,
      },
    );
  }

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const data = {
    desc,
    postSlug,
    userEmail: session.user.email,
  };

  try {
    const comment = await prisma.comment.create({
      data,
    });

    return NextResponse.json(comment, {
      status: 201,
    });
  } catch (err) {
    console.error("POST /api/comments error:", err);

    return NextResponse.json(
      {
        error: "Failed to save comment",
      },
      {
        status: 500,
      },
    );
  }
}
