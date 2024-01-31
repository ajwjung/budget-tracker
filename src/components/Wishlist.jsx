import Header from "./Header";
import WishlistTable from "./WishlistTable";
import BudgetTable from "./BudgetTable";

function Wishlist() {
  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <h2>Wishlist Tracker</h2>
          <WishlistTable />
          {/* Add table to display entered wishlist items */}
          <form id="wishlist-form">
            <h3 className="fs-4">Add a new wishlist item:</h3>
            <div className="input-group mb-3">
              <label htmlFor="item-name" className="input-group-text">
                Item
              </label>
              <input
                type="text"
                name="itemName"
                id="item-name"
                className="form-control"
                required={true}
              />
              <label htmlFor="price" className="input-group-text">
                $
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                name="price"
                id="price"
                className="form-control"
                required={true}
              />
              <button type="submit" className="btn btn-outline-primary">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="container my-5">
          <h2>My Budget</h2>
          {/* Add table to display outstanding balance for this month
              + dynamic wishlist expense based on the items selected
          */}
          <BudgetTable />
          <form id="budget-form">
            <h3 className="fs-4">Add a new category:</h3>
            <div className="input-group mb-3">
              <label htmlFor="category" className="input-group-text">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className="form-control"
                required={true}
              />
              <label htmlFor="budget-amount" className="input-group-text">
                $
              </label>
              <input
                type="number"
                name="budgetAmount"
                id="budget-amount"
                className="form-control"
                required={true}
              />
              <button type="submit" className="btn btn-outline-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Wishlist;
