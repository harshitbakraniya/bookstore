import { createContext, useCallback, useContext, useState } from "react";
import type { Book } from "../pages/Books/components/BookCard";

type FavoritesContextType = {
  favorites: Book[];
  addFavorite: (favorite: Book) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  const addFavorite = useCallback((favorite: Book) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === favorite.id) ? prev : [...prev, favorite],
    );
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
