import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import Spendings from "../components/Spendings";
import Wishlist from "../components/Wishlist";

describe("App component", () => {
  it("renders the header", () => {
    const router = createMemoryRouter([
      { path: "/", element: <App /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });

  it("renders the dashboard", () => {
    const router = createMemoryRouter([
      { path: "/", element: <App /> },
      { path: "/transactions", element: <Spendings /> },
      { path: "/wishlist", element: <Wishlist /> },
    ]);

    render(<RouterProvider router={router} />);

    const main = screen.getByRole("main");
    const heading = screen.getByRole("heading", { name: "User's Dashboard" });

    expect(main).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
