import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Spendings from "./components/Spendings.jsx";
import Wishlist from "./components/WishlistTracker/Wishlist.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { useState, useEffect, createContext } from "react";

export const WishlistContext = createContext({
  wishlistItems: [],
  categories: [],
  expenseCategories: [],
  startingBalance: 0,
  idsOfSelectedItems: [],
  transactions: [],
  handleAddNewItem: () => {},
  handleAddNewCategory: () => {},
  handleUpdateStartBalance: () => {},
  handleSelectItem: () => {},
  handleSaveEditedItem: () => {},
  handleDeleteItem: () => {},
  handleSaveEditedCategory: () => {},
  handleDeleteCategory: () => {},
  handleAddTransaction: () => {},
  handleSaveEditedTransaction: () => {},
  handleDeleteTransaction: () => {},
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/transactions",
    element: <Spendings />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
]);

function App() {
  const [wishlistItems, setWishlistItems] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [
          {
            id: 0,
            item: "SAMPLE",
            price: 999,
            link: "https://www.dummylink.com/",
          },
        ]
  );
  const [categories, setCategories] = useState(
    localStorage.getItem("categories")
      ? JSON.parse(localStorage.getItem("categories"))
      : [
          {
            id: 0,
            category: "SAMPLE",
            balance: 999,
          },
        ]
  );
  const expenseCategories = [
    "Bills/Utilities",
    "Entertainment",
    "Food/Drinks",
    "Housing",
    "Medical/Healthcare",
    "Shopping",
    "Other",
  ];
  const [startingBalance, setStartingBalance] = useState(
    localStorage.getItem("startingBalance")
      ? JSON.parse(localStorage.getItem("startingBalance"))
      : 0
  );
  const [idsOfSelectedItems, setIdsOfSelectedItems] = useState(
    localStorage.getItem("selectedIds")
      ? JSON.parse(localStorage.getItem("selectedIds"))
      : []
  );
  const [transactions, setTransactions] = useState(
    localStorage.getItem("transactions")
      ? JSON.parse(localStorage.getItem("transactions"))
      : [
          {
            id: 0,
            date: "2024-01-01",
            transactionCategory: "Food/Drinks",
            description: "FAKE BURGER",
            amount: -19.99,
          },
        ]
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("startingBalance", JSON.stringify(startingBalance));
  }, [startingBalance]);

  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify(idsOfSelectedItems));
  }, [idsOfSelectedItems]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  function handleAddNewItem(itemInfo) {
    /*
      The function takes an object for a new item and price
      and updates the state array holding all wishlisted items
      by either updating the original placeholder object or by
      adding a new object to the array.
    */

    // Update first object with real values if it's the placeholder object
    if (
      wishlistItems[0] &&
      wishlistItems[0].item === "SAMPLE" &&
      wishlistItems[0].price === 999 &&
      wishlistItems[0].link === "https://www.dummylink.com/"
    ) {
      const updatedItems = wishlistItems.map((item) => {
        if (item.id === 0) {
          const url =
            itemInfo.link.startsWith("https://") ||
            itemInfo.link.startsWith("http://")
              ? itemInfo.link
              : `https://${itemInfo.link}`;

          return {
            id: item.id,
            item: itemInfo.item,
            price: parseFloat(itemInfo.price),
            link: url,
          };
        } else {
          return item;
        }
      });

      setWishlistItems(updatedItems);
    } else {
      // Otherwise, add a new object
      const url =
        itemInfo.link.startsWith("https://") ||
        itemInfo.link.startsWith("http://")
          ? itemInfo.link
          : `https://${itemInfo.link}`;

      setWishlistItems([
        ...wishlistItems,
        {
          id: wishlistItems[wishlistItems.length - 1]
            ? wishlistItems[wishlistItems.length - 1].id + 1
            : wishlistItems.length + 1,
          item: itemInfo.item,
          price: parseFloat(itemInfo.price),
          link: url,
        },
      ]);
    }
  }

  function handleAddNewCategory(categoryInfo) {
    /*
      The function takes an object for a new category and balance
      and updates the state array holding all categories items
      by either updating the original placeholder object or by
      adding a new object to the array.
    */

    // Update first object with real values if it's the empty placeholder object
    if (
      categories[0] &&
      categories[0].item === "SAMPLE" &&
      categories[0].price === 999
    ) {
      const updatedCategories = categories.map((category) => {
        if (category.id === 0) {
          return {
            id: category.id,
            category: categoryInfo.category,
            balance: parseFloat(categoryInfo.balance),
          };
        } else {
          return category;
        }
      });

      setCategories(updatedCategories);
    } else {
      // Otherwise, add a new object
      setCategories([
        ...categories,
        {
          id: categories[categories.length - 1]
            ? categories[categories.length - 1].id + 1
            : categories.length + 1,
          category: categoryInfo.category,
          balance: parseFloat(categoryInfo.balance),
        },
      ]);
    }
  }

  function handleUpdateStartBalance(inputBalance) {
    /*
      The function takes an input value and updates the state 
      storing the starting budget (float value).
    */
    setStartingBalance(parseFloat(inputBalance));
  }

  function handleSelectItem(selectBox, targetId) {
    /*
      The function takes a reference to an element in the wishlist table
      and its corresponding entry's ID and adds or removes the ID to/from
      the state array holding all selected items' IDs.
    */

    if (selectBox.checked) {
      setIdsOfSelectedItems([...idsOfSelectedItems, targetId]);
    } else if (!selectBox.checked) {
      const updatedIds = idsOfSelectedItems.filter((id) => {
        return id !== targetId;
      });
      setIdsOfSelectedItems([...updatedIds]);
    }
  }

  function handleSaveEditedItem(targetEntryId, inputValues) {
    /*
      The function takes a target entry's ID and new input values
      and updates the original entry.
    */

    const updatedItems = wishlistItems.map((item) => {
      if (item.id === parseInt(targetEntryId)) {
        return {
          ...item,
          item: inputValues.itemName,
          price: parseFloat(inputValues.priceValue),
          link: inputValues.itemLink,
        };
      } else {
        return item;
      }
    });

    setWishlistItems([...updatedItems]);
  }

  function handleDeleteItem(targetEntryId) {
    /*
      The function takes a target entry's ID and deletes the entry
      while also removing its ID from the selected IDs array in case
      the entry was still selected at the time of deletion.
    */

    const updatedItems = wishlistItems.filter((item) => {
      return item.id !== parseInt(targetEntryId);
    });

    setWishlistItems([...updatedItems]);

    const updatedSelectedIds = idsOfSelectedItems.filter((id) => {
      return id !== parseInt(targetEntryId);
    });

    setIdsOfSelectedItems([...updatedSelectedIds]);
  }

  function handleSaveEditedCategory(targetEntryId, inputValues) {
    /*
      The function takes a target entry's ID and new input values
      and updates the original entry.
    */
    const updatedCategories = categories.map((category) => {
      if (category.id === parseInt(targetEntryId)) {
        return {
          ...category,
          category: inputValues.categoryName,
          balance: parseFloat(inputValues.balanceAmount),
        };
      } else {
        return category;
      }
    });

    setCategories([...updatedCategories]);
  }

  function handleDeleteCategory(targetEntryId) {
    // The function takes a target entry's ID and deletes the entry.

    const updatedCategories = categories.filter((category) => {
      return category.id !== parseInt(targetEntryId);
    });

    setCategories([...updatedCategories]);
  }

  function handleAddTransaction(transactionType, transactionInfo) {
    /*
      The function takes an object for a new transaction
      and updates the state array holding all transactions
      by either updating the original placeholder object or by
      adding a new object to the array.
      
      Deposits are treated as positive amounts and expenses
      are treated as negative amounts.
    */

    // Update first object with real values if it's the placeholder object
    if (
      transactions[0] &&
      transactions[0].transactionCategory === "Food/Drinks" &&
      transactions[0].description === "FAKE BURGER" &&
      transactions[0].amount === -19.99
    ) {
      const updatedTransactions = transactions.map((transaction) => {
        if (transaction.id === 0) {
          return {
            id: transaction.id,
            date: transactionInfo.date,
            transactionCategory: transactionInfo.transactionCategory,
            description: transactionInfo.description,
            amount:
              transactionType === "transaction"
                ? parseFloat(`-${transactionInfo.amount}`).toFixed(2)
                : parseFloat(transactionInfo.amount).toFixed(2),
          };
        }
      });

      setTransactions(updatedTransactions);
    } else {
      // Otherwise add a new object
      setTransactions([
        ...transactions,
        {
          id: transactions[transactions.length - 1]
            ? transactions[transactions.length - 1].id + 1
            : transactions.length + 1,
          date: transactionInfo.date,
          transactionCategory: transactionInfo.transactionCategory,
          description: transactionInfo.description,
          amount:
            transactionType === "transaction"
              ? parseFloat(`-${transactionInfo.amount}`).toFixed(2)
              : parseFloat(transactionInfo.amount).toFixed(2),
        },
      ]);
    }
  }

  function handleSaveEditedTransaction(targetEntryId, inputValues) {
    /*
      The function takes a target entry's ID and new input values
      and updates the original entry.
    */
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === parseInt(targetEntryId)) {
        return {
          ...transaction,
          date: inputValues.transactionDate,
          transactionCategory: inputValues.transactionType,
          description: inputValues.transactionDescription,
          amount: parseFloat(inputValues.transactionAmount),
        };
      } else {
        return transaction;
      }
    });

    setTransactions([...updatedTransactions]);
  }

  function handleDeleteTransaction(targetEntryId) {
    // The function takes a target entry's ID and deletes the entry.
    const updatedTransactions = transactions.filter((transaction) => {
      return transaction.id !== parseInt(targetEntryId);
    });

    setTransactions([...updatedTransactions]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        categories,
        expenseCategories,
        startingBalance,
        idsOfSelectedItems,
        transactions,
        handleAddNewItem,
        handleAddNewCategory,
        handleUpdateStartBalance,
        handleSelectItem,
        handleSaveEditedItem,
        handleDeleteItem,
        handleSaveEditedCategory,
        handleDeleteCategory,
        handleAddTransaction,
        handleSaveEditedTransaction,
        handleDeleteTransaction,
      }}
    >
      <RouterProvider router={router} />
    </WishlistContext.Provider>
  );
}

export default App;
