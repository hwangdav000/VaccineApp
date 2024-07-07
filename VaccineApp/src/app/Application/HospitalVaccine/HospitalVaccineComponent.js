import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GetHospitalsFromDB } from '../../../state/Hospital/hospitalAction';
import { GetVaccinesFromDB } from '../../../state/Vaccine/vaccineAction';
import {
  SaveHospitalVaccineToDB,
  GetHospitalVaccinesFromDB,
} from '../../../state/HospitalVaccine/hospitalVaccineAction';

const VaccineManagement = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const hospitalList = useSelector(
    (store) => store.hospitalReducer.hospitalList
  );
  const vaccinesList = useSelector((store) => store.vaccineReducer.vaccineList);
  const hospitalVaccineList = useSelector(
    (store) => store.hospitalVaccineReducer.hospitalVaccinesList
  );

  const dispatchToDB = useDispatch();

  const [selectedHospital, setSelectedHospital] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    vaccineId: '',
    price: '',
    dosesRequired: '',
  });

  useEffect(() => {
    dispatchToDB(GetHospitalsFromDB(accessToken));
    dispatchToDB(GetVaccinesFromDB(accessToken));
  }, [dispatchToDB, accessToken]);

  useEffect(() => {
    if (hospitalVaccineList && hospitalVaccineList.length > 0) {
      setVaccines(hospitalVaccineList);
    }
  }, [hospitalVaccineList]);

  const handleHospitalChange = (event) => {
    const hospitalId = event.target.value;
    setSelectedHospital(hospitalId);
    setVaccines([]);

    if (hospitalId) {
      dispatchToDB(GetHospitalVaccinesFromDB(hospitalId, accessToken));
    }
  };

  const handleAddVaccine = () => {
    setNewVaccine({
      vaccineId: '',
      price: '',
      dosesRequired: '',
    });

    setVaccines([...vaccines, { ...newVaccine }]);
  };

  const handleDeleteVaccine = (index) => {
    const updatedVaccines = [...vaccines];
    updatedVaccines.splice(index, 1);
    setVaccines(updatedVaccines);
  };

  const handleSaveChanges = () => {
    const newHospitalVaccineList = {
      hospitalId: selectedHospital,
      vaccines: vaccines,
    };

    dispatchToDB(SaveHospitalVaccineToDB(newHospitalVaccineList, accessToken));
  };

  return (
    <div className="container">
      <h2>Vaccine Management</h2>

      {/* Hospital Selector Dropdown */}
      <div className="mb-3">
        <label
          htmlFor="hospitalSelect"
          className="form-label"
        >
          Select Hospital:
        </label>
        <select
          className="form-select"
          id="hospitalSelect"
          value={selectedHospital}
          onChange={handleHospitalChange}
        >
          <option value="">Select Hospital</option>
          {hospitalList.map((hospital, index) => (
            <option
              key={index}
              value={hospital._id}
            >
              {hospital.hospitalName}
            </option>
          ))}
        </select>
      </div>

      {/* Vaccine Table */}
      {selectedHospital && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Vaccine</th>
              <th>Price</th>
              <th>Doses Required</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="form-select"
                    value={vaccine.vaccineId}
                    onChange={(e) => {
                      const selectedVaccineId = e.target.value;
                      const updatedVaccines = [...vaccines];
                      updatedVaccines[index].vaccineId = selectedVaccineId;
                      setVaccines(updatedVaccines);
                    }}
                  >
                    <option value="">Select Vaccine</option>
                    {vaccinesList.map((vaccineOption, idx) => (
                      <option
                        key={idx}
                        value={vaccineOption._id}
                      >
                        {vaccineOption.vaccineName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={vaccine.price}
                    onChange={(e) => {
                      const updatedVaccines = [...vaccines];
                      updatedVaccines[index].price = e.target.value;
                      setVaccines(updatedVaccines);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={vaccine.dosesRequired}
                    onChange={(e) => {
                      const updatedVaccines = [...vaccines];
                      updatedVaccines[index].dosesRequired = e.target.value;
                      setVaccines(updatedVaccines);
                    }}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteVaccine(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        {/* Add Vaccine Button */}
        {selectedHospital && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddVaccine}
            style={{ marginRight: '1rem' }}
          >
            Add Vaccine
          </button>
        )}

        {/* Save Button */}
        {selectedHospital && (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default VaccineManagement;
