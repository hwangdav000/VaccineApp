const express = require('express'); //express class constructor
const app = express(); //invoking the class to create express app server

const port = 9000;
const cors = require('cors');

const userRouter = require('./Routers/userRoute');
const appointmentRouter = require('./Routers/appointmentRoute');
const hospitalRouter = require('./Routers/hospitalRoute');
const hospitalVaccineRouter = require('./Routers/hospitalVaccineRoute');
const vaccineRouter = require('./Routers/vaccineRoute');
const defaultRouter = require('./Routers/defaultRoute');

global.rootDir = __dirname;

//we can have one main and multiple other express apps at a place
const userApp = express();
const hospitalApp = express();
const hospitalVaccineApp = express();
const vaccineApp = express();
const appointmentApp = express();

app.use(cors());

//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware
app.use('/static', express.static('public')); //localhost:9000/static/alert.js

//json middle-ware for setting request content type to json in body
app.use(express.json({ limit: '2mb', extended: false }));

//api path signinup => localhost:9000/user/api/signinup
app.use('/user', userApp);
userApp.use(userRouter);

app.use('/hospital', hospitalApp);
hospitalApp.use(hospitalRouter);

app.use('/hospitalVaccine', hospitalVaccineApp);
hospitalVaccineApp.use(hospitalVaccineRouter);

app.use('/vaccine', vaccineApp);
vaccineApp.use(vaccineRouter);

app.use('/appointment', appointmentApp);
appointmentApp.use(appointmentRouter);

app.use('/', defaultRouter);

app.listen(port);

console.log('api launched at - localhost:' + port);
