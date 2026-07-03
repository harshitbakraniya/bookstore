const BASE_URL = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export class ApiError extends Error {
  status: number;
  constructor(
    message: string,
    status: number,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError("Book not found.", 404);
    }
    if (response.status === 429) {
      throw new ApiError("Too many requests. Please try again later.", 429);
    }
    throw new ApiError(
      "Something went wrong. Please try again.",
      response.status,
    );
  }

  const data = await response.json();

  if (data && data.error) {
    throw new ApiError(
      data.error.message || "API error",
      data.error.code || 500,
    );
  }

  return data;
}

export async function searchBooks(args: {
  title: string;
  author: string;
  genre: string;
  startIndex: number;
}) {
  let query = "";
  if (args.title) query += `+intitle:${args.title}`;
  if (args.author) query += `+inauthor:${args.author}`;
  if (args.genre) query += `+subject:${args.genre}`;

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&startIndex=${args.startIndex}`;
  return fetchJson<{ items?: any[]; totalItems: number }>(url);
}

export async function getBookById(id: string) {
  const url = `${BASE_URL}/${id}?key=${API_KEY}`;
  return fetchJson<any>(url);
}
