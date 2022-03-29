import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      title: 'Payday!',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: 'fafafa',
      notes: 'Get the money',
      user: {
        id: '123',
        name: 'Username',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    default:
      return state;
  }
};
