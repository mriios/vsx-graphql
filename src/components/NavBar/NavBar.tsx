import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="NavBar__Logo">Post Analytics Dashboard</div>
      <ul className="NavBar__Items">
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/LinearChart">Linear Chart</Link>
        </li>
        <li>
          <Link to="/PieChart">Pie Chart</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
