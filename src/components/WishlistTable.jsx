import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { WishlistContext } from "../App";

function WishlistTable({ calculateTotal, calculateSelectedTotal }) {
  const {
    wishlistItems,
    idsOfSelectedItems,
    handleSelectItem,
    handleSaveEditedItem,
    handleDeleteItem,
  } = useContext(WishlistContext);
  const [isEdit, setIsEdit] = useState(false);
  const [itemInput, setItemInput] = useState({
    item: "",
    price: "",
  });
  let idOfEditedItem;

  function handleInputChange(field, value) {
    if (field === "item") {
      setItemInput({
        ...itemInput,
        item: value,
      });
    } else if (field === "price") {
      setItemInput({
        ...itemInput,
        price: parseFloat(value),
      });
    }
  }

  function getInputValues(e) {
    /*
      The function takes the target button node and uses its parent
      "tr" node to get the item name and item price cells' values.
      This alternative is used because states are asynchronous
      and we cannot use the updated object immediately.
    */

    const itemNameCell = e.target.closest("tr").children.item(1);
    const itemPriceCell = itemNameCell.nextElementSibling;

    const itemName = itemNameCell.textContent;
    const priceValue = parseFloat(itemPriceCell.textContent.split("$")[1]);

    return { itemName, priceValue };
  }

  function handleEditRow(e, targetEntryId) {
    /*
      The function takes the target button node and uses its parent
      "tr" node to:
        1) Replace the "Item" and "Price" cells with input fields on edit, or
        2) Replace the "Item" and "Price" inputs with updated text on save
           
      The cells' original values are fed back into the input fields
      for quick editing.
    */

    if (!isEdit) {
      // In edit mode => change text to inputs
      const itemNameCell = e.target.closest("tr").children.item(1);
      const itemName = itemNameCell.textContent;
      const itemPriceCell = itemNameCell.nextElementSibling;
      const priceValue = parseFloat(itemPriceCell.textContent.split("$")[1]);

      const itemNameInput = document.createElement("input");
      itemNameInput.setAttribute("type", "textbox");
      itemNameInput.classList.add("form-control");
      itemNameInput.value = itemName;
      itemNameInput.addEventListener("change", (e) => {
        handleInputChange("item", e.target.value);
      });

      const itemPriceInput = document.createElement("input");
      itemPriceInput.setAttribute("type", "number");
      itemPriceInput.classList.add("form-control");
      itemPriceInput.setAttribute("step", "0.01");
      itemPriceInput.setAttribute("min", "0.01");
      itemPriceInput.value = priceValue;
      itemPriceInput.addEventListener("change", (e) => {
        handleInputChange("price", e.target.value);
      });

      itemNameCell.innerHTML = "";
      itemNameCell.appendChild(itemNameInput);

      itemPriceCell.innerHTML = "";
      itemPriceCell.appendChild(itemPriceInput);
    } else {
      // In save mode => change inputs to text
      const itemNameCell = e.target.closest("tr").children.item(1);
      const itemNameValue = itemNameCell.firstChild.value;
      const itemPriceCell = itemNameCell.nextElementSibling;
      const priceValue = itemPriceCell.firstChild.value;

      itemNameCell.removeChild(itemNameCell.firstChild);
      itemNameCell.textContent = itemNameValue;

      itemPriceCell.removeChild(itemPriceCell.firstChild);
      itemPriceCell.textContent = `$${priceValue}`;

      handleSaveEditedItem(targetEntryId, getInputValues(e));
    }

    setIsEdit(!isEdit);
  }

  function updateButtonText(e, targetEntryId) {
    /*
      The function takes the button node and updates its text content
      to "Save" when the current wishlist item is marked as being edited
      or to "Edit" in other scenarios.
    */
    if (!isEdit && targetEntryId === idOfEditedItem) {
      e.target.textContent = "Save";
    } else {
      e.target.textContent = "Edit";
    }
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Select</th>
          <th>Item</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {wishlistItems.map((item) => {
          return (
            <tr key={`wl${item.id}`} className={`item${item.id}`}>
              <td>
                {idsOfSelectedItems.includes(item.id) ? (
                  <input
                    checked={true}
                    onChange={(e) => {
                      handleSelectItem(e.target, item.id);
                    }}
                    type="checkbox"
                    name="selectedItem"
                    id="selected-item"
                    className="form-check-input"
                  />
                ) : (
                  <input
                    checked={false}
                    onChange={(e) => {
                      handleSelectItem(e.target, item.id);
                    }}
                    type="checkbox"
                    name="selectedItem"
                    id="selected-item"
                    className="form-check-input"
                  />
                )}
              </td>
              <td>{item.item}</td>
              <td>{`$${item.price}`}</td>
              <td>
                <button
                  onClick={(e) => {
                    const targetClass = e.target.closest("tr").className;
                    const targetEntryId = targetClass.split("item")[1];
                    idOfEditedItem = targetEntryId;
                    handleEditRow(e, targetEntryId);
                    updateButtonText(e, targetEntryId);
                  }}
                  type="button"
                  className="btn btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    const targetClass = e.target.closest("tr").className;
                    const targetEntryId = parseInt(
                      targetClass.split("item")[1]
                    );
                    handleDeleteItem(targetEntryId);
                  }}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2} className="text-center">
            Total
          </th>
          <td className="fw-bold">{`$${calculateTotal("wishlist")}`}</td>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2} className="text-center">
            Total (selected)
          </th>
          <td className="fw-bold">{`$${calculateSelectedTotal()}`}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

WishlistTable.propTypes = {
  calculateTotal: PropTypes.func,
  calculateSelectedTotal: PropTypes.func,
};

export default WishlistTable;
