import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge, HeartIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useFavorites } from "../../../../context/FavoritesContext";

export type Book = {
  id: string;
  kind: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    language?: string;
  };
  saleInfo?: {
    listPrice?: {
      amount: number;
    };
  };
};

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  const { addFavorite, favorites, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(
    (favorite: Book) => favorite.id === book.id,
  );

  const handleToggleFavorite = (
    e: React.MouseEvent<HTMLButtonElement>,
    book: Book,
  ) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  return (
    <Link to={`/books/${book.id}`} key={book.id}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="relative z-20 flex items-center justify-center bg-gray-200 rounded-lg">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 hover:bg-primary/80 rounded-full bg-white hover:text-white cursor-pointer"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleToggleFavorite(e, book)
            }
          >
            {isFavorite ? (
              <HeartIcon className="size-5 bg-red-500 text-white rounded-full p-1" />
            ) : (
              <HeartIcon className="size-5" />
            )}
          </Button>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            className="relative z-20 w-2/3 mx-auto p-10"
          />
        </div>
        <CardHeader>
          <CardAction>
            <Badge>{book.volumeInfo.categories?.[0]}</Badge>
          </CardAction>
          <CardTitle className="line-clamp-1">
            {book.volumeInfo.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {book.volumeInfo.description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">View More</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default React.memo(BookCard);    
