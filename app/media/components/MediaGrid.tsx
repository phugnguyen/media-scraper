import React from "react";
import { useRouter } from "next/navigation";

import MediaItemComponent from "./MediaItem";
import { MediaItem } from "@/app/types";

interface MediaGridProps {
  items: MediaItem[];
}

/**
 * MediaGrid displays media items in a responsive grid, similar to Instagram.
 */
export function MediaGrid({ items }: MediaGridProps) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">No results found.</div>
    );
  }

  const handleItemClick = (id: number) => {
    router.push(`/media/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MediaItemComponent
          key={item.id}
          item={item}
          onClick={() => handleItemClick(item.id)}
        />
      ))}
    </div>
  );
}
