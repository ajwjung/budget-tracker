import { render, screen } from "@testing-library/react";
import WishlistTable from "../components/WishlistTable";

describe("WishlistTable component", () => {
  it("renders a table with four columns: Select, Item, Price, and Action", () => {
    render(<WishlistTable />);

    const table = screen.getByRole("table");
    const tableHeaders = screen.getByRole("row", {
      name: "Select Item Price Action",
    });

    expect(table).toBeInTheDocument();
    expect(tableHeaders).toBeInTheDocument();
  });

  it("renders two rows when two items are entered (excludes header/footer)", () => {
    render(<WishlistTable />);

    const table = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(tableRows.length).toBe(4);
  });

  it("renders a row for a wishlisted item: Fake Doll for $30.82", () => {
    render(<WishlistTable />);

    const table = screen.getByRole("table");
    const wishlistItem = screen.getByRole("row", {
      name: "Fake Doll $30.82 Edit Delete",
    });

    expect(table).toBeInTheDocument();
    expect(wishlistItem).toBeInTheDocument();
  });

  it("renders an edit and a delete button for each entry (2)", () => {
    render(<WishlistTable />);

    const table = screen.getByRole("table");
    const editBtn = screen.getAllByRole("button", { name: "Edit" });
    const deleteBtn = screen.getAllByRole("button", { name: "Delete" });

    expect(table).toBeInTheDocument();
    expect(editBtn.length).toBe(2);
    expect(deleteBtn.length).toBe(2);
  });
});
