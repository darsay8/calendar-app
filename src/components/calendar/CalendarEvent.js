import { useSelector } from 'react-redux';

const CalendarEvent = ({ event }) => {
  const { title, user, notes } = event;
  return (
    <div>
      <strong>{title}</strong>
      <br />
      <span>{user.name}</span>
      <br />
      <small>{notes}</small>
    </div>
  );
};

export default CalendarEvent;
