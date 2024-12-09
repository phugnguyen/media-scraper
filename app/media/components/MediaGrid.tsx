import React from "react";

interface MediaItem {
  id: number;
  url: string;
  type: string;
  metadata: any;
  metadataText: string;
  originUrl: string;
  createdAt: string;
}

interface MediaGridProps {
  items: MediaItem[];
}

const MediaItemDetails: React.FC<{ item: MediaItem }> = ({ item }) => (
  <div className="p-4 text-sm">
    <p className="text-gray-700">
      <strong>ID:</strong> {item.id}
    </p>
    <p className="text-gray-700">
      <strong>Type:</strong> {item.type}
    </p>
    <p className="text-gray-700">
      <strong>URL:</strong> {item.url}
    </p>
    <p className="text-gray-700">
      <strong>Metadata:</strong> {JSON.stringify(item.metadata)}
    </p>
    <p className="text-gray-700">
      <strong>Metadata Text:</strong> {item.metadataText}
    </p>
    <p className="text-gray-700">
      <strong>Origin URL:</strong> {item.originUrl}
    </p>
    <p className="text-gray-700">
      <strong>Created At:</strong> {item.createdAt}
    </p>
  </div>
);

/**
 * MediaGrid displays media items in a responsive grid, similar to Instagram.
 */
export function MediaGrid({ items }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">No results found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {item.type === "image" && (
            <img
              src={item.url}
              alt={item.url}
              className="w-full h-auto object-cover"
            />
          )}
          {item.type === "video" && (
            <video
              controls
              src={item.url}
              className="w-full h-auto object-cover"
            >
              Your browser does not support the video tag.
            </video>
          )}
          {item.type !== "image" && item.type !== "video" && (
            <p className="p-4">Unknown media type</p>
          )}
          <MediaItemDetails item={item} />
        </div>
      ))}
    </div>
  );
}
