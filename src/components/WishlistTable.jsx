function WishlistTable() {
  return (
    // Change table to dynamically create rows once we save data
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
        <tr>
          <td>
            <input
              type="checkbox"
              name="selectedItem"
              id="selected-item"
              className="form-check-input"
            />
          </td>
          <td>Fake Doll</td>
          <td>$30.82</td>
          <td>
            <button type="button" className="btn btn-warning">
              Edit
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="checkbox"
              name="selectedItem"
              id="selected-item"
              className="form-check-input"
            />
          </td>
          <td>Real Doll</td>
          <td>$43.27</td>
          <td>
            <button type="button" className="btn btn-warning">
              Edit
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2} className="text-center">
            Total (selected)
          </th>
          <td className="fw-bold">$29.83</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default WishlistTable;
