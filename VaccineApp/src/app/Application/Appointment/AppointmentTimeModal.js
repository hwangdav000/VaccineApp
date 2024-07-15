import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { SaveAppointmentToDB } from '../../../state/Appointment/appointmentAction';
import AppointmentCheckoutModal from './AppointmentCheckoutModal';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

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
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Purchase Vaccination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            as={Row}
            controlId="formAppointmentDate"
          >
            <Form.Label
              column
              sm="4"
              className="font-weight-bold"
            >
              Set Date
            </Form.Label>
            <Col sm="4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                popperPlacement="bottom-end"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: '0, 8px',
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport',
                  },
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            controlId="formAppointmentTime"
            className="mt-3"
          >
            <Form.Label
              column
              sm="4"
              className="font-weight-bold"
            >
              Set Time
            </Form.Label>
            <Col sm="4">
              <TimePicker
                value={selectedTime}
                onChange={setSelectedTime}
                format="hh:mm a"
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                disableClock={true}
                clearIcon={null}
                className="form-control"
              />
            </Col>
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
        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          Checkout Vaccination
        </Button>

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
