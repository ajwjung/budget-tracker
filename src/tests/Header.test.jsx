import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import App from "../App";
import Spendings from "../components/Spendings";
import Wishlist from "../components/Wishlist";

describe("Header component", () => {
  it("renders the nav with three links: Dashboard, Transactions, and Wishlist Tracker", () => {
    const router = createMemoryRouter([
      { path: "/", element: <App /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const navBar = screen.getByRole("navigation");
    const navLinks = screen.getAllByRole("link");

    expect(navBar).toBeInTheDocument;
    expect(navLinks.length).toBe(3);
  });

  it("renders a Dashboard link with a route to '/' path", () => {
    const router = createMemoryRouter([
      { path: "/", element: <App /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toHaveAttribute("href", "/");
  });

  it("renders a Transactions link with a route to '/transactions' path", () => {
    const router = createMemoryRouter([
      { path: "/", element: <App /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const transactionsLink = screen.getByRole("link", { name: "Transactions" });
    expect(transactionsLink).toHaveAttribute("href", "/transactions");
  });

  it("renders a Wishlist link with a route to '/wishlist' path", () => {
    const router = createMemoryRouter([
      { path: "/", element: <App /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const wishlistLink = screen.getByRole("link", { name: "Wishlist Tracker" });
    expect(wishlistLink).toHaveAttribute("href", "/wishlist");
  });
});
