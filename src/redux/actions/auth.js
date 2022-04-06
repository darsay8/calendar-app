import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => async dispatch => {
  const res = await fetchWithoutToken('auth', { email, password }, 'POST');
  const body = await res.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({ uid: body.uid, name: body.name }));
  } else {
    Swal.fire('Error', getErrors(body), 'error');
  }
};

export const startRegister = (name, email, password) => async dispatch => {
  const res = await fetchWithoutToken('auth/new', { email, password, name }, 'POST');
  const body = await res.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({ uid: body.uid, name: body.name }));
  } else {
    Swal.fire('Error', getErrors(body), 'error');
  }
};

export const startChecking = () => async dispatch => {
  const res = await fetchWithToken('auth/validate');
  const body = await res.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({ uid: body.uid, name: body.name }));
  } else {
    // Swal.fire('Error', getErrors(body), 'error');
    dispatch(checkingFinish());
  }
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = user => ({
  type: types.authLogin,
  payload: user,
});

const getErrors = body => {
  return body.errors ? Object.values(body.errors)[0].msg : body.msg;
};
