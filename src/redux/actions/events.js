import { types } from '../types/types';

export const eventAddNew = e => ({
  type: types.eventAddNew,
  payload: e,
});

export const eventSetActive = e => ({
  type: types.eventSetActive,
  payload: e,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});
