import PropTypes from "prop-types";
import { useContext } from "react";
import { WishlistContext } from "../App";

function WishlistTable({ calculateTotal, calculateSelectedTotal }) {
  const { wishlistItems, idsOfSelectedItems, handleSelectItem } =
    useContext(WishlistContext);

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
                    {idsOfSelectedItems.includes(item.id) ? (
                      <input
                        checked={true}
                        onChange={(e) => {
                          handleSelectItem(e, item.id);
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
                          handleSelectItem(e, item.id);
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
  calculateTotal: PropTypes.func,
  calculateSelectedTotal: PropTypes.func,
};

export default WishlistTable;
