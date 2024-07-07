import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { SaveAppointmentToDB } from '../../../state/Appointment/appointmentAction';
import AppointmentCheckoutModal from './AppointmentCheckoutModal';

const AppointmentTimeModal = ({
  show,
  handleClose,
  checkoutId,
  hospitalName,
  vaccineName,
  price,
  dosesRequired,
}) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00 AM'); // Initial time with AM/PM
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const dispatchToDB = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }
    // Fetch any necessary data here
  }, [dispatchToDB, accessToken]);

  const handleSubmit = () => {
    // Convert selectedTime to 24-hour format
    const timeParts = selectedTime.split(' ');
    const time = timeParts[0];
    const ampm = timeParts[1];

    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }

    // Combine selectedDate and selectedTime into a single Date object
    const combinedDateTime = new Date(selectedDate);
    combinedDateTime.setHours(hours, minutes, 0, 0);

    const appointmentDetail = {
      userId: user._id,
      appointmentDate: combinedDateTime,
      hospitalVaccineId: checkoutId,
    };
    setAppointmentDetail(appointmentDetail);
    setShowCheckoutModal(true);
    // Handle form submission logic here, such as dispatching an action or calling an API
    // dispatchToDB(SaveAppointmentToDB(appointmentDetails, accessToken));
    // alert('Appointment submitted successfully!');
    //handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Purchase Vaccination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAppointmentDate">
            <Form.Label>Select Appointment Date</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formAppointmentTime">
            <Form.Label>Select Appointment Time</Form.Label>
            <TimePicker
              value={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              format="hh:mm a"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              clearIcon={null}
              className="form-control"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <div className="primary">
          <Button onClick={handleSubmit}>Checkout Vaccination</Button>
        </div>

        {showCheckoutModal && (
          <AppointmentCheckoutModal
            show={showCheckoutModal}
            handleClose={handleClose}
            handleCheckoutClose={() => setShowCheckoutModal(false)}
            checkoutId={checkoutId}
            appointmentDetail={appointmentDetail}
            hospitalName={hospitalName}
            vaccineName={vaccineName}
            price={price}
            dosesRequired={dosesRequired}
          />
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentTimeModal;
