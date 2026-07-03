import useBooks from "../../../../hooks/useBooks";
import { useEffect, useRef } from "react";
import BookListSkeleton from "../../../../components/Skeletons/BookList";
import BookCard from "../BookCard";
import ErrorComponent from "../../../../components/Error/Error";

const BookList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
  } = useBooks();
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = loader.current;
    if (!el || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isLoading
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  if (isLoading) {
    return <BookListSkeleton count={8} />;
  }

  if (isError) {
    return <ErrorComponent error={error} refetch={refetch} />;
  }

  if (!data?.length && !isLoading) {
    return <p className="text-center mt-10">No books found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {data?.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {isFetchingNextPage ? <BookListSkeleton count={8} /> : null}

      {hasNextPage && !isLoading && <div ref={loader} className="h-10"></div>}
    </>
  );
};

export default BookList;
