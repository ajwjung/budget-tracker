import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(DoughnutController, ArcElement, Legend, Tooltip);

function Dashboard() {
  const data = {
    labels: [
      "Entertainment",
      "Food/Drinks",
      "Bills & Utilities",
      "Medical & Healthcare",
      "Housing",
      "Shopping",
    ],
    datasets: [
      {
        label: "Spendings Breakdown",
        data: [146.78, 234.82, 428.82, 425.15, 1200, 164.83],
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
        const { ctx, data } = chart;

        ctx.save();

        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "bold sans-serif";
        ctx.fillStyle = "steelblue";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `${data.labels[0]}: ${data.datasets[0].data[0]}`,
          xCoor,
          yCoor
        );
      },
    },
  ];

  return (
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
                <ul>
                  <li>Spent:</li>
                  <li>Balance:</li>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
