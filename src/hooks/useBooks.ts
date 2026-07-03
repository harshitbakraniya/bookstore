import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchQuery } from "./useSearchQuery";
import { searchBooks } from "../api/books";

const useBooks = () => {
  const { title, author, genre } = useSearchQuery();
  const hasSearch = title.trim() || author.trim() || genre.trim();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["books", title, author, genre],
    queryFn: ({ pageParam = 0 }) =>
      searchBooks({ title, author, genre, startIndex: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * 10;
      if ((lastPage.items?.length ?? 0) < 10 || loaded >= lastPage.totalItems) {
        return undefined;
      }
      return loaded;
    },
    enabled: !!hasSearch,
  });

  const books = useMemo(
    () => data?.pages.flatMap((page) => page.items ?? []) ?? [],
    [data],
  );

  return {
    data: books,
    totalItems: data?.pages[0]?.totalItems,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    refetch,
  };
};

export default useBooks;
