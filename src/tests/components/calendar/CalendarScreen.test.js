import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';

import '@testing-library/jest-dom';

import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { types } from '../../../redux/types/types';
import { eventSetActive } from '../../../redux/actions/events';

jest.mock('../../../redux/actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: '123',
    name: 'someone',
  },
  ui: {
    openModal: false,
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>,
);

describe('<CalendarScreen/> Test', () => {
  test('should match to snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('calendar interactions test', () => {
    const calendar = wrapper.find('Calendar');

    const calendarEvents = calendar.prop('events');
    expect(calendarEvents).toEqual([]);

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenLastCalledWith({ type: types.uiOpenModal });

    calendar.prop('onSelectEvent')({ start: 'hi' });
    expect(eventSetActive).toHaveBeenLastCalledWith({ start: 'hi' });

    //we use act because this instruction modifies with setState
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenLastCalledWith('lastView', 'week');
    });
  });
});
