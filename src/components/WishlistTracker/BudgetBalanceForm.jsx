import { useState, useContext } from "react";
import { WishlistContext } from "../../App";
import { Button, Form, InputGroup } from "react-bootstrap";

function BudgetBalanceForm() {
  const { handleUpdateStartBalance } = useContext(WishlistContext);
  const [startBalance, setStartBalance] = useState("");

  function handleStartBalanceChange(e) {
    setStartBalance(parseFloat(e.target.value));
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateStartBalance(startBalance);
        setStartBalance("");
      }}
      id="budget-balance-form"
    >
      <h3 className="fs-4">Enter your starting balance:</h3>
      <InputGroup>
        <InputGroup.Text id="current-balance">$</InputGroup.Text>
        <Form.Control
          type="number"
          min="0.01"
          step="0.01"
          name="currentBalance"
          value={startBalance}
          onChange={(e) => {
            handleStartBalanceChange(e);
          }}
          required={true}
        />
        <Button type="submit" variant="outline-primary">
          Save
        </Button>
      </InputGroup>
    </Form>
  );
}

export default BudgetBalanceForm;
