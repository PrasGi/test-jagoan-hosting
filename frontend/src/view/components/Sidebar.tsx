import { Link } from "react-router-dom";

const Sidebar = () => {
  const currentPath = window.location.pathname;
  return (
    <aside id="sidebar" className="sidebar shadow-lg">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPath == "/" ? "active" : ""
            } collapsed`}
            to="/"
          >
            <i className="bi bi-house"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-heading">manage</li>

        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPath == "/resident" ? "active" : ""
            } collapsed`}
            to="/resident"
          >
            <i className="bi bi-person"></i>
            <span>Resident</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPath == "/house" ? "active" : ""
            } collapsed`}
            to="/house"
          >
            <i className="bi bi-house-door"></i>
            <span>House</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPath == "/payment" ? "active" : ""
            } collapsed`}
            to="/payment"
          >
            <i className="bi bi-wallet"></i>
            <span>House Payment</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              currentPath == "/detail" ? "active" : ""
            } collapsed`}
            to="/detail"
          >
            <i className="bi bi-file-person"></i>
            <span>Detail Resume</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
