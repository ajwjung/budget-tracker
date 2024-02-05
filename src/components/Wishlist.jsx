import Header from "./Header";
import WishlistTable from "./WishlistTable";
import BudgetTable from "./BudgetTable";
import { useState } from "react";
import WishlistForm from "./WishlistForm";
import BudgetBalanceForm from "./BudgetBalanceForm";

function Wishlist() {
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

  function handleAddNewItem() {
    /*
      The function gets data from the submitted Wishlist form
      and updates the state array holding all wishlisted items
      by either updating the original placeholder object or by
      adding a new object to the array.
    */

    const form = document.getElementById("wishlist-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Update first object with real values if it's the empty placeholder object
    if (!wishlistItems[0].item && !wishlistItems[0].price) {
      const updatedItems = wishlistItems.map((item) => {
        if (item.id === 0 && !item.item && !item.price) {
          return {
            id: item.id,
            item: data.itemName,
            price: parseFloat(data.price),
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
          id: wishlistItems.length,
          item: data.itemName,
          price: parseFloat(data.price),
        },
      ]);
    }
  }

  function handleAddNewCategory() {
    /*
      The function gets data from the submitted Budget Category form
      and updates the state array holding all categories items
      by either updating the original placeholder object or by
      adding a new object to the array.
    */

    const form = document.getElementById("budget-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Update first object with real values if it's the empty placeholder object
    if (!categories[0].category && !categories[0].balance) {
      const updatedCategories = categories.map((category) => {
        if (category.id === 0 && !category.category && !category.balance) {
          return {
            id: category.id,
            category: data.category,
            balance: parseFloat(data.budgetAmount),
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
          category: data.category,
          balance: parseFloat(data.budgetAmount),
        },
      ]);
    }
  }

  function handleUpdateStartBalance() {
    /*
      The function gets data from the submitted Budget Starting Balance form
      and updates the state storing the starting budget.
    */

    const form = document.getElementById("budget-balance-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setStartingBalance(parseFloat(data.currentBalance));
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

  function calculateSelectedTotal() {
    /*
      The function calculates the total price for all selected wishlist items
      and returns that value rounded to two decimal places.
    */

    const selectedItemPrices = idsOfSelectedItems.map(
      (id) => wishlistItems[id].price
    );

    return selectedItemPrices
      .reduce((total, currentPrice) => total + currentPrice, 0)
      .toFixed(2);
  }

  function calculateTotal(calculateFor) {
    /*
      The function takes a string value indicating whether to calculate
      the total price for all wishlist items or all budget categories
      and returns that total rounded to two decimal places.
    */

    let total;

    if (calculateFor === "wishlist") {
      const prices = wishlistItems.map((item) => item.price);
      total = prices
        .reduce((total, currentPrice) => total + currentPrice)
        .toFixed(2);
    } else if (calculateFor === "budget") {
      const selectedTotal = calculateSelectedTotal();
      const balances = categories.map((category) => category.balance);
      const sumOfBalances = balances
        .reduce((total, currentBalance) => total + currentBalance)
        .toFixed(2);
      total =
        startingBalance -
        (parseFloat(selectedTotal) + parseFloat(sumOfBalances));
    }

    return total;
  }

  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <h2>Wishlist Tracker</h2>
          <WishlistTable
            wishlistItems={wishlistItems}
            calculateTotal={calculateTotal}
            handleSelectItem={handleSelectItem}
            calculateSelectedTotal={calculateSelectedTotal}
          />
          <WishlistForm
            headerText="wishlist item"
            handleAddNewItem={handleAddNewItem}
            handleAddNewCategory={handleAddNewCategory}
          />
        </div>
        <div className="container my-5">
          <h2>Outstanding Payments</h2>
          <BudgetTable
            categories={categories}
            startingBalance={startingBalance}
            calculateTotal={calculateTotal}
            calculateSelectedTotal={calculateSelectedTotal}
          />
          <BudgetBalanceForm
            handleUpdateStartBalance={handleUpdateStartBalance}
          />
          <WishlistForm
            headerText="category"
            handleAddNewItem={handleAddNewItem}
            handleAddNewCategory={handleAddNewCategory}
          />
        </div>
      </main>
    </>
  );
}

export default Wishlist;
