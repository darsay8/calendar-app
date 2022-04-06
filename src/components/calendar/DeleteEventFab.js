import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../redux/actions/events';

const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(eventStartDelete());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleClickDelete}>
      <i className="fas fa-trash"></i>
      <span> Delete Event</span>
    </button>
  );
};

export default DeleteEventFab;
