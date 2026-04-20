import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="brand">
          Scan-To-<span className="brand-highlight">Save</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/scanner" className="nav-link">Change Details</Link>
          <a href="mailto:Prashant24816gp@gmail.com" className="nav-link">Contact</a>
          <Link to="/create" className="nav-btn">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
