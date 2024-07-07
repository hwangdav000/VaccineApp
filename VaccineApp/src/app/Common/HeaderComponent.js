import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

let Header = (props) => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const user = useSelector((store) => store.userReducer.user);
  const usrName = user && user.userName ? user.userName : props.userName;

  console.log(user);

  const dispatchToDB = useDispatch();
  useEffect(() => {
    if (!accessToken) {
      console.log('waiting on access token');
      return;
    }
  }, [dispatchToDB, user._id]);

  const handleLogout = () => {
    // Dispatch a logout action here
    // Example: dispatch(logoutAction());
    console.log('User logged out');
  };

  return (
    <>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <NavLink
              to="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <h1>SynergisticIT</h1>
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink
                  to="/user"
                  className="nav-link px-2 text-secondary"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user"
                  className="nav-link px-2 text-white"
                >
                  User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hospital"
                  className="nav-link px-2 text-white"
                >
                  Hospital
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/vaccine"
                  className="nav-link px-2 text-white"
                >
                  Vaccine
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/management"
                  className="nav-link px-2 text-white"
                >
                  Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/makeAppointment"
                  className="nav-link px-2 text-white"
                >
                  Vaccinate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/approveAppointment"
                  className="nav-link px-2 text-white"
                >
                  Approval
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/userAppointment"
                  className="nav-link px-2 text-white"
                >
                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="nav-link px-2 text-white"
                >
                  About
                </NavLink>
              </li>
            </ul>

            <div className="text-end">
              {usrName ? (
                <>
                  <span>
                    Signed in as: <NavLink to="/user">{usrName}</NavLink>
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="btn btn-outline-light me-2"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="btn btn-warning"
                  >
                    Sign-up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
