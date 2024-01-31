function BudgetTable() {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Category</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Current Balance</td>
          <td>$3895.82</td>
        </tr>
        <tr>
          <td>Insurance</td>
          <td>$425.12</td>
        </tr>
        <tr>
          <td>Credit Card 2 Payment Due</td>
          <td>$847.19</td>
        </tr>
        <tr>
          <td>Credit Card 2 Payment Due</td>
          <td>$46.83</td>
        </tr>
        <tr>
          <td>Income</td>
          <td>$347.91</td>
        </tr>
        <tr>
          <td>Wishlist Expenses*</td>
          {/* to be calculated from selected wishlist items */}
          <td>$28.94</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Remaining Balance</th>
          <td className="fw-bold">$1989.17</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default BudgetTable;
