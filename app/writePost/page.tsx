"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation after post creation
import { useSession } from "next-auth/react"; // For session authentication

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/loginPage");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",

        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Post created successfully!");
        router.push(`/posts/${data.slug}`); // Redirect to the new post page
      } else {
        throw new Error("Failed to create a post");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-md ">
      <h1 className="text-2xl font-bold mb-4 text-white">Write a New Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border rounded "
            placeholder="Your Title"
            required
          />
        </div>

        {/* Content input */}
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-white"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Your Content..."
            required
          />
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-md w-full p-2 mt-4 ${
              isSubmitting ? "bg-gray-400" : "bg-green-400"
            }`}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
