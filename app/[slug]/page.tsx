import React from "react";

interface PostPageProps {
  params: { slug: string };
}

// Dynamic Route Page Component
const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const { slug } = params;

  try {
    // Fetch post data from the API
    const res = await fetch(
      `/api/posts/${slug}`,
      {
        cache: "no-store", // Always fetch fresh data
      }
    );

    if (!res.ok) {
      return <div className="text-center">Post not found!</div>;
    }

    const post = await res.json();

    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-6">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <p className="text-gray-700 leading-7">{post.content}</p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return <div className="text-center">Something went wrong!</div>;
  }
};

export default PostPage;
