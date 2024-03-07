import { useState, useContext } from "react";
import { WishlistContext } from "../../App";
import { Accordion, Row, Button, Form, InputGroup } from "react-bootstrap";

function BudgetBalanceForm() {
  const { handleUpdateStartBalance } = useContext(WishlistContext);
  const [startBalance, setStartBalance] = useState("");

  function handleStartBalanceChange(e) {
    setStartBalance(parseFloat(e.target.value));
  }

  return (
    <Accordion className="my-3">
      <Accordion.Item>
        <Accordion.Header as="h3">
          Enter your starting balance:
        </Accordion.Header>
        <Accordion.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateStartBalance(startBalance);
              setStartBalance("");
            }}
            id="budget-balance-form"
          >
            <Row>
              <Form.Label htmlFor="current-balance">
                Starting Balance
              </Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  min="0.01"
                  step="0.01"
                  name="currentBalance"
                  id="current-balance"
                  value={startBalance}
                  onChange={(e) => {
                    handleStartBalanceChange(e);
                  }}
                  required={true}
                />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <Button type="submit" variant="outline-primary">
                  Save
                </Button>
              </InputGroup>
            </Row>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BudgetBalanceForm;
