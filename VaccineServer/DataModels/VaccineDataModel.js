let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/vaccineApp');

const vaccineSchema = new schemaObj(
  {
    vaccineName: {
      type: String,
      required: [true, 'vaccine name is required'],
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    sideEffects: {
      type: String,
    },
    strainCoverage: {
      type: String,
    },
    basePrice: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    origin: {
      type: String,
      trim: true,
    },
    baseDosesReq: {
      type: Number,
      required: [true, 'Doses is required'],
      min: [0, 'Dose cannot be negative'],
    },
  },
  {
    versionKey: false, // Set to false to prevent the creation of the __v field
  }
);

let vaccineModel = mongooseObj.model('vaccine', vaccineSchema);

module.exports = vaccineModel;
