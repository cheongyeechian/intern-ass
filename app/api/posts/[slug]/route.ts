import { db } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET A SINGLE POST
export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
): Promise<NextResponse> {
  const { slug } = context.params;

  console.log(`Fetching post with slug: ${slug}`);

  try {
    const post = await db.post.findUnique({
      where: { slug },
      include: { user: true },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found!" }), {
        status: 404,
      });
    }
    return new NextResponse(
      JSON.stringify({ ...post, user: { ...post.user } }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching post:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
