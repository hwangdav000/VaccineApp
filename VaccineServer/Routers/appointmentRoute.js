let express = require('express');
let appointmentRouter = express.Router({});
const { authenticateToken } = require('../Authentication/authenticate');
const { PDFDocument, rgb } = require('pdf-lib');
let AppointmentDataModel = require('../DataModels/AppointmentDataModel');

appointmentRouter.post(
  '/api/saveAppointment',
  authenticateToken,
  async (req, res) => {
    console.log(req.body);

    try {
      let newappointment = new AppointmentDataModel(req.body);
      let savedappointment = await newappointment.save();

      res.send(savedappointment);
    } catch (error) {
      console.error('Error while adding appointment:', error);
      res.status(500).send('Error while adding appointment');
    }
  }
);

appointmentRouter.get(
  '/api/getAppointments/:userId',
  authenticateToken,
  (req, res) => {
    const userId = req.params.userId;

    AppointmentDataModel.find({ userId: userId })
      .then((appointments) => {
        if (appointments) {
          res.send(appointments);
        } else {
          console.log('appointments not found');
        }
      })
      .catch((err) => {
        console.log('err appointment', err);
        res.send('error while getting appointments');
      });
  }
);

appointmentRouter.post(
  '/api/rejectAppointment/:appointmentId',
  authenticateToken,
  (req, res) => {
    const appointmentId = req.params.appointmentId;

    AppointmentDataModel.findOne({ _id: appointmentId })
      .then((existingappointment) => {
        existingappointment.approvalStatus = 'REJECTED';
        existingappointment
          .save()
          .then((updatedappointment) => {
            res.send(updatedappointment);
          })
          .catch((err) => {
            console.log('Error updating appointment status:', err);
            res.status(500).send('Error updating appointment status');
          });
      })
      .catch((err) => {
        console.log('Error finding appointment:', err);
        res.status(500).send('Error finding appointment');
      });
  }
);

appointmentRouter.post(
  '/api/approveAppointment/:appointmentId',
  authenticateToken,
  (req, res) => {
    const appointmentId = req.params.appointmentId;

    AppointmentDataModel.findOne({ _id: appointmentId })
      .then((existingappointment) => {
        existingappointment.approvalStatus = 'APPROVED';
        existingappointment
          .save()
          .then((updatedappointment) => {
            res.send(updatedappointment);
          })
          .catch((err) => {
            console.log('Error updating appointment status:', err);
            res.status(500).send('Error updating appointment status');
          });
      })
      .catch((err) => {
        console.log('Error finding appointment:', err);
        res.status(500).send('Error finding appointment');
      });
  }
);

appointmentRouter.post(
  '/api/completeAppointment/:appointmentId',
  authenticateToken,
  (req, res) => {
    const appointmentId = req.params.appointmentId;

    AppointmentDataModel.findOne({ _id: appointmentId })
      .then((existingappointment) => {
        existingappointment.completeStatus = 'COMPLETED';
        existingappointment
          .save()
          .then((updatedappointment) => {
            res.send(updatedappointment);
          })
          .catch((err) => {
            console.log('Error updating appointment status:', err);
            res.status(500).send('Error updating appointment status');
          });
      })
      .catch((err) => {
        console.log('Error finding appointment:', err);
        res.status(500).send('Error finding appointment');
      });
  }
);

appointmentRouter.get(
  '/api/getAllAppointments',
  authenticateToken,
  (req, res) => {
    AppointmentDataModel.find()
      .then((appointments) => {
        res.send(appointments);
      })
      .catch(() => {
        res.send('error while fetching users');
      });
  }
);

appointmentRouter.post(
  '/api/appointments/generateCertificate',
  async (req, res) => {
    console.log(req.body);
    const { appointmentId } = req.body.certificateDetails;
    console.log(appointmentId);
    try {
      // Fetch appointment data from MongoDB
      const appointment = await AppointmentDataModel.findOne({
        _id: appointmentId,
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // Generate PDF document using pdf-lib
      const pdfDoc = await generateCertificatePDF(req.body.certificateDetails);

      // Convert PDFDoc to buffer
      const pdfBytes = await pdfDoc.save();
      const pdfBuffer = Buffer.from(pdfBytes);

      // Save PDF buffer to appointment document in MongoDB
      appointment.certificate = pdfBuffer;
      await appointment.save();

      res
        .status(200)
        .json({ message: 'PDF certificate generated and saved successfully' });
    } catch (error) {
      console.error('Error generating PDF and saving to MongoDB:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

async function generateCertificatePDF(appointment) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]); // Define the page size
  const {
    userName,
    hospitalName,
    vaccineName,
    completeStatus,
    appointmentDate,
  } = appointment; // hospitalName, vaccineName,

  const { width, height } = page.getSize();
  const fontSize = 20;

  // Draw the title at the top
  page.drawText('Vaccination Certificate', {
    x: width / 2 - 90,
    y: height - 50,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Draw the appointment details
  page.drawText(`User Name: ${userName}`, {
    x: 50,
    y: height - 100,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Hospital: ${hospitalName}`, {
    x: 50,
    y: height - 150,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Vaccine: ${vaccineName}`, {
    x: 50,
    y: height - 200,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Complete Status: ${completeStatus}`, {
    x: 50,
    y: height - 250,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Appointment Date: ${appointmentDate}`, {
    x: 50,
    y: height - 300,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  return pdfDoc;
}

appointmentRouter.get('/api/appointments/certificate/:id', async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await AppointmentDataModel.findOne({
      _id: appointmentId,
    });
    if (!appointment || !appointment.certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=certificate.pdf'
    );
    res.send(appointment.certificate);
  } catch (error) {
    console.error('Error retrieving certificate from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = appointmentRouter;
