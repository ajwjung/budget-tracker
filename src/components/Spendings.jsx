import { useState, useContext } from "react";
import Header from "./Header";
import { WishlistContext } from "../App";

function Spendings() {
  const { transactions, handleAddTransaction } = useContext(WishlistContext);
  const [transactionInput, setTransactionInput] = useState({
    date: "",
    transactionCategory: "",
    description: "",
    amount: "",
  });
  const [depositInput, setDepositInput] = useState({
    date: "",
    transactionCategory: "Deposit",
    description: "",
    amount: "",
  });

  function updateTransactionInput(field, value) {
    if (field === "date") {
      setTransactionInput({
        ...transactionInput,
        date: value,
      });
    } else if (field === "transaction category") {
      setTransactionInput({
        ...transactionInput,
        transactionCategory: value,
      });
    } else if (field === "description") {
      setTransactionInput({
        ...transactionInput,
        description: value,
      });
    } else if (field === "amount") {
      setTransactionInput({
        ...transactionInput,
        amount: parseFloat(value),
      });
    }
  }

  function updateDepositInput(field, value) {
    if (field === "date") {
      setDepositInput({
        ...depositInput,
        date: value,
      });
    } else if (field === "description") {
      setDepositInput({
        ...depositInput,
        description: value,
      });
    } else if (field === "amount") {
      setDepositInput({
        ...depositInput,
        amount: parseFloat(value),
      });
    }
  }

  function handleSubmit(formName, inputValues) {
    if (formName === "transactions") {
      handleAddTransaction("transaction", inputValues);
      setTransactionInput({
        date: "",
        transactionCategory: "",
        description: "",
        amount: "",
      });
    } else if (formName === "deposits") {
      handleAddTransaction("deposit", inputValues);
      setDepositInput({
        date: "",
        type: "Deposit",
        description: "",
        amount: "",
      });
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <h2>Enter Your Spendings</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("transactions", transactionInput);
            }}
            id="spendings-form"
          >
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="date"
                name="transactionDate"
                id="transaction-date"
                value={transactionInput.date}
                onChange={(e) => {
                  updateTransactionInput("date", e.target.value);
                }}
                required
              />
              <label htmlFor="transaction-date">Transaction Date</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="transactionCategory"
                id="transaction-category"
                value={transactionInput.transactionCategory}
                onChange={(e) => {
                  updateTransactionInput(
                    "transaction category",
                    e.target.value
                  );
                }}
                required
              >
                <option value="Bills/Utilities">Bills/Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food/Drinks">Food/Drinks</option>
                <option value="Housing">Housing</option>
                <option value="Medical/Healthcare">Medical/Healthcare</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="transaction-category">Transaction Type</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="text"
                name="transactionDescription"
                id="transaction-description"
                value={transactionInput.description}
                onChange={(e) => {
                  updateTransactionInput("description", e.target.value);
                }}
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
                value={transactionInput.amount}
                onChange={(e) => {
                  updateTransactionInput("amount", e.target.value);
                }}
                required
              />
              <label htmlFor="transaction-amount">Amount ($)</label>
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
        <div className="container">
          <h2>Enter Your Deposits</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("deposits", depositInput);
            }}
            id="deposits-form"
          >
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="date"
                name="depositDate"
                id="deposit-date"
                value={depositInput.date}
                onChange={(e) => {
                  updateDepositInput("date", e.target.value);
                }}
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
                value={depositInput.description}
                onChange={(e) => {
                  updateDepositInput("description", e.target.value);
                }}
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
                min="0.01"
                step="0.01"
                value={depositInput.amount}
                onChange={(e) => {
                  updateDepositInput("amount", e.target.value);
                }}
                required
              />
              <label htmlFor="income-amount">Amount ($)</label>
            </div>
            <button className="btn btn-primary" type="submit">
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
              {transactions.map((transaction) => {
                return (
                  <tr
                    key={`t${transaction.id}`}
                    className={`t${transaction.id}`}
                  >
                    <td>{transaction.date}</td>
                    <td>{transaction.transactionCategory}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <button className="btn btn-warning" type="button">
                        Edit
                      </button>
                      <button className="btn btn-danger" type="button">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default Spendings;
