import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import DeleteEventFab from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../redux/actions/events';

jest.mock('../../../redux/actions/events', () => ({
  eventStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>,
);

describe('<DeleteEventFab/> Test', () => {
  test('should to match snapshot ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch eventStartDelete', () => {
    wrapper.find('.btn').simulate('click');
    // wrapper.find('button').prop('onClick')();

    expect(eventStartDelete).toHaveBeenCalled();
  });
});
