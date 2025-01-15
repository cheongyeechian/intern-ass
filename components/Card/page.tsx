import { Post } from "@prisma/client";
import Link from "next/link";

const Card: React.FC<{ item: Post }> = ({ item }) => {
  return (
    <div className="flex flex-col border border-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Post Details */}
      <div className="p-4 text-gray-700 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {item.title || "Untitled Post"}
        </h2>
        <div className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <p className="text-md text-gray-600">
          {item.content?.substring(0, 50) || "No description available."}
        </p>
        <div className="mt-4">
          <Link href={`/posts/${item.slug}`}>
            <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded hover:bg-yellow-300">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
