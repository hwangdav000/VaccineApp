import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import AppointmentTimeModal from './AppointmentTimeModal';

const AppointmentItem = (props) => {
  const {
    _id,
    hospitalId,
    hospitalName,
    vaccineId,
    vaccineName,
    price,
    dosesRequired,
    picURL,
  } = props;
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const [showModal, setShowModal] = useState(false);

  const dispatchToDB = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }
  }, [dispatchToDB]);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={picURL}
        height="200px"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between mb-3 align-items-start">
          <div>
            <span className="fs-2">{hospitalName}</span>
            <br></br>
            <span className="text-muted">vaccineId: {vaccineName}</span>{' '}
            <br></br>
            <span className="text-muted">Price: ${price}</span>
            <br></br>
            <span className="text-muted">Doses Required: {dosesRequired}</span>
            <br></br>
          </div>
        </div>
        <div className="text-center mt-auto">
          <Button onClick={() => setShowModal(true)}>Set Appointment</Button>
        </div>

        {showModal && (
          <AppointmentTimeModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            checkoutId={_id}
            hospitalName={hospitalName}
            vaccineName={vaccineName}
            price={price}
            dosesRequired={dosesRequired}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default AppointmentItem;
