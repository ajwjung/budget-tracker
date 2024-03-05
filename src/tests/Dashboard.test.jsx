import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import Spendings from "../components/Spendings";
import Wishlist from "../components/WishlistTracker/Wishlist";

describe("Dashboard component", () => {
  it("renders a canvas chart", () => {
    const router = createMemoryRouter([
      { path: "/", element: <Dashboard /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const chart = screen.getByRole("img", { name: "" });
    expect(chart).toBeInTheDocument();
  });

  it("renders an overview card", () => {
    const router = createMemoryRouter([
      { path: "/", element: <Dashboard /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const overviewCard = screen.getByText("Overview");
    expect(overviewCard).toBeInTheDocument();
  });

  it("renders recent transactions", () => {
    const router = createMemoryRouter([
      { path: "/", element: <Dashboard /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const recentTransactions = screen.getByText("Recent Transactions");
    expect(recentTransactions).toBeInTheDocument();
  });
});
