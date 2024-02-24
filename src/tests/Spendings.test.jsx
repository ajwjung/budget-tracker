import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import Calculate from "../scripts/Calculate";
import Header from "../components/Header";
import App from "../App";
import Spendings from "../components/Spendings";
import Wishlist from "../components/Wishlist";
import { WishlistContext } from "../App";
import { useContext } from "react";

vi.mock("../components/Spendings.jsx", () => ({
  default: () => {
    const { transactions } = useContext(WishlistContext);
    const sortedTransactions = Calculate.sortTransactionsByDate(transactions);

    return (
      <>
        <Header />
        <main>
          <h2>Enter an Expense:</h2>
          <form id="spendings-form">
            <input type="date" name="transactionDate" id="transaction-date" />
            <select name="transactionCategory" id="transaction-category">
              <option value="Bills/Utilities">Bills/Utilities</option>
            </select>
            <input
              type="text"
              name="transactionDescription"
              id="transaction-description"
            />
            <input
              type="number"
              name="transactionAmount"
              id="transaction-amount"
            />
            <button type="submit">Save</button>
          </form>
          <h2>Enter a Deposit:</h2>
          <form id="deposits-form">
            <input type="date" name="depositDate" id="deposit-date" />
            <input type="text" name="depositCategory" id="deposit-category" />
            <input
              type="text"
              name="depositDescription"
              id="deposit-description"
            />
            <input type="number" name="depositAmount" id="deposit-amount" />
            <button type="submit">Save</button>
          </form>
          <h2>Past Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => {
                return (
                  <tr>
                    <td>{transaction.date}</td>
                    <td>{transaction.transactionCategory}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <button onClick={() => {}} type="button">
                        Edit
                      </button>
                      <button onClick={() => {}} type="button">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </>
    );
  },
}));

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

    const spendingsHeading = screen.getByRole("heading", {
      name: "Enter an Expense:",
    });
    const transactionType = screen.getByRole("combobox", {
      name: "",
    });
    const transactionOption = screen.getByRole("option", {
      name: "Bills/Utilities",
    });
    const transactionAmt = screen.getAllByRole("spinbutton", { name: "" })[0];
    const saveBtn = screen.getAllByRole("button", { name: "Save" })[0];

    expect(spendingsHeading).toBeInTheDocument();
    expect(transactionType).toBeInTheDocument();
    expect(transactionOption).toBeInTheDocument();
    expect(transactionAmt).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
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

    const depositHeading = screen.getByRole("heading", {
      name: "Enter a Deposit:",
    });
    const depositAmt = screen.getAllByRole("spinbutton", { name: "" })[1];
    const saveBtn = screen.getAllByRole("button", { name: "Save" })[1];

    expect(depositHeading).toBeInTheDocument();
    expect(depositAmt).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
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
