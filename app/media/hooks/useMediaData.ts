import { MediaItem } from "@/app/types";
import { useState, useEffect } from "react";

interface UseMediaDataParams {
  page: number;
  perPage: number;
  query: string;
  mediaType: string;
}

/**
 * useMediaData fetches media items from the API based on pagination, search query, and type filters.
 */
export function useMediaData({
  page,
  perPage,
  query,
  mediaType,
}: UseMediaDataParams) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("perPage", perPage.toString());
      if (query.trim()) {
        params.append("q", query.trim());
      }
      if (mediaType) {
        params.append("type", mediaType);
      }

      try {
        const res = await fetch(`/api/media?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const { items = [], totalPages = 0, totalItems = 0 } = await res.json();
        setItems(items);
        setTotalPages(totalPages);
        setTotalItems(totalItems);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [page, perPage, query, mediaType]);

  return { items, totalPages, totalItems, loading, error };
}
