import { startChecking } from '../../../redux/actions/auth';
import { authReducer } from '../../../redux/reducers/authReducer';
import { types } from '../../../redux/types/types';

const initState = {
  checking: true,
};

describe('Auth Reducer Test', () => {
  test('should return default state', () => {
    const action = {};
    const state = authReducer(initState, action);
    expect(state).toEqual(initState);
  });

  test('login action should work ', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'someone',
      },
    };

    const state = authReducer(initState, action);
    expect(state).toEqual({ checking: false, uid: '123', name: 'someone' });
  });
});
