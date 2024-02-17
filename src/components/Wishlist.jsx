import { useContext } from "react";
import { WishlistContext } from "../App";
import Header from "./Header";
import WishlistTable from "./WishlistTable";
import BudgetTable from "./BudgetTable";
import WishlistForm from "./WishlistForm";
import BudgetBalanceForm from "./BudgetBalanceForm";

function Wishlist() {
  const { wishlistItems, categories, idsOfSelectedItems, startingBalance } =
    useContext(WishlistContext);

  function calculateSelectedTotal() {
    /*
      The function calculates the total price for all selected wishlist items
      and returns that value rounded to two decimal places.
    */

    const selectedItemPrices = wishlistItems
      .filter((item) => {
        return idsOfSelectedItems.includes(item.id);
      })
      .map((item) => item.price);

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
        .reduce((total, currentPrice) => total + currentPrice, 0)
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
            calculateTotal={calculateTotal}
            calculateSelectedTotal={calculateSelectedTotal}
          />
          <WishlistForm headerText="wishlist item" />
        </div>
        <div className="container my-5">
          <h2>Outstanding Balances</h2>
          <BudgetTable
            calculateTotal={calculateTotal}
            calculateSelectedTotal={calculateSelectedTotal}
          />
          <BudgetBalanceForm />
          <WishlistForm headerText="category" />
        </div>
      </main>
    </>
  );
}

export default Wishlist;
