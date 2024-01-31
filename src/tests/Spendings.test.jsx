import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Spendings from "../components/Spendings";
import Wishlist from "../components/Wishlist";

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
      name: "Enter Your Spendings",
    });
    const transactionType = screen.getByRole("combobox", {
      name: "Transaction Type",
    });

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

    const depositsHeading = screen.getByRole("heading", {
      name: "Enter Your Deposits",
    });
    const depositsDescription = screen.getByText("Deposit Date");

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
});
