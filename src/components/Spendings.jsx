import Header from "./Header";

function Spendings() {
  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <h2>Enter Your Spendings</h2>
          <form id="spendings-form">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="date"
                name="transactionDate"
                id="transaction-date"
                required
              />
              <label htmlFor="transaction-date">Transaction Date</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="transactionCategory"
                id="transaction-category"
                defaultValue="Select an option"
                required
              >
                <option value="Select an option" disabled>
                  Select an option
                </option>
                <option value="Bills/Utilities">Bills/Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food/Drinks">Food/Drinks</option>
                <option value="Housing">Housing</option>
                <option value="Medical/Healthcare">Medical/Healthcare</option>
                <option value="Shopping">Shopping</option>
              </select>
              <label htmlFor="transaction-category">Transaction Type</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                name="transactionDescription"
                id="transaction-description"
                required
              />
              <label htmlFor="transaction-description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="number"
                min="0.01"
                step="0.01"
                name="transactionAmount"
                id="transaction-amount"
                required
              />
              <label htmlFor="transaction-amount">Amount ($)</label>
            </div>
            <button className="btn btn-primary" type="button">
              Save
            </button>
          </form>
        </div>
        <div className="container">
          <h2>Enter Your Deposits</h2>
          <form id="deposits-form">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="date"
                name="depositDate"
                id="deposit-date"
                required
              />
              <label htmlFor="deposit-date">Deposit Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                name="depositDescription"
                id="deposit-description"
                required
              />
              <label htmlFor="deposit-description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="number"
                name="incomeAmount"
                id="income-amount"
              />
              <label htmlFor="income-amount">Amount ($)</label>
            </div>
            <button className="btn btn-primary" type="button">
              Save
            </button>
          </form>
        </div>
        <div className="container my-5">
          <h2>Past Transactions</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/24/2024</td>
                <td>Food/Drinks</td>
                <td>Thai</td>
                <td>-48.27</td>
                <td>
                  <button className="btn btn-warning" type="button">
                    Edit
                  </button>
                  <button className="btn btn-danger" type="button">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>01/21/2024</td>
                <td>Entertainment</td>
                <td>Movies</td>
                <td>-12.99</td>
                <td>
                  <button className="btn btn-warning" type="button">
                    Edit
                  </button>
                  <button className="btn btn-danger" type="button">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>01/16/2024</td>
                <td>Shopping</td>
                <td>T-Shirt</td>
                <td>-20.83</td>
                <td>
                  <button className="btn btn-warning" type="button">
                    Edit
                  </button>
                  <button className="btn btn-danger" type="button">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default Spendings;
