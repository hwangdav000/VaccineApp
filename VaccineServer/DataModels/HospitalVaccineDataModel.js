let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/vaccineApp');

const hospitalVaccineSchema = new schemaObj(
  {
    hospitalId: {
      type: mongooseObj.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    hospitalName: String,
    vaccineId: {
      type: mongooseObj.Schema.Types.ObjectId,
      ref: 'Vaccine',
      required: true,
    },
    vaccineName: String,
    price: Number,
    dosesRequired: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    versionKey: false, // Set to false to prevent the creation of the __v field
  }
);

let hospitalVaccineModel = mongooseObj.model(
  'hospitalVaccine',
  hospitalVaccineSchema
);

module.exports = hospitalVaccineModel;
