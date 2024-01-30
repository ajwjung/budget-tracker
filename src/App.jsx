import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <nav className="navbar d-flex justify-content-evenly">
          <Link to="dashboard" className="nav-item">
            Dashboard
          </Link>
          <Link to="spendings" className="nav-item">
            Input Spendings
          </Link>
          <Link to="reports" className="nav-item">
            Reports
          </Link>
          <Link to="wishlist" className="nav-item">
            Wishlist
          </Link>
        </nav>
      </header>
      <h1>Welcome, User</h1>
      <Outlet />
    </>
  );
}

export default App;
