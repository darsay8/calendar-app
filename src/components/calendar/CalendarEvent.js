import { useSelector } from 'react-redux';

const CalendarEvent = ({ event }) => {
  const { events } = useSelector(state => state.calendar);

  const { title, user } = events[0];
  return (
    <div>
      <strong>{title}</strong>
      <br />
      <span>{user.name}</span>
    </div>
  );
};

export default CalendarEvent;
