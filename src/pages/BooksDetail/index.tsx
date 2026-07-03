import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Heart, IndianRupee } from "lucide-react";
import { Button } from "../../components/ui/button";
import ProductDetailSkeleton from "../../components/Skeletons/ProductDetail";
import { useFavorites } from "../../context/FavoritesContext";
import { useMemo } from "react";
import type { Book } from "../Books/components/BookCard";
import DOMPurify from "dompurify";
import { getBookById } from "../../api/books";
import ErrorComponent from "../../components/Error/Error";

const BookDetails = () => {
  const { id } = useParams();
  const { addFavorite, favorites, removeFavorite } = useFavorites();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById("gallar" as string),
    enabled: !!id,
    retry: false,
  });

  const isFavorite = useMemo(
    () => favorites.some((f: Book) => f.id === id),
    [favorites, id],
  );

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    return <ErrorComponent error={error} refetch={refetch} />;
  }

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id as string);
    } else {
      addFavorite(data as Book);
    }
  };

  const safeHtml = DOMPurify.sanitize(data?.volumeInfo?.description || "", {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "ul", "li", "ol"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 lg:pt-[10rem] pb-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-left md:items-start">
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0 bg-gray-200 rounded-lg p-4 flex items-center justify-center">
          <img
            src={data?.volumeInfo.imageLinks?.thumbnail}
            alt={data?.volumeInfo.title}
            className="w-full max-w-[140px] h-auto object-contain"
          />
        </div>
        <div className="w-full md:flex-1 text-left md:text-left">
          <h1 className="text-2xl font-bold">{data?.volumeInfo.title}</h1>
          <p className="text-sm text-gray-500 line-clamp-1 mt-2">
            <span className="font-bold">Author:</span>{" "}
            {data?.volumeInfo.authors?.[0]}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold">Category:</span>{" "}
            {data?.volumeInfo.categories?.[0]}
          </p>
          {data?.saleInfo?.listPrice?.amount && (
            <p className="text-lg font-bold flex items-center mt-2">
              <IndianRupee size={18} />
              {data?.saleInfo?.listPrice?.amount}
            </p>
          )}
          <Button
            className="mt-2 cursor-pointer h-10 px-4"
            onClick={handleToggleFavorite}
          >
            <Heart size={18} fill={isFavorite ? "red" : "none"} />
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </Button>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        <p className="text-md font-medium border border-gray-200 p-2 bg-[#f1f1f1] rounded-lg">
          Description
        </p>
        <p
          className="text-md text-gray-500 mt-2 p-2"
          dangerouslySetInnerHTML={{
            __html: safeHtml,
          }}
        ></p>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        <p className="text-md font-medium border border-gray-200 p-2 bg-[#f1f1f1] rounded-lg">
          Book Details
        </p>
        <div className="p-2 flex flex-col gap-2">
          {data?.volumeInfo.publisher && (
            <p>
              <span className="font-medium">Publisher:</span>{" "}
              {data?.volumeInfo.publisher}
            </p>
          )}
          {data?.volumeInfo.publishedDate && (
            <p>
              <span className="font-medium">Published Date:</span>{" "}
              {data?.volumeInfo.publishedDate}
            </p>
          )}
          {data?.volumeInfo.pageCount && (
            <p>
              <span className="font-medium">Pages:</span>{" "}
              {data?.volumeInfo.pageCount}
            </p>
          )}
          {data?.volumeInfo.language && (
            <p>
              <span className="font-medium">Language:</span>{" "}
              {data?.volumeInfo.language}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
