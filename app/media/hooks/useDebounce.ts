import { useState, useEffect } from "react";

/**
 * useDebounce hook delays updating the returned value until after 'delay' ms have elapsed.
 * Useful for delaying actions like search queries.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
