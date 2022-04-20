import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../redux/actions/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: '',
    loginPassword: '',
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
  });

  const { loginEmail, loginPassword } = formLoginValues;

  const { registerName, registerEmail, registerPassword, registerConfirmPassword } =
    formRegisterValues;

  const handleLogin = e => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  const handleRegister = e => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      return Swal.fire('Error', 'Passwords should match', 'error');
    }
    dispatch(startRegister(registerName, registerEmail, registerPassword));
  };

  return (
    <div className="login-screen">
      <div className="container">
        <div className="row">
          <div className="forms-group">
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
              <form className="form-horizontal" onSubmit={handleRegister}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control"
                    placeholder="Name"
                    name="registerName"
                    value={registerName}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="registerEmail"
                    value={registerEmail}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="registerPassword"
                    value={registerPassword}
                    onChange={handleRegisterInputChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    name="registerConfirmPassword"
                    value={registerConfirmPassword}
                    onChange={handleRegisterInputChange}
                  />
                </div>

                <div className="form-group">
                  <input type="submit" className="btnSubmit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
