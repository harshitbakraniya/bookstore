import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "./FavoritesContext";
import { mockBook } from "../test/mocks/book";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe("FavoritesContext", () => {
  it("adds a favorite", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => result.current.addFavorite(mockBook));

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe("book-1");
  });

  it("does not add duplicate favorites", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockBook);
      result.current.addFavorite(mockBook);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it("removes a favorite", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => result.current.addFavorite(mockBook));
    act(() => result.current.removeFavorite("book-1"));

    expect(result.current.favorites).toHaveLength(0);
  });
});
