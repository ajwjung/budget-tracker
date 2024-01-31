import { render, screen } from "@testing-library/react";
import BudgetTable from "../components/BudgetTable";

describe("BudgetTable component", () => {
  it("renders a table with two columns: Category and Balance", () => {
    render(<BudgetTable />);

    const table = screen.getByRole("table");
    const tableHeaders = screen.getByRole("row", { name: "Category Balance" });

    expect(table).toBeInTheDocument();
    expect(tableHeaders).toBeInTheDocument();
  });

  it("renders 6 rows when given 6 categories (excludes header/footer)", () => {
    render(<BudgetTable />);

    const table = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(tableRows.length).toBe(8);
  });

  it("renders a table that calculates wishlist expenses", () => {
    render(<BudgetTable />);

    const table = screen.getByRole("table");
    const wishlistExpense = screen.getByRole("row", {
      name: "Wishlist Expenses* $28.94",
    });

    expect(table).toBeInTheDocument();
    expect(wishlistExpense).toBeInTheDocument();
  });

  it("renders a table that calculates the remaining balance", () => {
    render(<BudgetTable />);

    const table = screen.getByRole("table");
    const tableFooter = screen.getByRole("columnheader", {
      name: "Remaining Balance",
    });

    expect(table).toBeInTheDocument();
    expect(tableFooter).toBeInTheDocument();
  });
});
