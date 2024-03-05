import { useContext } from "react";
import { WishlistContext } from "../App";
import { Link } from "react-router-dom";
import Calculate from "../scripts/Calculate";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Container, Row, Col, Card, Table, ListGroup } from "react-bootstrap";
import Header from "./Header";
import styles from "./Dashboard.module.css";

ChartJS.register(DoughnutController, ArcElement, Legend, Tooltip);

function Dashboard() {
  const { transactions, expenseCategories } = useContext(WishlistContext);

  function calculateTotalSpent() {
    /*
      The function calculates and returns the total amount spent
      based on expenses recorded in the "Transactions" tab.
    */
    const totalSpent = transactions
      .map((transaction) => {
        return (
          transaction.transactionCategory !== "Deposit" &&
          parseFloat(transaction.amount)
        );
      })
      .reduce((total, currentAmount) => total + currentAmount, 0);

    return Math.abs(totalSpent).toFixed(2);
  }

  function calculateRemainingBalance() {
    /*
      The function calculates and returns the remaining balance
      based on expenses and deposits recorded in the "Transactions" tab.

      Remaining balance = deposits - expenses
    */

    const totalSpent = calculateTotalSpent();
    const totalEarned = transactions
      .map((transaction) => {
        return (
          transaction.transactionCategory === "Deposit" &&
          parseFloat(transaction.amount)
        );
      })
      .reduce((total, currentAmount) => total + currentAmount, 0);

    return (totalEarned - totalSpent).toFixed(2);
  }

  function formatAmount(amount) {
    return parseFloat(amount) < 0 ? `-$${amount.substring(1)}` : `$${amount}`;
  }

  function calculateTotalPerCategory() {
    /*
      The function sorts each transaction by expense type to calculate
      the total amount for each category. This will be used as the data
      displayed as a doughnut chart.
    */
    const expensesByCategory = expenseCategories.map((category) => {
      return transactions.filter(
        (transaction) => transaction.transactionCategory === category
      );
    });

    const totalsByCategory = expensesByCategory.map((category) => {
      return category.length > 0
        ? Math.abs(
            category.reduce((total, currentTransaction) => {
              return total + parseFloat(currentTransaction.amount);
            }, 0)
          )
        : 0;
    });

    let totals = {};
    expenseCategories.forEach(
      (category, i) => (totals[category] = totalsByCategory[i])
    );

    return totals;
  }

  const spentAmount = calculateTotalSpent();
  const remainingBalance = calculateRemainingBalance();
  const totalsPerCategory = calculateTotalPerCategory();
  const tenMostRecentTransactions = Calculate.sortTransactionsByDate(
    transactions
  ).slice(0, 9);

  // Data and config for doughnut chart
  const data = {
    labels: [...expenseCategories],
    datasets: [
      {
        label: "Amount Spent",
        data: [...Object.values(totalsPerCategory)],
        backgroundColor: [
          "lemonchiffon",
          "gold",
          "plum",
          "turquoise",
          "coral",
          "pink",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Doughnut label
  const plugins = [
    {
      id: "doughnutText",
      beforeDraw: function (chart) {
        const { ctx } = chart;

        ctx.save();

        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "1.2rem sans-serif";
        ctx.fillStyle = "steelblue";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`$${calculateTotalSpent()}`, xCoor, yCoor);
      },
    },
  ];

  return (
    <>
      <Header />
      <main>
        <Container>
          <Row className="my-3">
            <h1>Welcome, User!</h1>
          </Row>
          <Row className="my-3">
            <h2 className="text-center">User's Dashboard</h2>
          </Row>
          <Row>
            <Col className={styles.doughnutContainer}>
              <Doughnut
                data={data}
                options={options}
                plugins={plugins}
              ></Doughnut>
            </Col>
            <Col className="my-2">
              <Card>
                <Card.Body>
                  <Card.Title>Overview</Card.Title>
                  <hr />
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Total Spent: {formatAmount(spentAmount)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Remaining Balance: {formatAmount(remainingBalance)}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Recent Transactions</Card.Title>
                  <hr />
                  <Table striped responsive size="md">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenMostRecentTransactions.map((transaction) => {
                        return (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.transactionCategory}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Link
                    to="/transactions"
                    className="d-flex justify-content-center"
                  >
                    View All Transactions
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default Dashboard;
