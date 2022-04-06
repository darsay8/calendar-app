import { fetchWithToken } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = event => async (dispatch, getState) => {
  const { uid, name } = getState().auth;
  try {
    const res = await fetchWithToken('events/new', event, 'POST');
    const body = await res.json();

    if (body.ok) {
      event.id = body.event.id;
      event.user = {
        _id: uid,
        name: name,
      };
      console.log(event);
      dispatch(eventAddNew(event));
    }
  } catch (error) {
    console.log(error);
  }
};

const eventAddNew = e => ({
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

export const eventUpdated = e => ({
  type: types.eventUpdated,
  payload: e,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => async dispatch => {
  try {
    const res = await fetchWithToken('events');
    const body = await res.json();

    const events = prepareEvents(body.events);
    dispatch(eventLoaded(events));
  } catch (error) {
    console.log(error);
  }
};

const eventLoaded = events => ({
  type: types.eventLoaded,
  payload: events,
});
