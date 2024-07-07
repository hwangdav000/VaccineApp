import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './Common/HomeComponent';
import Footer from './Common/FooterComponent';
import Header from './Common/HeaderComponent';
import NotFound from './Common/NotFoundComponent';

import UserHook from './Application/User/UserHookComponent';
import Vaccine from './Application/Vaccine/VaccineComponent';
import Hospital from './Application/Hospital/HospitalComponent';
import VaccineManagement from './Application/HospitalVaccine/HospitalVaccineComponent';
import MakeAppointment from './Application/Appointment/MakeAppointmentComponent';
import ApproveAppointment from './Application/AppointmentView/ApproveAppointmentComponent';
import UserAppointments from './Application/AppointmentView/UserAppointmentsComponent';
export default class ApplicationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="home"
                element={<Home />}
              />
              <Route
                path="user"
                element={<UserHook />}
              />
              <Route
                path="hospital"
                element={<Hospital />}
              />
              <Route
                path="vaccine"
                element={<Vaccine />}
              />
              <Route
                path="management"
                element={<VaccineManagement />}
              />
              <Route
                path="makeAppointment"
                element={<MakeAppointment />}
              />
              <Route
                path="approveAppointment"
                element={<ApproveAppointment />}
              />
              <Route
                path="userAppointment"
                element={<UserAppointments />}
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}
