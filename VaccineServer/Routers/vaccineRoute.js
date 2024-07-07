let express = require('express');
let vaccineRouter = express.Router({}); //
const { authenticateToken } = require('../Authentication/authenticate');

let VaccineDataModel = require('../DataModels/VaccineDataModel');

vaccineRouter.post('/api/saveVaccine', authenticateToken, (req, res) => {
  VaccineDataModel.findOne({ vaccineName: req.body.vaccineName })
    .then((existingVaccine) => {
      if (existingVaccine) {
        res.send(existingVaccine);
      } else {
        let newVaccine = new VaccineDataModel(req.body);

        newVaccine
          .save()
          .then((newVaccine) => {
            res.send(newVaccine);
          })
          .catch((err1) => {
            console.log('err vaccine', err1);
            res.send('error while creating vaccine');
          });
      }
    })
    .catch((err) => {
      console.log('err sign in', err);
      res.send('error while searching user sign in');
    });
});

vaccineRouter.get('/api/getVaccines', authenticateToken, (req, res) => {
  VaccineDataModel.find()
    .then((allvaccines) => {
      res.send(allvaccines);
    })
    .catch(() => {
      res.send('error while fetching users');
    });
});

module.exports = vaccineRouter;
