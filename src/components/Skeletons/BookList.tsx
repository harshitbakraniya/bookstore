export const BookCardSkeleton = () => {
  return (
    <div className="relative mx-auto w-full max-w-sm pt-0 animate-pulse">
      <div className="relative z-20 flex items-center justify-center bg-gray-200 rounded-lg h-48" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-10 bg-gray-200 rounded w-full mt-2" />
      </div>
    </div>
  );
};

type BookListSkeletonProps = {
  count?: number;
};

const BookListSkeleton = ({ count = 8 }: BookListSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default BookListSkeleton;
