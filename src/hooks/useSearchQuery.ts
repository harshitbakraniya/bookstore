import { useSearchParams } from "react-router-dom";

export function useSearchQuery() {
  const [searchParams] = useSearchParams();

  return {
    title: searchParams.get("title") ?? "",
    author: searchParams.get("author") ?? "",
    genre: searchParams.get("genre") ?? "",
  };
}