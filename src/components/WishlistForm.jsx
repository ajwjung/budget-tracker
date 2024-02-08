import PropTypes from "prop-types";
import { useContext } from "react";
import { WishlistContext } from "../App";

function WishlistForm({ headerText }) {
  const { handleAddNewItem, handleAddNewCategory } =
    useContext(WishlistContext);

  let formDetails = {};

  if (headerText === "wishlist item") {
    formDetails["formId"] = "wishlist-form";
    formDetails["itemLabelFor"] = "item-name";
    formDetails["itemLabelText"] = "Item";
    formDetails["itemInputName"] = "itemName";
    formDetails["itemInputId"] = "item-name";
    formDetails["priceLabelFor"] = "price";
    formDetails["priceInputName"] = "price";
    formDetails["priceInputId"] = "price";
  } else if (headerText === "category") {
    formDetails["formId"] = "budget-form";
    formDetails["itemLabelFor"] = "category";
    formDetails["itemLabelText"] = "Category";
    formDetails["itemInputName"] = "category";
    formDetails["itemInputId"] = "category";
    formDetails["priceLabelFor"] = "budget-amount";
    formDetails["priceInputName"] = "budgetAmount";
    formDetails["priceInputId"] = "budget-amount";
  }

  function handleOnSubmit() {
    headerText === "wishlist item"
      ? handleAddNewItem()
      : handleAddNewCategory();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
        e.target.reset();
      }}
      className="my-2"
      id={formDetails.formId}
    >
      <h3 className="fs-4">Add a new {headerText}:</h3>
      <div className="input-group mb-3">
        <label htmlFor={formDetails.itemLabelFor} className="input-group-text">
          {formDetails.itemLabelText}
        </label>
        <input
          type="text"
          name={formDetails.itemInputName}
          id={formDetails.itemInputId}
          className="form-control"
          required={true}
        />
        <label htmlFor={formDetails.priceLabelFor} className="input-group-text">
          $
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          name={formDetails.priceInputName}
          id={formDetails.priceInputId}
          className="form-control"
          required={true}
        />
        <button type="submit" className="btn btn-outline-primary">
          Add
        </button>
      </div>
    </form>
  );
}

WishlistForm.propTypes = {
  headerText: PropTypes.string,
};

export default WishlistForm;
