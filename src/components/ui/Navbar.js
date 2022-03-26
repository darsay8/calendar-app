const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between mb-4">
      <div className="container">
        <span className="navbar-brand">User</span>
        <button className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt"></i>
          <span> Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
