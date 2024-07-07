import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { SaveAppointmentToDB } from '../../../state/Appointment/appointmentAction';
import QRCode from 'react-qr-code';

const AppointmentCheckoutModal = ({
  show,
  handleClose,
  handleCheckoutClose,
  checkoutId,
  appointmentDetail,
  hospitalName,
  vaccineName,
  price,
  dosesRequired,
}) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);
  const [totalPrice, setTotalPrice] = useState(price * dosesRequired);
  const dispatchToDB = useDispatch();
  const [qrValue, setQrValue] = useState('');
  const [showQR, setShowQR] = useState(false); // State to manage QR code visibility

  console.log('Appointment Detail:', appointmentDetail);

  useEffect(() => {
    if (!accessToken) {
      console.log('Waiting on access token');
      return;
    }
    // Fetch any necessary data here
  }, [dispatchToDB, accessToken]);

  const handleCheckout = () => {
    // Perform checkout actions here
    // Example: dispatch action to save appointment to DB

    dispatchToDB(SaveAppointmentToDB(appointmentDetail, accessToken));
    alert('Appointment submitted successfully!');
    handleAllClose(); // Close the checkout modal after checkout
  };

  const handleAllClose = () => {
    handleClose(); // Close the modal on close button click
    handleCheckoutClose(); // Ensure checkout modal is closed
  };

  const handleGenerateQR = () => {
    // Generate a random QR code value (could be an ID or any unique value)
    const randomValue = Math.random().toString(36).substring(7);
    setQrValue(randomValue);
    setShowQR(true); // Show the QR code after generating
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
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2>Order Summary</h2>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col">Hospital Name: </div>
                <div className="col">{hospitalName}</div>
              </div>
              <div className="row">
                <div className="col">Vaccine: </div>
                <div className="col">{vaccineName}</div>
              </div>
              <div className="row">
                <div className="col">Vaccine Price: </div>
                <div className="col">${price}</div>
              </div>
              <div className="row">
                <div className="col"># of Doses: </div>
                <div className="col">{dosesRequired}</div>
              </div>
              <div className="row">
                <div className="col">Total</div>
                <div className="col">${totalPrice.toFixed(2)}</div>
              </div>
            </li>
            <li className="list-group-item">
              {!showQR && (
                <Button
                  className="mt-3 w-100 btn"
                  onClick={handleGenerateQR}
                >
                  Generate QR Payment
                </Button>
              )}
              {showQR && (
                <div className="text-center mt-3">
                  Scan QR for Payment
                  <QRCode value={qrValue} />
                </div>
              )}
            </li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleAllClose}
        >
          Close
        </Button>

        <Button
          variant="primary"
          onClick={handleCheckout}
        >
          Payment Submitted
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentCheckoutModal;
