let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/vaccineApp');

const hospitalSchema = new schemaObj(
  {
    hospitalName: {
      type: String,
      required: [true, 'vaccine name is required'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    hospitalType: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    picURL: String,
  },
  {
    versionKey: false, // Set to false to prevent the creation of the __v field
  }
);

let hospitalModel = mongooseObj.model('hospital', hospitalSchema);

module.exports = hospitalModel;
