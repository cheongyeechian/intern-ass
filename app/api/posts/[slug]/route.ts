import { db } from "@/utils/connect";
import { NextResponse } from "next/server";

// GET A SINGLE POST
export async function GET(
  request: Request,
  { params } : { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  
  const {slug} = await params;

  console.log(`Fetching post with slug: ${slug}`);

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
