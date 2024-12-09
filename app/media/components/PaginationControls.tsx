import React from "react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * PaginationControls render "Prev" and "Next" buttons along with current page info.
 * Hidden if there are no pages (i.e., totalPages = 0).
 */
export function PaginationControls({
  page,
  totalPages,
  onNext,
  onPrev,
}: PaginationControlsProps) {
  if (totalPages === 0) return null;

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className={`px-4 py-2 border rounded-md ${
          page <= 1
            ? "text-gray-400 border-gray-300"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
      >
        Prev
      </button>
      <span className="text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className={`px-4 py-2 border rounded-md ${
          page >= totalPages
            ? "text-gray-400 border-gray-300"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}
