import { useFavorites } from "../../context/FavoritesContext";
import BookCard from "../Books/components/BookCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  if(favorites.length === 0) {
    return <div className="max-w-6xl mx-auto pt-[10rem] pb-10">
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-medium">No favorites found</p>
      </div>
    </div>
  }

  return (
    <div className="container mx-auto pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {favorites?.map((book: any) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
