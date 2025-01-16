import { Post } from "@prisma/client";
import Link from "next/link";
import { BackgroundGradient } from "../ui/background-gradient";

const Card: React.FC<{ item: Post }> = ({ item }) => {
  return (
    <div className="flex flex-col max-h-min rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ">
      <BackgroundGradient className="rounded-[22px] p-4  bg-black">
        <h2 className="text-lg font-semibold text-white mb-2">
          {item.title || "Untitled Post"}
        </h2>
        <div className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <p className="text-sm text-white ">
          {item.content?.substring(0, 50) || "No description available."}
        </p>
        <Link href={`/posts/${item.slug}`}>
          <button className="rounded-full px-2 py-1 text-black flex items-center space-x-1 bg-white mt-4 text-xs font-bold">
            <span>Read More</span>
          </button>
        </Link>
      </BackgroundGradient>
    </div>
  );
};

export default Card;
