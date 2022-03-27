import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'Payday',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: 'fafafa',
    notes: 'Get the money',
    user: {
      id: '123',
      name: 'Username',
    },
  },
];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  console.log('LAST VIEW', lastView);

  const onDoubleClick = e => {
    console.log('DOBLE:', e);
  };

  const onSelectEvent = e => {
    console.log('SELECT:', e);
  };

  const onViewChange = e => {
    console.log('VIEW:', e);
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

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
          components={{ event: CalendarEvent }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lastView}
        />
      </div>
    </div>
  );
};

export default CalendarScreen;
