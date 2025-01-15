import React, { useEffect, useState } from "react";
import Card from "../Card/page";
import { Post } from "@prisma/client";

const CardList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts", {
          cache: "no-store", // Ensures fresh data on every fetch
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data: Post[] = await res.json(); // Type the response
        setPosts(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <Card key={post.id} item={post} />
      ))}
    </div>
  );
};

export default CardList;
