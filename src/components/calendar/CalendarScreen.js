import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Navbar from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'Payday',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: 'fafafa',
    notes: 'Get the money',
  },
];

const CalendarScreen = () => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return { style };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <div className="container calendar">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};

export default CalendarScreen;
