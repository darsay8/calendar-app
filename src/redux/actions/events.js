import Swal from 'sweetalert2';
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

export const eventStartUpdate = event => async dispatch => {
  try {
    const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
    const body = await res.json();

    if (body.ok) {
      dispatch(eventUpdated(event));
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  } catch (error) {
    console.log(error);
  }
};

const eventUpdated = e => ({
  type: types.eventUpdated,
  payload: e,
});

export const eventStartDelete = () => async (dispatch, getState) => {
  const { id } = getState().calendar.activeEvent;

  try {
    const res = await fetchWithToken(`events/${id}`, {}, 'DELETE');
    const body = await res.json();

    if (body.ok) {
      dispatch(eventDeleted());
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  } catch (error) {
    console.log(error);
  }
};

const eventDeleted = () => ({
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

export const eventClear = () => ({
  type: types.eventClear,
});
