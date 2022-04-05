import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../redux/actions/auth';
import './login.css';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange, reset] = useForm({
    loginEmail: 'user@mail.com',
    loginPassword: '123ABC',
  });

  const { loginEmail, loginPassword } = formLoginValues;

  const handleLogin = e => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form className="form-horizontal" onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form className="form-horizontal">
            <div className="form-group">
              <input type="text" className="form-control form-control" placeholder="Name" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" />
            </div>

            <div className="form-group">
              <input type="password" className="form-control" placeholder="Confirm password" />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
