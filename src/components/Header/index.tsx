import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { favorites } = useFavorites();
  return (
    <header className="lg:max-w-4xl w-[95%] mx-auto bg-white/50 backdrop-blur-sm fixed top-5 lg:top-7 left-0 right-0 z-50 py-3 px-3 rounded-full flex justify-between items-center border border-gray-200">
      <Link to="/">
        <span className="text-lg font-medium flex items-center">
          <span className="h-10 w-10 block bg-primary rounded-full flex items-center justify-end text-white text-md font-medium">
            B
          </span>
          ookSearch
        </span>
      </Link>
      <Link to="/favorites" className="cursor-pointer ml-auto" aria-label="Favorites">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 mr-3 border-gray-300 cursor-pointer relative"
          aria-label="Favorites"
        >
          <HeartIcon className="size-5" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Button>
      </Link>
      <Button
        variant="outline"
        className="bg-primary text-primary-foreground hover:text-white hover:bg-primary/80 rounded-full px-6 h-11 cursor-pointer"
      >
        Login
      </Button>
    </header>
  );
};

export default Header;
