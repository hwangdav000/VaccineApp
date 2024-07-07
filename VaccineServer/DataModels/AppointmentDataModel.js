let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/vaccineApp');

let appointmentSchema = new schemaObj(
  {
    userId: {
      type: mongooseObj.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    hospitalVaccineId: {
      type: mongooseObj.Schema.Types.ObjectId,
      required: true,
      ref: 'hospitalVaccine',
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    approvalStatus: {
      type: String,
      default: 'IN APPROVAL',
    },
    completeStatus: {
      type: String,
      default: 'NOT COMPLETED',
    },
  },
  {
    versionKey: false,
  }
);

let appointmentModel = mongooseObj.model('appointment', appointmentSchema); //user - collection name, pluralised by mongodb

module.exports = appointmentModel;
