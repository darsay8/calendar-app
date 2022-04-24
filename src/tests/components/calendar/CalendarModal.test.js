import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import CalendarModal from '../../../components/calendar/CalendarModal';
import {
  eventStartUpdate,
  eventClearActiveEvent,
  eventStartAddNew,
} from '../../../redux/actions/events';
import { act } from '@testing-library/react';

jest.mock('../../../redux/actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlusOne = now.clone().add(1, 'hours');

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'New Event',
      notes: 'Some notes',
      start: now.toDate(),
      end: nowPlusOne.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'someone',
  },
  ui: {
    modalOpen: true,
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>,
);

describe('<CalendarModal/> Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display modal', () => {
    // expect(wrapper.find('.modal').exists()).toBe(true);
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should dispatch update and close modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });
    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should display an error if the title is missing', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });

  test('should create a new event', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: '123',
        name: 'someone',
      },
      ui: {
        modalOpen: true,
      },
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>,
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'new test',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      title: 'new test',
      notes: '',
      start: expect.anything(),
      end: expect.anything(),
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should validate dates ', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'new test',
      },
    });

    const today = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'The end date must be greater than the start date',
      'error',
    );
  });
});
