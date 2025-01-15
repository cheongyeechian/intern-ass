import { db } from "@/utils/connect";
import { NextResponse } from "next/server";

// GET A SINGLE POST
export async function GET (req: Request, { params }: { params: { slug: string } }):Promise<NextResponse> {
  const { slug } = params; // Extract slug from URL params

  console.log(`Fetching post with slug: ${slug}`);

  try {
    const post = await db.post.findUnique({
      where: {slug}, 
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ message: "Post not found!" }), {status: 404,});
    }
    return new NextResponse(JSON.stringify(post), { status: 200 });

  } catch (err) {
    console.error('Error fetching post:', err); 
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    ); 
  }
};


