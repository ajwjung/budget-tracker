import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { WishlistContext } from "../../App";
import { Button, Form, InputGroup } from "react-bootstrap";

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
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}
      className="my-2"
      id={formDetails.formId}
    >
      <h3 className="fs-4">Add a new {headerText}:</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text id={formDetails.itemLabelFor}>
          {formDetails.itemLabelText}
        </InputGroup.Text>
        <Form.Control
          type="text"
          name={formDetails.itemInputName}
          aria-describedby={formDetails.itemInputId}
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
        <InputGroup.Text id={formDetails.priceLabelFor}>$</InputGroup.Text>
        <Form.Control
          type="number"
          min="0.01"
          step="0.01"
          name={formDetails.priceInputName}
          aria-describedby={formDetails.priceInputId}
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
        {/* Only create "Link to Item" input field for wishlist form */}
        {headerText === "wishlist item" && (
          <>
            <InputGroup.Text
              id={formDetails.linkLabelFor}
              className="input-group-text"
            >
              {formDetails.linkLabelText}
            </InputGroup.Text>
            <Form.Control
              type="url"
              name={formDetails.linkInputName}
              aria-describedby={formDetails.linkInputId}
              value={itemInfo.link}
              onChange={(e) => {
                handleItemLinkChange(e);
              }}
            />
          </>
        )}
        <Button type="submit" variant="outline-primary">
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}

WishlistForm.propTypes = {
  headerText: PropTypes.string,
};

export default WishlistForm;
