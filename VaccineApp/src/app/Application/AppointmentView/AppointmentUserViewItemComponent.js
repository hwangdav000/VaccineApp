import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteAppointmentToDB } from '../../../state/Appointment/appointmentAction';
import { Button } from 'react-bootstrap';

const AppointmentUserViewItem = ({ item, hVaccineDetail }) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const [formattedDate, setFormattedDate] = useState('');
  const [completeStatus, setCompleteStatus] = useState(false);
  const dispatchToDB = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      console.log('Access token not available');
      return;
    }
    const appointmentDate = new Date(item.appointmentDate);
    const currentDate = new Date();

    // Check if the current date is greater than or equal to the order date
    if (currentDate >= appointmentDate) {
      if (
        (item.approvalStatus !== ' IN APPROVAL' ||
          item.approvalStatus !== ' REJECTED') &&
        item.completeStatus !== 'COMPLETED'
      ) {
        dispatchToDB(CompleteAppointmentToDB(item._id, accessToken));
      }
    }

    // Format order date
    const formattedDate = appointmentDate.toLocaleDateString('en-GB'); // Adjust locale as needed
    setFormattedDate(formattedDate);
    setCompleteStatus(true);
  }, [dispatchToDB, accessToken]);

  return (
    <tr>
      <td>{item._id}</td>
      <td>{item.userId}</td>
      <td>{item.hospitalVaccineId}</td>
      <td>{formattedDate}</td>
      <td>{item.approvalStatus}</td>
      <td>{item.completeStatus}</td>
      <td>
        {item.completeStatus === 'COMPLETED' ? (
          <Button variant="primary">Certificate Download</Button>
        ) : (
          <Button
            variant="primary"
            disabled
          >
            Certificate Download
          </Button>
        )}
      </td>
    </tr>
  );
};

export default AppointmentUserViewItem;
