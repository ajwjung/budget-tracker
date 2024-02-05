import PropTypes from "prop-types";

function BudgetTable({
  categories,
  startingBalance,
  calculateTotal,
  calculateSelectedTotal,
}) {
  function formatRemainingBalance() {
    /*
      The function reformats the remaining balance, if negative,
      from `$-20.00` to `-$20.00`.
    */

    const remainingBalance = calculateTotal("budget").toFixed(2);

    return remainingBalance < 0
      ? `-$${remainingBalance.slice(2)}`
      : `$${remainingBalance}`;
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
          <td>Current Balance</td>
          <td>{`$${startingBalance}`}</td>
          <td>
            <button type="button" className="btn btn-warning">
              Edit
            </button>
            <button type="button" className="btn btn-danger">
              Delete
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
  categories: PropTypes.arrayOf(PropTypes.object),
  startingBalance: PropTypes.number,
  calculateTotal: PropTypes.func,
  calculateSelectedTotal: PropTypes.func,
};

export default BudgetTable;
