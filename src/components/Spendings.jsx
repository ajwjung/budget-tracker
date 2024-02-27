import { useState, useContext } from "react";
import Header from "./Header";
import { WishlistContext } from "../App";
import Calculate from "../scripts/Calculate";

function Spendings() {
  const {
    transactions,
    expenseCategories,
    handleAddTransaction,
    handleSaveEditedTransaction,
    handleDeleteTransaction,
  } = useContext(WishlistContext);
  const [transactionInput, setTransactionInput] = useState({
    date: "",
    transactionCategory: "Bills/Utilities",
    description: "",
    amount: "",
  });
  const [depositInput, setDepositInput] = useState({
    date: "",
    transactionCategory: "Deposit",
    description: "",
    amount: "",
  });
  const [isEditTransaction, setIsEditTransaction] = useState({
    status: false,
    entryId: null,
  });
  const [editedTransactionInput, setEditedTransactionInput] = useState({
    date: "",
    transactionCategory: "",
    description: "",
    amount: "",
  });

  function updateTransactionInput(field, value) {
    /*
      The function handles updating the `transactionInput` state and
      gets called whenever the user types into an input field of the
      Expenses form.
    */
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
    /*
      The function handles updating the `depositInput` state and
      gets called whenever the user types into an input field of the
      Deposit form.
    */
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
        transactionCategory: "Bills/Utilities",
        description: "",
        amount: "",
      });
    } else if (formName === "deposits") {
      handleAddTransaction("deposit", inputValues);
      setDepositInput({
        date: "",
        transactionCategory: "Deposit",
        description: "",
        amount: "",
      });
    }
  }

  function handleInputChange(field, value) {
    /*
      The function handles updating the `editedTransactionInput` state,
      which holds the updated values of the currently-being edited
      entry's input fields.
    */
    if (field === "date") {
      setEditedTransactionInput({
        ...editedTransactionInput,
        date: value,
      });
    } else if (field === "type") {
      setEditedTransactionInput({
        ...editedTransactionInput,
        transactionCategory: value,
      });
    } else if (field === "description") {
      setEditedTransactionInput({
        ...editedTransactionInput,
        description: value,
      });
    } else if (field === "amount") {
      setEditedTransactionInput({
        ...editedTransactionInput,
        amount: parseFloat(value),
      });
    }
  }

  function getInputValues(e) {
    /*
      The function takes the target button node and uses its parent
      `tr` node to get the tranasction cells' values. This alternative
      is used because states are asynchronous and we cannot use the 
      updated object immediately.
    */

    const dateCell = e.target.closest("tr").firstElementChild;
    const typeCell = dateCell.nextElementSibling;
    const descriptionCell = typeCell.nextElementSibling;
    const amountCell = descriptionCell.nextElementSibling;

    const transactionDate = dateCell.textContent;
    const transactionType = typeCell.textContent;
    const transactionDescription = descriptionCell.textContent;
    const transactionAmount = amountCell.textContent;

    return {
      transactionDate,
      transactionType,
      transactionDescription,
      transactionAmount,
    };
  }

  function handleEditTransaction(e, targetEntryId) {
    /*
      The function takes the target button node to target the parent
      `tr` node and access the `td` cells whose values need to be updated.
      Only one entry may be edited at a time to prevent broken entry updates.

      On edit, the text content is replaced with input fields and on save,
      the input fields are replaced with updated text values. The cells'
      original values are fed back into the input fields for quick editing.
    */

    if (!isEditTransaction.status && isEditTransaction.entryId === null) {
      // In edit mode => change text to inputs
      const [dateCell, typeCell, descriptionCell, amountCell] =
        e.target.closest("tr").children;
      const transactionDate = dateCell.textContent;
      const transactionType = typeCell.textContent;
      const transactionDescription = descriptionCell.textContent;
      const transactionAmount = Math.abs(parseFloat(amountCell.textContent));

      const dateInput = document.createElement("input");
      dateInput.setAttribute("type", "date");
      dateInput.classList.add("form-control");
      dateInput.value = transactionDate;
      dateInput.addEventListener("change", (e) => {
        handleInputChange("date", e.target.value);
      });

      let typeSelectInput;
      if (transactionType !== "Deposit") {
        // Create a select-option for each expense category
        typeSelectInput = document.createElement("select");
        typeSelectInput.classList.add("form-select");
        const options = expenseCategories.map((option) => {
          const newOption = document.createElement("option");
          newOption.value = option;
          newOption.textContent = option;

          return newOption;
        });
        options.forEach((option) => {
          typeSelectInput.appendChild(option);
        });
        typeSelectInput.value = transactionType;
        typeSelectInput.addEventListener("change", (e) => {
          handleInputChange("type", e.target.value);
        });
      } else if (transactionType === "Deposit") {
        // Create a select-option for deposits
        typeSelectInput = document.createElement("select");
        typeSelectInput.classList.add("form-select");
        const inputOption = document.createElement("option");
        inputOption.value = "Deposit";
        inputOption.textContent = "Deposit";
        typeSelectInput.appendChild(inputOption);
        typeSelectInput.addEventListener("change", (e) => {
          handleInputChange("type", e.target.value);
        });
      }

      const descriptionInput = document.createElement("input");
      descriptionInput.setAttribute("type", "textbox");
      descriptionInput.classList.add("form-control");
      descriptionInput.value = transactionDescription;
      descriptionInput.addEventListener("change", (e) => {
        handleInputChange("description", e.target.value);
      });

      const amountInput = document.createElement("input");
      amountInput.setAttribute("type", "number");
      amountInput.classList.add("form-control");
      amountInput.setAttribute("step", "0.01");
      amountInput.setAttribute("min", "0.01");
      amountInput.value = transactionAmount;
      amountInput.addEventListener("change", (e) => {
        handleInputChange("amount", e.target.value);
      });

      dateCell.innerHTML = "";
      dateCell.appendChild(dateInput);

      typeCell.innerHTML = "";
      typeCell.appendChild(typeSelectInput);

      descriptionCell.innerHTML = "";
      descriptionCell.appendChild(descriptionInput);

      amountCell.innerHTML = "";
      amountCell.appendChild(amountInput);

      setIsEditTransaction((prevState) => ({
        ...prevState,
        entryId: targetEntryId,
      }));
    } else if (
      isEditTransaction.status &&
      isEditTransaction.entryId === targetEntryId
    ) {
      // In save mode => change inputs to text
      const [dateCell, typeCell, descriptionCell, amountCell] =
        e.target.closest("tr").children;

      const transactionDate = dateCell.firstChild.value;
      const transactionType = typeCell.firstChild.value;
      const transactionDescription = descriptionCell.firstChild.value;
      const transactionAmount =
        transactionType !== "Deposit"
          ? `-${amountCell.firstChild.value}`
          : amountCell.firstChild.value;

      dateCell.removeChild(dateCell.firstChild);
      dateCell.textContent = transactionDate;

      typeCell.removeChild(typeCell.firstChild);
      typeCell.textContent = transactionType;

      descriptionCell.removeChild(descriptionCell.firstChild);
      descriptionCell.textContent = transactionDescription;

      amountCell.removeChild(amountCell.firstChild);
      amountCell.textContent = transactionAmount;

      setIsEditTransaction((prevState) => ({
        ...prevState,
        entryId: null,
      }));

      handleSaveEditedTransaction(targetEntryId, getInputValues(e));
    }

    setIsEditTransaction((prevState) => ({
      ...prevState,
      status: !isEditTransaction.status,
    }));
  }

  function updateButtonText(e, targetEntryId) {
    /*
      The function takes the button node and updates its text content
      to "Save" when the current transaction is marked as being edited
      or to "Edit" in other scenarios.
    */
    if (!isEditTransaction.status && isEditTransaction.entryId === null) {
      e.target.textContent = "Save";
    } else if (
      isEditTransaction.status &&
      isEditTransaction.entryId === targetEntryId
    ) {
      e.target.textContent = "Edit";
    }
  }

  const sortedTransactions = Calculate.sortTransactionsByDate(transactions);

  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <p className="d-inline-flex gap-1">
            <span
              data-bs-toggle="collapse"
              data-bs-target=".expenses-container"
            >
              <button
                data-bs-toggle="button"
                className="btn btn-outline-primary"
                type="button"
              >
                Enter an Expense
              </button>
            </span>
            <span
              data-bs-toggle="collapse"
              data-bs-target=".deposits-container"
            >
              <button
                data-bs-toggle="button"
                className="btn btn-outline-primary"
                type="button"
              >
                Enter a Deposit
              </button>
            </span>
          </p>
          <div className="expenses-container container collapse">
            <h2>Enter an Expense:</h2>
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
                  {expenseCategories.map((option, index) => {
                    return (
                      <option value={option} key={`option${index}`}>
                        {option}
                      </option>
                    );
                  })}
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
          <div className="deposits-container container collapse">
            <h2>Enter a Deposit:</h2>
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
              {sortedTransactions.map((transaction) => {
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
                      <button
                        onClick={(e) => {
                          const targetClass = e.target.closest("tr").className;
                          const targetEntryId = targetClass.split("t")[1];
                          handleEditTransaction(e, targetEntryId);
                          updateButtonText(e, targetEntryId);
                        }}
                        className="btn btn-warning"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          const targetClass = e.target.closest("tr").className;
                          const targetEntryId = targetClass.split("t")[1];
                          handleDeleteTransaction(targetEntryId);
                        }}
                        className="btn btn-danger"
                        type="button"
                      >
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
