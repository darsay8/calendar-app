import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlusOne = now.clone().add(1, 'hours');

const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate());

  const handleStartDateChange = e => {
    setDateStart(e);
  };

  const handleEndDateChange = e => {
    setDateEnd(e);
  };

  const closeModal = () => {};

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-bg"
    >
      <h1>New Event </h1>
      <hr />
      <form className="container">
        <div className="form-group">
          <label>Start event</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
            minDate={dateStart}
          />
        </div>

        <div className="form-group">
          <label>End event</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            className="form-control"
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Title and notes</label>
          <input
            type="text"
            className="form-control"
            placeholder="Event title"
            name="title"
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Short description
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            More info
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
