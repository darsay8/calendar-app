import { uiCloseModal, uiOpenModal } from '../../../redux/actions/ui';
import { uiReducer } from '../../../redux/reducers/uiReducer';

const initState = {
  modalOpen: false,
};

describe('UI Reducer Test', () => {
  test('should return default state', () => {
    const state = uiReducer(initState, {});

    expect(state).toEqual(initState);
  });

  test('should open and close modal', () => {
    const modalOpen = uiOpenModal();
    const modalClose = uiCloseModal();

    const state = uiReducer(initState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const stateClose = uiReducer(state, modalClose);

    expect(stateClose).toEqual(initState);
  });
});
