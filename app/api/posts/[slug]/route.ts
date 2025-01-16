import { db } from "@/utils/connect";
import { NextResponse } from "next/server";

// GET A SINGLE POST
export async function GET(
  request: Request,
  context: { params: { slug: string } }
): Promise<NextResponse> {
  const { params } = await context;
  const {slug} = params;


  try {
    const post = await db.post.findUnique({
      where: { slug },
      include: { user: true },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found!" }, { status: 404 });
    }
    
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
