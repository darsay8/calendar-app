import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import LoginScreen from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../redux/actions/auth';

jest.mock('../../../redux/actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>,
);

describe('<LoginScreen/> Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should match to snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch startLogin', () => {
    wrapper.find('input[name="loginEmail"]').simulate('change', {
      target: {
        name: 'loginEmail',
        value: 'someone@mail.com',
      },
    });
    wrapper.find('input[name="loginPassword"]').simulate('change', {
      target: {
        name: 'loginPassword',
        value: '123ABC',
      },
    });

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith('someone@mail.com', '123ABC');
  });

  test('should not register an user if passwords are different', () => {
    wrapper.find('input[name="registerPassword"]').simulate('change', {
      target: {
        name: 'registerPassword',
        value: '123ABC',
      },
    });
    wrapper.find('input[name="registerConfirmPassword"]').simulate('change', {
      target: {
        name: 'registerConfirmPassword',
        value: '1234ABCD',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Passwords should match', 'error');
  });

  test('should dispatch startRegister', () => {
    wrapper.find('input[name="registerName"]').simulate('change', {
      target: {
        name: 'registerName',
        value: 'someone',
      },
    });
    wrapper.find('input[name="registerEmail"]').simulate('change', {
      target: {
        name: 'registerEmail',
        value: 'someone@mail.com',
      },
    });
    wrapper.find('input[name="registerPassword"]').simulate('change', {
      target: {
        name: 'registerPassword',
        value: '123ABC',
      },
    });
    wrapper.find('input[name="registerConfirmPassword"]').simulate('change', {
      target: {
        name: 'registerConfirmPassword',
        value: '123ABC',
      },
    });
    //
    //
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith('someone', 'someone@mail.com', '123ABC');
  });
});
