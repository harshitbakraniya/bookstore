import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchQuery } from "./useSearchQuery";

const fetchBooks = async ({
  title,
  author,
  genre,
  startIndex,
}: {
  title: string;
  author: string;
  genre: string;
  startIndex: number;
}) => {
  let query = "";
  if (title) {
    query += `+intitle:${title}`;
  }
  if (author) {
    query += `+inauthor:${author}`;
  }
  if (genre) {
    query += `+subject:${genre}`;
  }
  const response = await fetch(
    `${import.meta.env.VITE_GOOGLE_BOOKS_API_URL}?q=${query}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}&startIndex=${startIndex}`,
  );
  const data = await response.json();
  return data;
};

const useBooks = () => {
  const { title, author, genre } = useSearchQuery();
  const hasSearch = title.trim() || author.trim() || genre.trim();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["books", title, author, genre],
    queryFn: ({ pageParam = 0 }) =>
      fetchBooks({ title, author, genre, startIndex: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * 10;
      if (lastPage.items?.length < 10 || loaded >= lastPage.totalItems) {
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
    error,
  };
};

export default useBooks;
