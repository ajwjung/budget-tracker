import { useState, useContext } from "react";
import { WishlistContext } from "../App";

function BudgetBalanceForm() {
  const { handleUpdateStartBalance } = useContext(WishlistContext);
  const [startBalance, setStartBalance] = useState("");

  function handleStartBalanceChange(e) {
    setStartBalance(parseFloat(e.target.value));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateStartBalance(startBalance);
        setStartBalance("");
      }}
      id="budget-balance-form"
    >
      <h3 className="fs-4">Enter your starting balance:</h3>
      <div className="input-group">
        <label htmlFor="current-balance" className="input-group-text">
          $
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          name="currentBalance"
          id="current-balance"
          className="form-control"
          value={startBalance}
          onChange={(e) => {
            handleStartBalanceChange(e);
          }}
          required={true}
        />
        <button type="submit" className="btn btn-outline-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default BudgetBalanceForm;
