import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { LogoutUser } from '../../state/User/userAction';
import star from '../images/half-star-dodger.png';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);
  const usrName = user && user.userName ? user.userName : props.userName;

  const dispatchToDB = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch a logout action here
    dispatchToDB(LogoutUser());
    navigate('/home');
  };

  return (
    <>
      <header className="p-3 bg-dark text-white shadow-sm">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <NavLink
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <img
                src="/assets/images/half-star-dodger.png"
                alt="VaccineUP"
                width="40"
                height="40"
                className="me-2"
              />
              <h1 className="h4 mb-0">VaccineUP</h1>
            </NavLink>

            <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
              {usrName ? (
                <>
                  {usrName === 'ADMIN' && (
                    <>
                      <div className="btn-group">
                        <li className="col-auto">
                          <NavLink
                            to="/hospital"
                            className="btn btn-outline-light me-2"
                          >
                            <i className="bi bi-building me-1"></i> Hospital
                          </NavLink>
                        </li>
                        <li className="col-auto">
                          <NavLink
                            to="/vaccine"
                            className="btn btn-outline-light me-2"
                          >
                            <i className="bi bi-capsule me-1"></i> Vaccine
                          </NavLink>
                        </li>
                        <li className="col-auto">
                          <NavLink
                            to="/management"
                            className="btn btn-outline-light me-2"
                          >
                            <i className="bi bi-clipboard-check me-1"></i>{' '}
                            Management
                          </NavLink>
                        </li>
                        <li className="col-auto">
                          <NavLink
                            to="/approveAppointment"
                            className="btn btn-outline-light me-2"
                          >
                            <i className="bi bi-clipboard-check-fill me-1"></i>{' '}
                            Approval
                          </NavLink>
                        </li>
                        <li className="col-auto">
                          <NavLink
                            to="/report"
                            className="btn btn-outline-light me-2"
                          >
                            <i className="bi bi-file-earmark-text me-1"></i>{' '}
                            Report
                          </NavLink>
                        </li>
                      </div>
                    </>
                  )}
                  {usrName !== '' && usrName !== 'ADMIN' && (
                    <>
                      <div className="btn-group">
                        <li className="col-auto">
                          <NavLink
                            to="/makeAppointment"
                            className="btn btn-outline-light me-2"
                          >
                            <i className="bi bi-calendar-check me-1"></i>{' '}
                            Vaccinate
                          </NavLink>
                        </li>
                        <li className="col-auto">
                          <NavLink
                            to="/userAppointment"
                            className="btn btn-outline-light me-2"
                          >
                            <i className="bi bi-journal-check me-1"></i>{' '}
                            Appointments
                          </NavLink>
                        </li>
                      </div>
                    </>
                  )}
                </>
              ) : null}
            </ul>

            <div className="text-end">
              {usrName ? (
                <>
                  <span className="me-3">
                    Signed in as:{' '}
                    <NavLink
                      to="/login"
                      className="text-white"
                    >
                      {usrName}
                    </NavLink>
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/registration"
                    className="btn btn-outline-light me-2"
                  >
                    <i className="bi bi-layout-text-sidebar"></i> Get Started
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btn btn-outline-light me-2"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </NavLink>
                </>
              )}
            </div>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <a className="text-white me-2">
                  <i className="bi bi-facebook"></i>
                </a>
                <a className="text-white me-2">
                  <i className="bi bi-twitter"></i>
                </a>
                <a className="text-white">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
