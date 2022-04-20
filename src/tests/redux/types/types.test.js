import { types } from '../../../redux/types/types';

describe('Types Test', () => {
  test('types must match', () => {
    expect(types).toEqual({
      uiOpenModal: '[UI] Open Modal',
      uiCloseModal: '[UI] Close Modal',

      eventSetActive: '[Event] Set Active',

      eventStartAddNew: '[Event] Start add new',
      eventAddNew: '[Event] Add New',
      eventClearActiveEvent: '[Event] Clear active event',
      eventUpdated: '[Event] Event updated',
      eventDeleted: '[Event] Event deleted',
      eventLoaded: '[Event] Event Loaded',
      eventClear: '[Event] Events clear',

      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    });
  });
});
