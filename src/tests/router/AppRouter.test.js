import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe(' <AppRouter/> Test', () => {
  test('should display loading...', () => {
    const initState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );

    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });

  test('should display <PublicRoute/>', () => {
    const initState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-screen').exists()).toBe(true);
  });

  test('should display <PrivateRoute/>', () => {
    const initState = {
      ui: {
        modalOpen: false,
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        checking: false,
        uid: '123',
        name: 'someone',
      },
    };
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
