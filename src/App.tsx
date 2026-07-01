import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <main className="bg-[#F5F5F5] min-h-screen">
          <Header />
          <Outlet />
          <ScrollRestoration />
        </main>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
