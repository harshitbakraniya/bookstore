import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "../context/FavoritesContext";
import App from "../App";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";

vi.mock("../pages/BooksDetail/index.tsx", () => ({
  default: () => <div>Book Details Page</div>,
}));

vi.mock("../hooks/useBooks", () => ({
  default: () => ({
    data: [],
    isLoading: false,
    isFetchingNextPage: false,
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    error: null,
  }),
}));

function renderApp(initialPath = "/") {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Home /> },
          { path: "favorites", element: <Favorites /> },
          { path: "books/:id", element: <div>Book Details Page</div> },
        ],
      },
    ],
    { initialEntries: [initialPath] },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </QueryClientProvider>,
  );
}

describe("Routing", () => {
  it("renders home page on /", () => {
    renderApp("/");
    expect(
      screen.getByText(/good evening, start reading today/i),
    ).toBeInTheDocument();
  });

  it("navigates to favorites page", async () => {
    renderApp("/");
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: /favorites/i }));

    expect(screen.getByText(/no favorites found/i)).toBeInTheDocument();
  });
});
