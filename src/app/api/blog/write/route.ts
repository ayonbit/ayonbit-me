import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/auth";
import cloudinary from "@/utils/cloudinary";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const dynamic = "force-dynamic";

type CreatePostBody = {
  title?: string;
  desc?: string;
  tags?: string[];
  img?: string[];
};

// POST BLOG POST
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as CreatePostBody;
    const { title, desc, tags = [], img = [] } = body;

    if (!title || !desc) {
      return NextResponse.json(
        { message: "Title and description are required." },
        { status: 400 }
      );
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      return NextResponse.json(
        { message: "Post with this title already exists." },
        { status: 400 }
      );
    }

    const cloudinaryUrls: string[] = [];
    if (Array.isArray(img)) {
      if (img.length > 35) {
        return NextResponse.json(
          { message: "You can upload a maximum of 5 images." },
          { status: 400 }
        );
      }

      // Upload images to Cloudinary with size transformation
      for (const image of img) {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "posts",
        });
        cloudinaryUrls.push(uploadRes.secure_url);
      }
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        tags,
        img: cloudinaryUrls.length ? cloudinaryUrls : img,
        slug,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Create Post Error:", error);
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
