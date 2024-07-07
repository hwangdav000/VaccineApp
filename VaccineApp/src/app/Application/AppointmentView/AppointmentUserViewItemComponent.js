import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CompleteAppointmentToDB,
  CreatePDFCertificateToDB,
  GetCertificateFromDB,
} from '../../../state/Appointment/appointmentAction';
import { Button } from 'react-bootstrap';

const AppointmentUserViewItem = ({
  item,
  hVaccineDetail,
  hospitalName,
  vaccineName,
}) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);
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
    if (currentDate >= appointmentDate && item.completeStatus != 'COMPLETED') {
      console.log(hVaccineDetail);
      // need to get hospital name and vaccine name -> can get from find
      let certificateDetails = {
        appointmentId: item._id,
        userName: user.userName,
        completeStatus: 'COMPLETED',
        appointmentDate: item.appointmentDate,
        hospitalName,
        vaccineName,
      };

      dispatchToDB(CompleteAppointmentToDB(item._id, accessToken));
      dispatchToDB(CreatePDFCertificateToDB(certificateDetails, accessToken));
    }

    // Format order date
    const formattedDate = appointmentDate.toLocaleDateString('en-GB'); // Adjust locale as needed
    setFormattedDate(formattedDate);
    setCompleteStatus(true);
  }, [dispatchToDB, accessToken]);

  const handleDownloadCertificate = () => {
    dispatchToDB(GetCertificateFromDB(item._id, accessToken));
  };

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
          <Button
            variant="primary"
            onClick={handleDownloadCertificate}
          >
            Certificate Download
          </Button>
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
