import { db } from "@/utils/connect";
import { NextResponse } from "next/server";

// GET A SINGLE POST
 const GET = async (req: Request, {params}:{params:{slug:string}})=> {
   const { slug } = params; // Extract slug from URL params

   try {
     const post = await db.post.findUnique({
       where: { slug }, // Fetch the post by slug
     });

     console.log(post);

     if (!post) {
       return new NextResponse(JSON.stringify({ message: "Post not found!" }), {
         status: 404,
       });
     }
     return new NextResponse(JSON.stringify(post), { status: 200 });
   } catch (err) {
     console.error(err);
     return new NextResponse(
       JSON.stringify({ message: "Something went wrong!" }),
       { status: 500 }
     );
   }
 };

export default GET;