import { Logout } from "../../services/AuthService";

const Navbar = () => {
  const handleLogout = () => {
    Logout();
  };

  return (
    <header
      id="header"
      className="header fixed-top d-flex align-items-center shadow"
    >
      <div className="d-flex align-items-center justify-content-between">
        <i className="bi bi-list toggle-sidebar-btn"></i>
        <a href="#" className="logo d-flex align-items-center">
          <span className="d-none d-lg-block fs-3 ms-3">House Manage</span>
        </a>
      </div>

      <nav className="header-nav ms-auto p-5">
        <a onClick={handleLogout} className="btn btn-outline-danger">
          <i className="bi bi-box-arrow-left"></i> Logout
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
