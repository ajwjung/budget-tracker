import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import BudgetTable from "../components/BudgetTable";
import { WishlistContext } from "../App";

describe("BudgetTable component", () => {
  const FAKE_CATEGORIES = [
    {
      id: 0,
      category: "Insurance",
      balance: 249.78,
    },
    {
      id: 1,
      category: "Credit Card Payment",
      balance: 382.17,
    },
  ];
  const FAKE_BALANCE = 1032.87;

  it("renders a table with three columns: Category, Balance, and Action", () => {
    const calculateSelectedTotal = vi.fn(() => 38.77);
    const calculateTotal = vi.fn((formType) => {
      return formType === "budget" ? 284.18 : 182.39;
    });

    render(
      <WishlistContext.Provider
        value={{ categories: FAKE_CATEGORIES, startingBalance: FAKE_BALANCE }}
      >
        <BudgetTable
          calculateTotal={calculateTotal}
          calculateSelectedTotal={calculateSelectedTotal}
        />
      </WishlistContext.Provider>
    );

    const table = screen.getByRole("table");
    const tableHeaders = screen.getByRole("row", {
      name: "Category Balance Action",
    });

    expect(table).toBeInTheDocument();
    expect(tableHeaders).toBeInTheDocument();
  });

  it("renders 6 rows when given 2 categories (including header/footer and 2 required rows)", () => {
    /* 
      Table includes, at minimum, rows for:
        - header
        - footer
        - "Current Balance"
        - "Wishlist Expenses"
    */
    const calculateSelectedTotal = vi.fn(() => 38.77);
    const calculateTotal = vi.fn((formType) => {
      return formType === "budget" ? 284.18 : 182.39;
    });

    render(
      <WishlistContext.Provider
        value={{ categories: FAKE_CATEGORIES, startingBalance: FAKE_BALANCE }}
      >
        <BudgetTable
          calculateTotal={calculateTotal}
          calculateSelectedTotal={calculateSelectedTotal}
        />
      </WishlistContext.Provider>
    );

    const table = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(tableRows.length).toBe(6);
  });

  it("renders a table that displays wishlist expenses", () => {
    const calculateSelectedTotal = vi.fn(() => 38.77);
    const calculateTotal = vi.fn((formType) => {
      return formType === "budget" ? 284.18 : 182.39;
    });

    render(
      <WishlistContext.Provider
        value={{ categories: FAKE_CATEGORIES, startingBalance: FAKE_BALANCE }}
      >
        <BudgetTable
          calculateTotal={calculateTotal}
          calculateSelectedTotal={calculateSelectedTotal}
        />
      </WishlistContext.Provider>
    );

    const table = screen.getByRole("table");
    const wishlistExpense = screen.getByRole("row", {
      name: "Wishlist Expenses* $38.77 Edit Delete",
    });

    expect(table).toBeInTheDocument();
    expect(wishlistExpense).toBeInTheDocument();
  });

  it("renders a table that displays the remaining balance", () => {
    const calculateSelectedTotal = vi.fn(() => 38.77);
    const calculateTotal = vi.fn((formType) => {
      return formType === "budget" ? 284.18 : 182.39;
    });

    render(
      <WishlistContext.Provider
        value={{ categories: FAKE_CATEGORIES, startingBalance: FAKE_BALANCE }}
      >
        <BudgetTable
          calculateTotal={calculateTotal}
          calculateSelectedTotal={calculateSelectedTotal}
        />
      </WishlistContext.Provider>
    );

    const table = screen.getByRole("table");
    const tableFooter = screen.getByRole("row", {
      name: "Remaining Balance $284.18",
    });

    expect(table).toBeInTheDocument();
    expect(tableFooter).toBeInTheDocument();
  });
});
