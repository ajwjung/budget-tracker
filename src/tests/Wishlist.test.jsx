import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Dashboard from "../components/Dashboard";
import Spendings from "../components/Spendings";
import Wishlist from "../components/WishlistTracker/Wishlist";
import { WishlistContext } from "../App";

describe("Wishlist Component", () => {
  const FAKE_WISHLIST = [
    {
      id: 0,
      item: "Sweater",
      price: 38.99,
      link: "",
    },
    {
      id: 1,
      item: "Action Figure",
      price: 95.99,
      link: "https://www.google.com/",
    },
    {
      id: 2,
      item: "Tumbler",
      price: 24.99,
      link: "",
    },
  ];
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
  const SELECTED_IDS = [1, 2];
  const FAKE_BALANCE = 1032.87;

  it("renders a table with wishlist items", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Dashboard /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          categories: FAKE_CATEGORIES,
          idsOfSelectedItems: SELECTED_IDS,
          startingBalance: FAKE_BALANCE,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const wishlistTable = screen.getAllByRole("table")[0];
    const wishlistHeaders = screen.getByRole("row", {
      name: "Select Item Price ($) Link to Item Action",
    });

    expect(wishlistTable).toBeInTheDocument();
    expect(wishlistHeaders).toBeInTheDocument();
  });

  it("renders a form to add a new wishlist item", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Dashboard /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          categories: FAKE_CATEGORIES,
          idsOfSelectedItems: SELECTED_IDS,
          startingBalance: FAKE_BALANCE,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const formHeading = screen.getByRole("heading", {
      name: "Add a new wishlist item:",
    });

    expect(formHeading).toBeInTheDocument();
  });

  it("renders a table that displays a budget", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Dashboard /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          categories: FAKE_CATEGORIES,
          idsOfSelectedItems: SELECTED_IDS,
          startingBalance: FAKE_BALANCE,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const budgetTable = screen.getAllByRole("table")[1];
    const budgetHeaders = screen.getByRole("row", {
      name: "Category Balance ($) Action",
    });

    expect(budgetTable).toBeInTheDocument();
    expect(budgetHeaders).toBeInTheDocument();
  });

  it("renders a form to add a new category", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Dashboard /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          categories: FAKE_CATEGORIES,
          idsOfSelectedItems: SELECTED_IDS,
          startingBalance: FAKE_BALANCE,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const formHeading = screen.getByRole("heading", {
      name: "Add a new category:",
    });

    expect(formHeading).toBeInTheDocument();
  });

  it("calls the `handleAddNewItem` function when `Add` button is clicked", async () => {
    const user = userEvent.setup();

    const handleAddNewItem = vi.fn();
    const router = createMemoryRouter(
      [
        { path: "/", element: <Dashboard /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          categories: FAKE_CATEGORIES,
          idsOfSelectedItems: SELECTED_IDS,
          startingBalance: FAKE_BALANCE,
          handleAddNewItem,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const itemInput = screen.getAllByRole("textbox", { name: "" })[0];
    const priceInput = screen.getAllByRole("spinbutton", { name: "" })[0];
    const addBtn = screen.getAllByRole("button", { name: "Add" })[0];

    await user.type(itemInput, "Cup");
    await user.type(priceInput, "29.99");
    await user.click(addBtn);

    expect(handleAddNewItem).toHaveBeenCalled();
  });

  it("calls the `handleUpdateStartBalance` function when `Save` button is clicked", async () => {
    const user = userEvent.setup();

    const handleUpdateStartBalance = vi.fn();
    const router = createMemoryRouter(
      [
        { path: "/", element: <Dashboard /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          categories: FAKE_CATEGORIES,
          idsOfSelectedItems: SELECTED_IDS,
          startingBalance: FAKE_BALANCE,
          handleUpdateStartBalance,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const startBalanceInput = screen.getAllByRole("spinbutton", {
      name: "",
    })[1];
    const saveBtn = screen.getByRole("button", { name: "Save" });

    await user.type(startBalanceInput, "29.99");
    await user.click(saveBtn);

    expect(handleUpdateStartBalance).toHaveBeenCalled();
  });

  it("calls the `handleAddNewCategory` function when `Add` button is clicked", async () => {
    const user = userEvent.setup();

    const handleAddNewCategory = vi.fn();
    const router = createMemoryRouter(
      [
        { path: "/", element: <Dashboard /> },
        { path: "/transactions", element: <Spendings /> },
        { path: "/wishlist", element: <Wishlist /> },
      ],
      {
        initialEntries: ["/", "/wishlist"],
        initialIndex: 1,
      }
    );

    render(
      <WishlistContext.Provider
        value={{
          wishlistItems: FAKE_WISHLIST,
          categories: FAKE_CATEGORIES,
          idsOfSelectedItems: SELECTED_IDS,
          startingBalance: FAKE_BALANCE,
          handleAddNewCategory,
        }}
      >
        <RouterProvider router={router} />
      </WishlistContext.Provider>
    );

    const categoryInput = screen.getAllByRole("textbox", { name: "" })[2];
    const balanceInput = screen.getAllByRole("spinbutton", { name: "" })[2];
    const addBtn = screen.getAllByRole("button", { name: "Add" })[1];

    await user.type(categoryInput, "Insurance");
    await user.type(balanceInput, "329.99");
    await user.click(addBtn);

    expect(handleAddNewCategory).toHaveBeenCalled();
  });
});
