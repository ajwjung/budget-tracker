import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header component", () => {
  it("renders the nav with three links: Dashboard, Transactions, and Wishlist Tracker", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const navBar = screen.getByRole("navigation");
    const navLinks = screen.getAllByRole("link");

    expect(navBar).toBeInTheDocument;
    expect(navLinks.length).toBe(3);
  });

  it("renders a Dashboard link with a route to '/' path", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toHaveAttribute("href", "/");
  });

  it("renders a Transactions link with a route to '/transactions' path", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const transactionsLink = screen.getByRole("link", { name: "Transactions" });
    expect(transactionsLink).toHaveAttribute("href", "/transactions");
  });

  it("renders a Wishlist link with a route to '/wishlist' path", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const wishlistLink = screen.getByRole("link", { name: "Wishlist Tracker" });
    expect(wishlistLink).toHaveAttribute("href", "/wishlist");
  });
});
