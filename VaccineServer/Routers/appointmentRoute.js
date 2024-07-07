let express = require('express');
let appointmentRouter = express.Router({});
const { authenticateToken } = require('../Authentication/authenticate');

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

module.exports = appointmentRouter;
