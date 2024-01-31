import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar d-flex justify-content-evenly">
        <Link to="/" className="nav-item">
          Dashboard
        </Link>
        <Link to="/transactions" className="nav-item">
          Transactions
        </Link>
        <Link to="/wishlist" className="nav-item">
          Wishlist Tracker
        </Link>
      </nav>
    </header>
  );
}

export default Header;
