import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../../hooks/useSearchQuery";

const SearchForm = () => {
  const [, setSearchParams] = useSearchParams();
  const { title, author, genre } = useSearchQuery();    
  const [localSearch, setLocalSearch] = useState({
    title: title,
    author: author,
    genre: genre,
  });

  
  
  const [error, setError] = useState("");

  const isEmpty =
    !localSearch.title.trim() &&
    !localSearch.author.trim() &&
    !localSearch.genre.trim();

  const validate = () => {
    const hasValue =
      localSearch.title.trim() ||
      localSearch.author.trim() ||
      localSearch.genre.trim();
    if (!hasValue) {
      setError("Please enter at least one field to search.");
      return false;
    }
    setError("");
    return true;
  };

  const onSearch = () => {
    if (!validate()) return;
    const params = new URLSearchParams();
    localSearch.title && params.set("title", localSearch.title);
    localSearch.author && params.set("author", localSearch.author);
    localSearch.genre && params.set("genre", localSearch.genre);
    setSearchParams(params, { replace: true });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch({ ...localSearch, [e.target.name]: e.target.value });
    if (error) setError("");
  };
  return (
    <div className="relative max-w-5xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6 z-10">
      <form role="search" aria-label="Search books" onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-3 border border-gray-200 rounded-2xl md:rounded-full p-4 sm:p-5 md:p-3 md:pl-10 bg-white/50 backdrop-blur-sm">
        <div className="flex-1 w-full">
          <Label htmlFor="title" className="text-sm font-medium text-gray-500">
            Title
          </Label>
          <Input
            id="title"
            placeholder=""
            className="rounded-none border-0 shadow-none border-b border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
            name="title"
            value={localSearch.title}
            onChange={handleChange}
            onKeyDown={handleSearchKey}
          />
        </div>
        <div className="flex-1 w-full lg:border-l lg:border-r border-gray-300 lg:px-4">
          {" "}
          <Label htmlFor="author" className="text-sm font-medium text-gray-500">
            Author
          </Label>
          <Input
            id="author"
            placeholder=""
            className="rounded-none shadow-none border-0 border-b border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
            name="author"
            value={localSearch.author}
            onChange={handleChange}
            onKeyDown={handleSearchKey}
          />
        </div>
        <div className="flex-1 w-full">
          {" "}
          <Label htmlFor="genre" className="text-sm font-medium text-gray-500">
            Genre
          </Label>
          <Input
            id="genre"
            placeholder=""
            className="rounded-none border-0 shadow-none border-b  border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
            name="genre"
            value={localSearch.genre}
            onChange={handleChange}
            onKeyDown={handleSearchKey}
          />
        </div>
        <Button
          type="submit"
          aria-label="Search books"
          className="w-full md:w-15 h-12 md:h-15 rounded-full border-0 cursor-pointer shrink-0"
          disabled={isEmpty}
        >
          <SearchIcon className="size-5" />
          <span className="md:hidden ml-2">Search</span>
        </Button>
      </form>
      {error && (
        <p className="text-sm text-destructive mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default SearchForm;
