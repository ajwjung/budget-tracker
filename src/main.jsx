import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Spendings from "./components/Spendings.jsx";
import Reports from "./components/Reports.jsx";
import Wishlist from "./components/Wishlist.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "spendings", element: <Spendings /> },
      { path: "reports", element: <Reports /> },
      { path: "wishlist", element: <Wishlist /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
