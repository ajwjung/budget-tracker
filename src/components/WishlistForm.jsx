import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { WishlistContext } from "../App";

function WishlistForm({ headerText }) {
  const { handleAddNewItem, handleAddNewCategory } =
    useContext(WishlistContext);

  const [itemInfo, setItemInfo] = useState({
    item: "",
    price: "",
    link: "",
  });
  const [categoryInfo, setCategoryInfo] = useState({
    category: "",
    balance: "",
  });
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
    formDetails["linkLabelFor"] = "item-link";
    formDetails["linkLabelText"] = "Link to Item";
    formDetails["linkInputName"] = "itemLink";
    formDetails["linkInputId"] = "item-link";
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

  function handleItemNameChange(e) {
    setItemInfo({
      ...itemInfo,
      item: e.target.value,
    });
  }

  function handleItemPriceChange(e) {
    setItemInfo({
      ...itemInfo,
      price: parseFloat(e.target.value),
    });
  }

  function handleItemLinkChange(e) {
    setItemInfo({
      ...itemInfo,
      link: e.target.value,
    });
  }

  function handleCategoryChange(e) {
    setCategoryInfo({
      ...categoryInfo,
      category: e.target.value,
    });
  }

  function handleBalanceChange(e) {
    setCategoryInfo({
      ...categoryInfo,
      balance: parseFloat(e.target.value),
    });
  }

  function handleOnSubmit() {
    headerText === "wishlist item"
      ? handleAddNewItem(itemInfo)
      : handleAddNewCategory(categoryInfo);
    setItemInfo({
      item: "",
      price: "",
      link: "",
    });
    setCategoryInfo({
      category: "",
      balance: "",
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
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
          value={
            headerText === "wishlist item"
              ? itemInfo.item
              : categoryInfo.category
          }
          onChange={(e) => {
            headerText === "wishlist item"
              ? handleItemNameChange(e)
              : handleCategoryChange(e);
          }}
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
          value={
            headerText === "wishlist item"
              ? itemInfo.price
              : categoryInfo.balance
          }
          onChange={(e) => {
            headerText === "wishlist item"
              ? handleItemPriceChange(e)
              : handleBalanceChange(e);
          }}
          required={true}
        />
        {headerText === "wishlist item" && (
          <>
            <label
              htmlFor={formDetails.linkLabelFor}
              className="input-group-text"
            >
              {formDetails.linkLabelText}
            </label>
            <input
              type="url"
              name={formDetails.linkInputName}
              id={formDetails.linkInputId}
              className="form-control"
              value={itemInfo.link}
              onChange={(e) => {
                handleItemLinkChange(e);
              }}
            />
          </>
        )}
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
