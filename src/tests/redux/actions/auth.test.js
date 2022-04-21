import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../../redux/actions/auth';
import { types } from '../../../redux/types/types';
import * as fetchModule from '../../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

describe('Auth actions Test', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('startLogin should work', async () => {
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(startLogin('user@mail.com', '123ABC'));
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    // const token = localStorage.setItem.mock.calls[0][1];
    // console.log(token);
  });

  test('startLogin should not work ', async () => {
    await store.dispatch(startLogin('user@mail.com', '123ABCD'));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password is not valid', 'error');

    await store.dispatch(startLogin('user@email.com', '123ABC'));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Email does not exist', 'error');
  });

  test('startRegister should work', async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'someone',
          token: 'tydas65sdd7asd9d87sd',
        };
      },
    }));

    await store.dispatch(startRegister('test@test.com', '123456', 'test'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'someone',
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'tydas65sdd7asd9d87sd');
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('startChecking should work', async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'someone',
          token: 'tydas65sdd7asd9d87sd',
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'someone',
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'tydas65sdd7asd9d87sd');
  });
});
