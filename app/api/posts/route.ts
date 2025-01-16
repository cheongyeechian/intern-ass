import { db } from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/auth";

// GET ALL POSTS
export const GET = async () => {
  try {
    const posts = await db.post.findMany(); // Fetch all posts
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};


// CREATE A NEW POST
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const body = await req.json();
    const slug = body.title.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        slug: slug,
        userEmail: session.user.email,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};