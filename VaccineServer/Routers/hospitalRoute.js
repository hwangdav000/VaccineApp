let express = require('express');
let hospitalRouter = express.Router({});
const { authenticateToken } = require('../Authentication/authenticate');

let HospitalDataModel = require('../DataModels/HospitalDataModel');

hospitalRouter.post('/api/saveHospital', authenticateToken, (req, res) => {
  HospitalDataModel.findOne({ hospitalName: req.body.hospitalName })
    .then((existingHospital) => {
      if (existingHospital) {
        res.send(existingHospital);
      } else {
        let newHospital = new HospitalDataModel(req.body);

        newHospital
          .save()
          .then((newHospital) => {
            res.send(newHospital);
          })
          .catch((err1) => {
            console.log('err hospital', err1);
            res.send('error while creating hospital');
          });
      }
    })
    .catch((err) => {
      console.log('err sign in', err);
      res.send('error while searching user sign in');
    });
});

hospitalRouter.get('/api/getHospitals', authenticateToken, (req, res) => {
  HospitalDataModel.find()
    .then((allhospitals) => {
      res.send(allhospitals);
    })
    .catch(() => {
      res.send('error while fetching users');
    });
});

hospitalRouter.get('/api/getHospitalPicURL/:hospitalId', (req, res) => {
  const hospitalId = req.params.hospitalId;

  HospitalDataModel.findOne({ _id: hospitalId })
    .then((hospital) => {
      if (hospital) {
        res.send(hospital.picURL);
      } else {
        console.log('hospital not found');
        res.status(404).send('Hospital not found');
      }
    })
    .catch((err) => {
      console.log('err hospital id', err);
      res.status(500).send('Error while searching hospital id');
    });
});

module.exports = hospitalRouter;
