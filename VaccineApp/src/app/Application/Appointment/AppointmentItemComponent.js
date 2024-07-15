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
    <Card className="h-100 shadow-lg border-0 rounded">
      <Card.Img
        variant="top"
        src={picURL}
        height="200px"
        style={{
          objectFit: 'cover',
          borderTopLeftRadius: '0.25rem',
          borderTopRightRadius: '0.25rem',
        }}
      />
      <Card.Body className="d-flex flex-column align-items-center p-4">
        <div className="text-center mb-3">
          <Card.Title className="fs-4">{hospitalName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {vaccineName}
          </Card.Subtitle>
          <div className="text-muted mb-1">Doses Required: {dosesRequired}</div>
          <div className="text-muted mb-1">Price: ${price}</div>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="mt-auto"
        >
          Set Appointment
        </Button>

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
