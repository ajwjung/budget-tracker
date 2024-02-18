import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Spendings from "./components/Spendings.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { useState, createContext } from "react";

export const WishlistContext = createContext({
  wishlistItems: [],
  categories: [],
  startingBalance: 0,
  idsOfSelectedItems: [],
  handleAddNewItem: () => {},
  handleAddNewCategory: () => {},
  handleUpdateStartBalance: () => {},
  handleSelectItem: () => {},
  handleSaveEditedItem: () => {},
  handleDeleteItem: () => {},
  handleSaveEditedCategory: () => {},
  handleDeleteCategory: () => {},
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
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 0,
      item: "SAMPLE",
      price: 999,
    },
  ]);
  const [categories, setCategories] = useState([
    {
      id: 0,
      category: "SAMPLE",
      balance: 999,
    },
  ]);
  const [startingBalance, setStartingBalance] = useState(0);
  const [idsOfSelectedItems, setIdsOfSelectedItems] = useState([]);

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
      wishlistItems[0].price === 999
    ) {
      const updatedItems = wishlistItems.map((item) => {
        if (item.id === 0) {
          return {
            id: item.id,
            item: itemInfo.item,
            price: parseFloat(itemInfo.price),
          };
        } else {
          return item;
        }
      });

      setWishlistItems(updatedItems);
    } else {
      // Otherwise, add a new object
      setWishlistItems([
        ...wishlistItems,
        {
          id: wishlistItems[wishlistItems.length - 1]
            ? wishlistItems[wishlistItems.length - 1].id + 1
            : wishlistItems.length + 1,
          item: itemInfo.item,
          price: parseFloat(itemInfo.price),
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

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        categories,
        startingBalance,
        idsOfSelectedItems,
        handleAddNewItem,
        handleAddNewCategory,
        handleUpdateStartBalance,
        handleSelectItem,
        handleSaveEditedItem,
        handleDeleteItem,
        handleSaveEditedCategory,
        handleDeleteCategory,
      }}
    >
      <RouterProvider router={router} />
    </WishlistContext.Provider>
  );
}

export default App;
