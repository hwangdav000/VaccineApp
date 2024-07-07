let express = require('express');
let hospitalVaccineRouter = express.Router({});
const { authenticateToken } = require('../Authentication/authenticate');

let HospitalVaccineDataModel = require('../DataModels/HospitalVaccineDataModel');

hospitalVaccineRouter.post(
  '/api/saveHospitalVaccine',
  authenticateToken,
  async (req, res) => {
    try {
      const { hospitalId, vaccines } = req.body;

      const savedHospitalVaccines = await Promise.all(
        vaccines.map(async (vaccine) => {
          // Use findOneAndUpdate with await to ensure it completes before moving on
          return await HospitalVaccineDataModel.findOneAndUpdate(
            {
              hospitalId: hospitalId,
              vaccineId: vaccine.vaccineId,
            },
            {
              hospitalId: hospitalId,
              vaccineId: vaccine.vaccineId,
              vaccineName: vaccine.vaccineName,
              hospitalName: vaccine.hospitalName,
              price: vaccine.price,
              dosesRequired: vaccine.dosesRequired,
            },
            {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true,
            }
          );
        })
      );

      return res
        .status(200)
        .json({ message: 'Saved hospital vaccines', savedHospitalVaccines });
    } catch (err) {
      console.error('Error updating hospital vaccine:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

hospitalVaccineRouter.get(
  '/api/getHospitalVaccines/:hospitalId',
  authenticateToken,
  (req, res) => {
    const hospitalId = req.params.hospitalId;

    HospitalVaccineDataModel.find({ hospitalId: hospitalId })
      .then((hospitalVaccines) => {
        if (hospitalVaccines.length === 0) {
          res.status(204).send(); // No Content
        } else {
          res.status(200).send(hospitalVaccines); // OK with data
        }
      })
      .catch((err) => {
        res.status(500).send('Error while fetching hospital vaccines'); // Internal Server Error
      });
  }
);

hospitalVaccineRouter.get(
  '/api/getAllHospitalVaccines',
  authenticateToken,
  (req, res) => {
    HospitalVaccineDataModel.find()
      .then((allhospitalVaccines) => {
        res.send(allhospitalVaccines);
      })
      .catch(() => {
        res.send('error while fetching users');
      });
  }
);

module.exports = hospitalVaccineRouter;
