const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto pt-[10rem] pb-10 animate-pulse">
      <div className="flex gap-10 items-center">
        <div className="w-1/4 bg-gray-200 rounded-lg p-4 flex items-center justify-center h-56">
          <div className="w-[140px] h-[200px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col gap-3">
            <div className="h-7 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-24 mt-2"></div>
            <div className="h-10 w-32 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
        <div className="h-20 bg-gray-100 rounded my-2"></div>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
        <div className="flex flex-col gap-2 p-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/12"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;