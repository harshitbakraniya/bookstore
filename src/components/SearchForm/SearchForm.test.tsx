import { describe, it, expect } from "vitest";
import SearchForm from "./index";
import { renderWithProviders, screen, userEvent } from "../../test/test-utils";
import { useSearchQuery } from "../../hooks/useSearchQuery"

function SearchReader() {
  const { title, author, genre } = useSearchQuery();
  return (
    <div>
      <SearchForm />
      <div data-testid="search-result">
        {title}|{author}|{genre}
      </div>
    </div>
  );
}

describe("SearchForm", () => {
  it("disables search button when all fields are empty", () => {
    renderWithProviders(<SearchForm />);
    expect(screen.getByRole("button", { name: /search books/i })).toBeDisabled();
  });

  it("shows validation error on Enter when all fields are empty", async () => {
    renderWithProviders(<SearchForm />);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText(/title/i));
    await user.keyboard("{Enter}");

    expect(
      screen.getByText(/please enter at least one field/i),
    ).toBeInTheDocument();
  });

  it("clears error when user types", async () => {
    renderWithProviders(<SearchForm />);
    const user = userEvent.setup();
    
    await user.click(screen.getByLabelText(/title/i));
    await user.keyboard("{Enter}");
    await user.type(screen.getByLabelText(/title/i), "Harry");

    expect(
      screen.queryByText(/please enter at least one field/i),
    ).not.toBeInTheDocument();
  });

  it("submits search when title is filled and button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchReader />);

    await user.type(screen.getByLabelText(/title/i), "Harry Potter");
    await user.click(screen.getByRole("button", { name: /search books/i }));

    expect(screen.getByTestId("search-result")).toHaveTextContent(
      "Harry Potter||",
    );
  });

  it("submits search on Enter", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchReader />);

    await user.type(screen.getByLabelText(/author/i), "Rowling");
    await user.keyboard("{Enter}");

    expect(screen.getByTestId("search-result")).toHaveTextContent("|Rowling|");
  });
});
