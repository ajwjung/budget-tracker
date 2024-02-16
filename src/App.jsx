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
      item: "",
      price: 0,
    },
  ]);
  const [categories, setCategories] = useState([
    {
      id: 0,
      category: "",
      balance: 0,
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

    // Update first object with real values if it's the empty placeholder object
    if (!wishlistItems[0].item && !wishlistItems[0].price) {
      const updatedItems = wishlistItems.map((item) => {
        if (item.id === 0 && !item.item && !item.price) {
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
      console.log(wishlistItems);
    } else {
      // Otherwise, add a new object
      setWishlistItems([
        ...wishlistItems,
        {
          id: wishlistItems.length,
          item: itemInfo.item,
          price: parseFloat(itemInfo.price),
        },
      ]);
      console.log(wishlistItems);
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
    if (!categories[0].category && !categories[0].balance) {
      const updatedCategories = categories.map((category) => {
        if (category.id === 0 && !category.category && !category.balance) {
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
          id: categories.length,
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

  function handleSelectItem(e, targetId) {
    /*
      The function takes a reference to an element in the wishlist table
      and its corresponding entry's ID and adds or removes the ID to/from
      the state array holding all selected items' IDs.
    */

    if (e.target.checked) {
      setIdsOfSelectedItems([...idsOfSelectedItems, targetId]);
    } else if (!e.target.checked) {
      const updatedIds = idsOfSelectedItems.filter((id) => {
        return id !== targetId;
      });
      setIdsOfSelectedItems([...updatedIds]);
    }
  }

  function handleSaveEditedItem(targetEntryId, inputValues) {
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
    console.log(wishlistItems);
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
      }}
    >
      <RouterProvider router={router} />
    </WishlistContext.Provider>
  );
}

export default App;
