import React from "react";

interface SearchBarProps {
  queryInput: string;
  onQueryChange: (value: string) => void;
  mediaType: string;
  onTypeChange: (value: string) => void;
}

/**
 * SearchBar provides a text input for searching and a dropdown for filtering by media type.
 */
export function SearchBar({
  queryInput,
  onQueryChange,
  mediaType,
  onTypeChange,
}: SearchBarProps) {
  return (
    <div className="flex space-x-2 w-full md:w-auto">
      <input
        type="text"
        placeholder="Search..."
        value={queryInput}
        onChange={(e) => onQueryChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400 flex-grow"
      />
      <select
        value={mediaType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400"
      >
        <option value="">All Types</option>
        <option value="image">Images</option>
        <option value="video">Videos</option>
      </select>
    </div>
  );
}
