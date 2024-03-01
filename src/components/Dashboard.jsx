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
import Header from "./Header";

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
        ctx.font = "1.5rem sans-serif";
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
      <h1>Welcome, User!</h1>
      <main>
        <h2 className="text-center">User's Dashboard</h2>
        <div className="container-sm my-5">
          <div className="row gx-5">
            <div className="col-7">
              <Doughnut
                data={data}
                options={options}
                plugins={plugins}
              ></Doughnut>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h3>Overview</h3>
                  <hr />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Total Spent: {formatAmount(spentAmount)}
                    </li>
                    <li className="list-group-item">
                      Remaining Balance: {formatAmount(remainingBalance)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-5">
            <div className="card">
              <div className="card-body">
                <h3>Recent Transactions</h3>
                <hr />
                <table className="table table-striped">
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
                </table>

                <Link
                  to="/transactions"
                  className="d-flex justify-content-center"
                >
                  View All Transactions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
