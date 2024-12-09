"use client";

import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useMediaData } from "./hooks/useMediaData";

import { MediaGrid } from "./components/MediaGrid";
import { PaginationControls } from "./components/PaginationControls";
import { SearchBar } from "./components/SearchBar";

// Constants for code clarity and easy adjustments
const DEBOUNCE_DELAY = 500;
const DEFAULT_PER_PAGE = 12;

export default function MediaPage() {
  // State for input fields
  const [queryInput, setQueryInput] = useState<string>("");
  const debouncedQuery = useDebounce(queryInput, DEBOUNCE_DELAY);

  // State for filtering by type
  const [mediaType, setMediaType] = useState<string>("");

  // State for pagination
  const [page, setPage] = useState<number>(1);

  // Note: perPage is constant here but could also be adjustable
  const perPage = DEFAULT_PER_PAGE;

  // Fetch media data using the custom hook
  const { items, totalPages, totalItems, loading, error } = useMediaData({
    page,
    perPage,
    query: debouncedQuery,
    mediaType,
  });

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <div className="max-w-3xl mx-auto py-6 px-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold tracking-tight">Media Items</h1>
        <SearchBar
          queryInput={queryInput}
          onQueryChange={(val) => {
            setQueryInput(val);
            setPage(1);
          }}
          mediaType={mediaType}
          onTypeChange={(val) => {
            setMediaType(val);
            setPage(1);
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-10">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && !loading && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Only display the grid if we have items and not loading */}
        {!loading && !error && <MediaGrid items={items} />}

        {/* Show pagination only if we have results */}
        {totalItems > 0 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onNext={goToNextPage}
            onPrev={goToPrevPage}
          />
        )}
      </div>
    </div>
  );
}
