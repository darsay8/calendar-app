import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between mb-4">
      <div className="container">
        <span className="navbar-brand">{name}</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span> Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
