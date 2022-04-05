import { fetchWithoutToken } from '../../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => async dispatch => {
  const res = await fetchWithoutToken('auth', { email, password }, 'POST');
  const body = await res.json();

  if (body.ok) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(login({ uid: body.uid, name: body.name }));
  }
};

const login = user => ({
  type: types.authLogin,
  payload: user,
});
