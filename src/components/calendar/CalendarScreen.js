import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../redux/actions/ui';
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from '../../redux/actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = e => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = e => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = e => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return { style };
  };

  const onSelectSlot = e => {
    dispatch(eventClearActiveEvent());
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <div className="container calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          components={{ event: CalendarEvent }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
        />
      </div>
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
