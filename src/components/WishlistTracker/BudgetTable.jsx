import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { WishlistContext } from "../../App";
import { Button, Table } from "react-bootstrap";

function BudgetTable({ calculateTotal, calculateSelectedTotal }) {
  const {
    categories,
    startingBalance,
    handleUpdateStartBalance,
    handleSaveEditedCategory,
    handleDeleteCategory,
  } = useContext(WishlistContext);
  const [isEditBalance, setIsEditBalance] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState({
    status: false,
    entryId: null,
  });
  const [updatedStartBalance, setUpdatedStartBalance] = useState(0);
  const [categoryInput, setCategoryInput] = useState({
    category: "",
    balance: "",
  });

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
    if (!isEditBalance) {
      const balanceCell = e.target.closest("tr").children[1];
      const currentAmount = parseFloat(balanceCell.textContent);

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
      balanceCell.textContent = balanceAmount;

      handleUpdateStartBalance(balanceAmount);
    }

    setIsEditBalance(!isEditBalance);
  }

  function handleInputChange(field, value) {
    if (field === "category") {
      setCategoryInput({
        ...categoryInput,
        category: value,
      });
    } else if (field === "balance") {
      setCategoryInput({
        ...categoryInput,
        balance: parseFloat(value),
      });
    }
  }

  function getInputValues(e) {
    /*
      The function takes the target button node and uses its parent
      "tr" node to get the category name and balance cells' values.
      This alternative is used because states are asynchronous
      and we cannot use the updated object immediately.
    */

    const categoryCell = e.target.closest("tr").children[0];
    const balanceCell = categoryCell.nextElementSibling;

    const categoryName = categoryCell.textContent;
    const balanceAmount = parseFloat(balanceCell.textContent);

    return { categoryName, balanceAmount };
  }

  function handleEditCategory(e, targetEntryId) {
    /*
      The function takes the target button node to target the parent
      `tr` node and access the `td` cells whose values need to be updated.
      Only one entry may be edited at a time to prevent broken entry updates.

      On edit, the text content is replaced with input fields and on save,
      the input fields are replaced with updated text values. The cells'
      original values are fed back into the input fields for quick editing.
    */
    if (!isEditCategory.status && isEditCategory.entryId === null) {
      const categoryCell = e.target.closest("tr").children[0];
      const categoryName = categoryCell.textContent;
      const balanceCell = categoryCell.nextSibling;
      const balanceAmount = Math.abs(parseFloat(balanceCell.textContent));

      const categoryInput = document.createElement("input");
      categoryInput.setAttribute("type", "textbox");
      categoryInput.classList.add("form-control");
      categoryInput.value = categoryName;
      categoryInput.addEventListener("click", (e) => {
        handleInputChange("category", e.target.value);
      });

      const balanceInput = document.createElement("input");
      balanceInput.setAttribute("type", "number");
      balanceInput.classList.add("form-control");
      balanceInput.setAttribute("step", "0.01");
      balanceInput.setAttribute("min", "0.01");
      balanceInput.value = balanceAmount;
      balanceInput.addEventListener("click", (e) => {
        handleInputChange("balance", e.target.value);
      });

      categoryCell.innerHTML = "";
      categoryCell.appendChild(categoryInput);
      balanceCell.innerHTML = "";
      balanceCell.appendChild(balanceInput);

      setIsEditCategory((prevState) => ({
        ...prevState,
        entryId: targetEntryId,
      }));
    } else if (
      isEditCategory.status &&
      isEditCategory.entryId === targetEntryId
    ) {
      const categoryCell = e.target.closest("tr").children[0];
      const categoryName = categoryCell.firstChild.value;
      const balanceCell = categoryCell.nextSibling;
      const balanceAmount = balanceCell.firstChild.value;

      categoryCell.removeChild(categoryCell.firstChild);
      categoryCell.textContent = categoryName;

      balanceCell.removeChild(balanceCell.firstChild);
      balanceCell.textContent = balanceAmount;

      setIsEditCategory((prevState) => ({
        ...prevState,
        entryId: null,
      }));

      handleSaveEditedCategory(targetEntryId, getInputValues(e));
    }

    setIsEditCategory((prevState) => ({
      ...prevState,
      status: !isEditCategory.status,
    }));
  }

  function updateButtonText(e, targetEntryId) {
    /*
      The function takes the button node and updates its text content
      to "Save" when the current category is marked as being edited,
      or to "Edit" in other scenarios.
    */
    if (!isEditCategory.status && isEditCategory.entryId === null) {
      e.target.textContent = "Save";
    } else if (
      isEditCategory.status &&
      isEditCategory.entryId === targetEntryId
    ) {
      e.target.textContent = "Edit";
    }
  }

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Category</th>
          <th>Balance ($)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Current Balance*</td>
          <td>{startingBalance.toFixed(2)}</td>
          <td>
            <Button
              onClick={(e) => {
                handleEditBalance(e);
              }}
              type="button"
              className="btn btn-warning"
            >
              {!isEditBalance ? "Edit" : "Save"}
            </Button>
          </td>
        </tr>
        {categories.map((category) => {
          return (
            <tr key={`b${category.id}`} className={`cat${category.id}`}>
              <td>{category.category}</td>
              <td>{`-${category.balance.toFixed(2)}`}</td>
              <td>
                <Button
                  onClick={(e) => {
                    const targetClass = e.target.closest("tr").classList[0];
                    const targetEntryId = parseInt(targetClass.split("cat")[1]);
                    handleEditCategory(e, targetEntryId);
                    updateButtonText(e, targetEntryId);
                  }}
                  type="button"
                  variant="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={(e) => {
                    const targetClass = e.target.closest("tr").classList[0];
                    const targetEntryId = parseInt(targetClass.split("cat")[1]);
                    handleDeleteCategory(targetEntryId);
                  }}
                  type="button"
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>Wishlist Expenses*</td>
          <td>
            {calculateSelectedTotal() > 0
              ? `-${calculateSelectedTotal()}`
              : calculateSelectedTotal()}
          </td>
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
    </Table>
  );
}

BudgetTable.propTypes = {
  calculateTotal: PropTypes.func,
  calculateSelectedTotal: PropTypes.func,
};

export default BudgetTable;
