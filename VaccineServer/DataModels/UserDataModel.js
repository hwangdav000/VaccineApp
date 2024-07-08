let mongooseObj = require('mongoose');
let schemaObj = mongooseObj.Schema;

mongooseObj.connect('mongodb://127.0.0.1/vaccineApp');

let userSchema = new schemaObj(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    fullName: String,
    address: String,
    mobile: Number,
    age: Number,
    gender: String,
    disease: String,
    profession: String,
    vaccinated: { type: Boolean, default: false },
  },
  {
    versionKey: false, // false - set to false then it won't create in MongoDB
  }
);

let UserModel = mongooseObj.model('user', userSchema);

module.exports = UserModel;
