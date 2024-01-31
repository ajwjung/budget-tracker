import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Spendings from "../components/Spendings";
import Wishlist from "../components/Wishlist";

describe("Wishlist Component", () => {
  it("renders a table with wishlist items", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(<RouterProvider router={router} />);

    const wishlistTable = screen.getAllByRole("table")[0];
    const wishlistHeaders = screen.getByRole("row", {
      name: "Select Item Price Action",
    });

    expect(wishlistTable).toBeInTheDocument();
    expect(wishlistHeaders).toBeInTheDocument();
  });

  it("renders a form to add a new wishlist item", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(<RouterProvider router={router} />);

    const formHeading = screen.getByRole("heading", {
      name: "Add a new wishlist item:",
    });

    expect(formHeading).toBeInTheDocument();
  });

  it("renders a table that displays a budget", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(<RouterProvider router={router} />);

    const budgetTable = screen.getAllByRole("table")[1];
    const budgetHeaders = screen.getByRole("row", {
      name: "Category Balance",
    });

    expect(budgetTable).toBeInTheDocument();
    expect(budgetHeaders).toBeInTheDocument();
  });

  it("renders a form to add a new category", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <App /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(<RouterProvider router={router} />);

    const formHeading = screen.getByRole("heading", {
      name: "Add a new category:",
    });

    expect(formHeading).toBeInTheDocument();
  });
});
