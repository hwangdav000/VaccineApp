import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'react-bootstrap';

const AppointmentViewItem = ({
  item,
  hVaccineDetail,
  handleApprove,
  handleReject,
}) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);

  const dispatchToDB = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      console.log('Access token not available');
      return;
    }
  }, [dispatchToDB, accessToken]);

  return (
    <tr>
      <td>{item._id}</td>
      <td>{item.userId}</td>
      <td>{item.hospitalVaccineId}</td>
      <td>{item.appointmentDate}</td>
      <td>{item.completeStatus}</td>
      <td>{item.approvalStatus}</td>

      <td>
        <Button
          onClick={() => {
            handleApprove(item._id);
          }}
          variant="info"
        >
          Approve
        </Button>
      </td>
      <td>
        <Button
          onClick={() => {
            handleReject(item._id);
          }}
          variant="info"
        >
          Reject
        </Button>
      </td>
    </tr>
  );
};

export default AppointmentViewItem;
