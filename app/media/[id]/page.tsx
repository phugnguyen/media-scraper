import { MediaItem } from "@/app/types";
import React from "react";

async function fetchMediaById(id: string): Promise<MediaItem | null> {
  const res = await fetch(`http://localhost:3000/api/media/${id}`, {
    cache: "no-store", // Disable caching for dynamic data
  });

  if (!res.ok) {
    return null; // Return null if the fetch fails
  }

  return res.json();
}

export default async function MediaPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // Destructure the id from params
  const media = await fetchMediaById(id);

  if (!media) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Media Not Found
          </h1>
          <p className="text-gray-600 mt-2">
            The media item with ID {id} could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Media Details</h1>

        {media.type === "image" && (
          <img
            src={media.url}
            alt={media.url}
            className="w-full h-auto object-cover"
          />
        )}
        {media.type === "video" && (
          <video
            controls
            src={media.url}
            className="w-full h-auto object-cover"
          >
            Your browser does not support the video tag.
          </video>
        )}
        {media.type !== "image" && media.type !== "video" && (
          <p className="p-4">Unknown media type</p>
        )}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <p>
            <span className="font-medium text-gray-700">ID:</span> {media.id}
          </p>
          <p>
            <span className="font-medium text-gray-700">Type:</span>{" "}
            {media.type}
          </p>
          <p>
            <span className="font-medium text-gray-700">URL:</span>{" "}
            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {media.url}
            </a>
          </p>
          <p>
            <span className="font-medium text-gray-700">Metadata:</span>
          </p>
          <pre className="bg-gray-100 border rounded p-4 text-sm overflow-auto">
            {JSON.stringify(media.metadata, null, 2)}
          </pre>
          <p>
            <span className="font-medium text-gray-700">Created At:</span>{" "}
            {new Date(media.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
