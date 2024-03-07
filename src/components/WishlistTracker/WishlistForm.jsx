import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { WishlistContext } from "../../App";
import { Accordion, Col, Row, Button, Form, InputGroup } from "react-bootstrap";

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
    formDetails["linkLabelText"] = "Link to Product (URL)";
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
    <Accordion className="my-3">
      <Accordion.Item>
        <Accordion.Header as="h3">Add a new {headerText}:</Accordion.Header>
        <Accordion.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
            id={formDetails.formId}
          >
            <Row>
              <Col>
                <Form.Label htmlFor={formDetails.itemLabelFor}>
                  {formDetails.itemLabelText}
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    name={formDetails.itemInputName}
                    id={formDetails.itemInputId}
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
                </InputGroup>
              </Col>
              <Col>
                <Form.Label htmlFor={formDetails.priceLabelFor}>
                  Price
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="0.01"
                    step="0.01"
                    name={formDetails.priceInputName}
                    id={formDetails.priceInputId}
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
                </InputGroup>
              </Col>
            </Row>
            {headerText === "category" && (
              <Button type="submit" variant="outline-primary">
                Add Category
              </Button>
            )}
            {/* Only create "Link to Item" input field for wishlist form */}
            {headerText === "wishlist item" && (
              <>
                <Row>
                  <Form.Label htmlFor={formDetails.linkLabelFor}>
                    {formDetails.linkLabelText}
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>https://</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name={formDetails.linkInputName}
                      id={formDetails.linkInputId}
                      value={itemInfo.link}
                      onChange={(e) => {
                        handleItemLinkChange(e);
                      }}
                    />
                  </InputGroup>
                </Row>
                <Row>
                  <InputGroup>
                    <Button type="submit" variant="outline-primary">
                      Add Item
                    </Button>
                  </InputGroup>
                </Row>
              </>
            )}
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

WishlistForm.propTypes = {
  headerText: PropTypes.string,
};

export default WishlistForm;
