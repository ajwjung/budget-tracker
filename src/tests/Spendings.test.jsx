import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Spendings from "../components/Spendings";
import Wishlist from "../components/Wishlist";
import { WishlistContext } from "../App";

describe("Spendings Component", () => {
  it("renders a form to enter an expense", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/transactions"],
        initialIndex: 1,
      }
    );

    render(<RouterProvider router={router} />);

    const enterExpenseBtn = screen.getByRole("button", {
      name: "Enter an Expense",
    });
    const spendingsHeading = screen.getByRole("heading", {
      name: "Enter an Expense:",
    });
    const transactionType = screen.getByRole("combobox", {
      name: "Transaction Type",
    });

    expect(enterExpenseBtn).toBeInTheDocument();
    expect(spendingsHeading).toBeInTheDocument();
    expect(transactionType).toBeInTheDocument();
  });

  it("renders a form to enter a deposit", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/transactions"],
        initialIndex: 1,
      }
    );

    render(<RouterProvider router={router} />);

    const enterDepositBtn = screen.getByRole("button", {
      name: "Enter a Deposit",
    });
    const depositsHeading = screen.getByRole("heading", {
      name: "Enter a Deposit:",
    });
    const depositsDescription = screen.getByText("Deposit Date");

    expect(enterDepositBtn).toBeInTheDocument();
    expect(depositsHeading).toBeInTheDocument();
    expect(depositsDescription).toBeInTheDocument();
  });

  it("renders a table displaying past transactions", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/transactions"],
        initialIndex: 1,
      }
    );

    render(<RouterProvider router={router} />);

    const transactionsHeading = screen.getByRole("heading", {
      name: "Past Transactions",
    });
    const transactionTable = screen.getByRole("table");
    const tableHeaders = screen.getAllByRole("columnheader");

    expect(transactionsHeading).toBeInTheDocument();
    expect(transactionTable).toBeInTheDocument();
    expect(tableHeaders.length).toBe(5);
  });

  it("renders an Edit and Delete button for each entry (1)", () => {
    const FAKE_TRANSACTIONS = [
      {
        id: 0,
        date: "2024-01-01",
        transactionCategory: "Food/Drinks",
        description: "FAKE BURGER",
        amount: -19.99,
      },
    ];
    const handleAddTransaction = vi.fn();
    const handleSaveEditedTransaction = vi.fn();
    const handleDeleteTransaction = vi.fn();

    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/transactions"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          transactions: FAKE_TRANSACTIONS,
          handleAddTransaction,
          handleSaveEditedTransaction,
          handleDeleteTransaction,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const editBtn = screen.getByRole("button", { name: "Edit" });
    const deleteBtn = screen.getByRole("button", { name: "Delete" });

    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });
});
