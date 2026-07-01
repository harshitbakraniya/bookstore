import type { Book } from "../../pages/Books/components/BookCard";

export const mockBook: Book = {
  id: "book-1",
  kind: "books#volume",
  selfLink: "https://example.com",
  volumeInfo: {
    title: "Test Book",
    authors: ["Test Author"],
    categories: ["Fiction"],
    imageLinks: { thumbnail: "https://example.com/img.jpg" },
    description: "A test description",
  },
};