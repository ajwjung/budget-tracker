import PropTypes from "prop-types";

function BudgetBalanceForm({ handleUpdateStartBalance }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateStartBalance();
        e.target.reset();
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
          required={true}
        />
        <button type="submit" className="btn btn-outline-primary">
          Save
        </button>
      </div>
    </form>
  );
}

BudgetBalanceForm.propTypes = {
  handleUpdateStartBalance: PropTypes.func,
};

export default BudgetBalanceForm;
