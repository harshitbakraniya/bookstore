import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { FavoritesProvider } from "../context/FavoritesContext";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}

type Options = RenderOptions & {
  route?: string;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/", ...options }: Options = {},
) {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </FavoritesProvider>
    </QueryClientProvider>,
    options,
  );
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";