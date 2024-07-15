import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Common/HomeComponent';
import Footer from './Common/FooterComponent';
import Header from './Common/HeaderComponent';
import NotFound from './Common/NotFoundComponent';

import Login from './Application/User/LoginComponent';
import Registration from './Application/User/RegistrationComponent';

import Vaccine from './Application/Vaccine/VaccineComponent';
import Hospital from './Application/Hospital/HospitalComponent';
import VaccineManagement from './Application/HospitalVaccine/HospitalVaccineComponent';
import MakeAppointment from './Application/Appointment/MakeAppointmentComponent';
import ApproveAppointment from './Application/AppointmentView/ApproveAppointmentComponent';
import UserAppointments from './Application/AppointmentView/UserAppointmentsComponent';
import Report from './Application/Report/ReportComponent';
import './app.css';

export default class ApplicationComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="app-container d-flex flex-column">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/home"
                element={<Home />}
              />

              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/registration"
                element={<Registration />}
              />
              <Route
                path="/hospital"
                element={<Hospital />}
              />
              <Route
                path="/vaccine"
                element={<Vaccine />}
              />
              <Route
                path="/management"
                element={<VaccineManagement />}
              />
              <Route
                path="/makeAppointment"
                element={<MakeAppointment />}
              />
              <Route
                path="/approveAppointment"
                element={<ApproveAppointment />}
              />
              <Route
                path="/userAppointment"
                element={<UserAppointments />}
              />
              <Route
                path="/report"
                element={<Report />}
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
