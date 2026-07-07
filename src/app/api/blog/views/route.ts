import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { slug } = (await req.json()) as { slug?: string };

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 },
      );
    }

    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true, views: true },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 },
      );
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        views: { increment: 1 },
      },
      select: { views: true },
    });

    return NextResponse.json(
      { views: updatedPost.views },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to increment view count:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
