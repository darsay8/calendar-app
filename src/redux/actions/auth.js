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
    console.log(body.errors);
    const error = body.errors ? Object.values(body.errors)[0].msg : body.msg;
    Swal.fire('Error', error, 'error');
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
    console.log(body.errors);
    const error = body.errors ? Object.values(body.errors)[0].msg : body.msg;
    Swal.fire('Error', error, 'error');
  }
};

const login = user => ({
  type: types.authLogin,
  payload: user,
});
