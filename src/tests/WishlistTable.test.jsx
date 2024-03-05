import { render, screen } from "@testing-library/react";
import WishlistTable from "../components/WishlistTracker/WishlistTable";
import { WishlistContext } from "../App";

describe("WishlistTable component", () => {
  const FAKE_WISHLIST = [
    {
      id: 0,
      item: "Sweater",
      price: 38.99,
      link: "",
    },
    {
      id: 1,
      item: "Action Figure",
      price: 95.99,
      link: "https://www.google.com/",
    },
    {
      id: 2,
      item: "Tumbler",
      price: 24.99,
      link: "",
    },
  ];
  const SELECTED_IDS = [1, 2];

  it("renders a table with five columns: Select, Item, Price, Link to Item, and Action", () => {
    const calculateSelectedTotal = vi.fn(() => 102.98);
    const calculateTotal = vi.fn((formType) => {
      return formType === "wishlist" ? 148.97 : 888.88;
    });

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          idsOfSelectedItems: SELECTED_IDS,
        }}
      >
        <WishlistTable
          calculateSelectedTotal={calculateSelectedTotal}
          calculateTotal={calculateTotal}
        />
      </WishlistContext.Provider>
    );

    const table = screen.getByRole("table");
    const tableHeaders = screen.getByRole("row", {
      name: "Select Item Price ($) Link to Item Action",
    });

    expect(table).toBeInTheDocument();
    expect(tableHeaders).toBeInTheDocument();
  });

  it("renders 6 rows when given 3 items (including header/footer rows)", () => {
    const calculateSelectedTotal = vi.fn(() => 102.98);
    const calculateTotal = vi.fn((formType) => {
      return formType === "wishlist" ? 148.97 : 888.88;
    });

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          idsOfSelectedItems: SELECTED_IDS,
        }}
      >
        <WishlistTable
          calculateSelectedTotal={calculateSelectedTotal}
          calculateTotal={calculateTotal}
        />
      </WishlistContext.Provider>
    );

    const tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(6);
  });

  it("renders a row for a wishlisted item: Action Figure for $95.99", () => {
    const calculateSelectedTotal = vi.fn(() => 102.98);
    const calculateTotal = vi.fn((formType) => {
      return formType === "wishlist" ? 148.97 : 888.88;
    });

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          idsOfSelectedItems: SELECTED_IDS,
        }}
      >
        <WishlistTable
          calculateSelectedTotal={calculateSelectedTotal}
          calculateTotal={calculateTotal}
        />
      </WishlistContext.Provider>
    );

    const wishlistItem = screen.getByRole("row", {
      name: "Action Figure 95.99 https://www.google.com/ Edit Delete",
    });

    expect(wishlistItem).toBeInTheDocument();
  });

  it("renders an edit and a delete button for each entry (3 total per)", () => {
    const calculateSelectedTotal = vi.fn(() => 102.98);
    const calculateTotal = vi.fn((formType) => {
      return formType === "wishlist" ? 148.97 : 888.88;
    });

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          idsOfSelectedItems: SELECTED_IDS,
        }}
      >
        <WishlistTable
          calculateSelectedTotal={calculateSelectedTotal}
          calculateTotal={calculateTotal}
        />
      </WishlistContext.Provider>
    );

    const editBtn = screen.getAllByRole("button", { name: "Edit" });
    const deleteBtn = screen.getAllByRole("button", { name: "Delete" });

    expect(editBtn.length).toBe(3);
    expect(deleteBtn.length).toBe(3);
  });

  it("renders a row displaying the total for all wishlisted items entered", () => {
    const calculateSelectedTotal = vi.fn(() => 102.98);
    const calculateTotal = vi.fn((formType) => {
      return formType === "wishlist" ? 148.97 : 888.88;
    });

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          idsOfSelectedItems: SELECTED_IDS,
        }}
      >
        <WishlistTable
          calculateSelectedTotal={calculateSelectedTotal}
          calculateTotal={calculateTotal}
        />
      </WishlistContext.Provider>
    );

    const total = screen.getByRole("row", { name: "Total $148.97" });

    expect(total).toBeInTheDocument();
  });

  it("renders a row displaying the total for selected items only", () => {
    const calculateSelectedTotal = vi.fn(() => 102.98);
    const calculateTotal = vi.fn((formType) => {
      return formType === "wishlist" ? 148.97 : 888.88;
    });

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          idsOfSelectedItems: SELECTED_IDS,
        }}
      >
        <WishlistTable
          calculateSelectedTotal={calculateSelectedTotal}
          calculateTotal={calculateTotal}
        />
      </WishlistContext.Provider>
    );

    const totalSelected = screen.getByRole("row", {
      name: "Total (selected) $102.98",
    });

    expect(totalSelected).toBeInTheDocument();
  });
});
