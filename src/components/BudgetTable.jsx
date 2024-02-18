import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { WishlistContext } from "../App";

function BudgetTable({ calculateTotal, calculateSelectedTotal }) {
  const { categories, startingBalance, handleUpdateStartBalance } =
    useContext(WishlistContext);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedStartBalance, setUpdatedStartBalance] = useState(0);

  function formatRemainingBalance() {
    /*
      The function reformats the remaining balance, if negative,
      from `$-20.00` to `-$20.00`.
    */

    const remainingBalance = calculateTotal("budget").toFixed(2);

    return remainingBalance < 0
      ? `-$${remainingBalance.slice(1)}`
      : `$${remainingBalance}`;
  }

  function handleEditBalance(e) {
    /*
      The function takes a button node to access its parent "tr" element
      and target the Current Balance amount cell for editing. An input field
      is displayed on edit and the updated value is displayed on save.
    */
    if (!isEdit) {
      const balanceCell = e.target.closest("tr").children[1];
      const currentAmount = parseFloat(balanceCell.textContent.split("$")[1]);

      const balanceInput = document.createElement("input");
      balanceInput.setAttribute("type", "number");
      balanceInput.classList.add("form-control");
      balanceInput.setAttribute("min", "0.01");
      balanceInput.setAttribute("step", "0.01");
      balanceInput.value = currentAmount;
      balanceInput.addEventListener("change", (e) => {
        setUpdatedStartBalance(parseFloat(e.target.value));
      });

      balanceCell.innerHTML = "";
      balanceCell.appendChild(balanceInput);
    } else {
      const balanceCell = e.target.closest("tr").children[1];
      const balanceAmount = balanceCell.firstChild.value;

      balanceCell.removeChild(balanceCell.firstChild);
      balanceCell.textContent = `$${balanceAmount}`;

      handleUpdateStartBalance(balanceAmount);
    }

    setIsEdit(!isEdit);
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Category</th>
          <th>Balance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Current Balance*</td>
          <td>{`$${startingBalance}`}</td>
          <td>
            <button
              onClick={(e) => {
                handleEditBalance(e);
              }}
              type="button"
              className="btn btn-warning"
            >
              {!isEdit ? "Edit" : "Save"}
            </button>
          </td>
        </tr>
        {categories[0].category ? (
          categories.map((category) => {
            return (
              <tr key={`b${category.id}`}>
                <td>{category.category}</td>
                <td>{`$${category.balance}`}</td>
                <td>
                  <button type="button" className="btn btn-warning">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>Sample Category</td>
            <td>$0</td>
            <td>
              <button type="button" className="btn btn-warning">
                Edit
              </button>
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        )}
        <tr>
          <td>Wishlist Expenses*</td>
          <td>{`$${calculateSelectedTotal()}`}</td>
          <td></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Remaining Balance</th>
          <td className="fw-bold" colSpan={2}>
            {categories ? formatRemainingBalance() : "-"}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

BudgetTable.propTypes = {
  calculateTotal: PropTypes.func,
  calculateSelectedTotal: PropTypes.func,
};

export default BudgetTable;
