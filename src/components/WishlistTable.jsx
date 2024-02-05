import PropTypes from "prop-types";

function WishlistTable({
  wishlistItems,
  handleSelectItem,
  calculateTotal,
  calculateSelectedTotal,
}) {
  const placeholderRow = (
    <tr>
      <td>
        <input
          onClick={(e) => {
            handleSelectItem(e, 0);
          }}
          type="checkbox"
          name="selectedItem"
          id="selected-item"
          className="form-check-input"
        />
      </td>
      <td>Sample Item</td>
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
  );

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
        {wishlistItems[0].item
          ? wishlistItems.map((item) => {
              return (
                <tr key={`wl${item.id}`}>
                  <td>
                    <input
                      onClick={(e) => {
                        handleSelectItem(e, item.id);
                      }}
                      type="checkbox"
                      name="selectedItem"
                      id="selected-item"
                      className="form-check-input"
                    />
                  </td>
                  <td>{item.item}</td>
                  <td>{`$${item.price}`}</td>
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
          : placeholderRow}
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
  wishlistItems: PropTypes.array,
  calculateTotal: PropTypes.func,
  handleSelectItem: PropTypes.func,
};

export default WishlistTable;
