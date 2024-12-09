import { MediaItem } from "@/app/types";
import React from "react";

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

const MediaItemComponent: React.FC<{
  item: MediaItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const renderMedia = () => {
    switch (item.type) {
      case "image":
        return (
          <img
            src={item.url}
            alt={item.url}
            className="w-full h-auto object-cover"
          />
        );
      case "video":
        return (
          <video controls src={item.url} className="w-full h-auto object-cover">
            Your browser does not support the video tag.
          </video>
        );
      default:
        return <p className="p-4">Unknown media type</p>;
    }
  };

  return (
    <div
      key={item.id}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {renderMedia()}
      <MediaItemDetails item={item} />
    </div>
  );
};

export default MediaItemComponent;
