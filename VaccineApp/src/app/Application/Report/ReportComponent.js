import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { Bar, Pie } from 'react-chartjs-2';
import { GetHospitalsFromDB } from '../../../state/Hospital/hospitalAction';
import { GetVaccinesFromDB } from '../../../state/Vaccine/vaccineAction';
import { GetAllHospitalVaccinesFromDB } from '../../../state/HospitalVaccine/hospitalVaccineAction';
import { GetUsersFromDB } from '../../../state/User/userAction';
import { GetAllAppointmentsFromDB } from '../../../state/Appointment/appointmentAction';

import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Report = () => {
  const accessToken = useSelector((store) => store.tokenReducer.accessToken);
  const userList = useSelector((store) => store.userReducer.userList);
  const hospitalList = useSelector(
    (store) => store.hospitalReducer.hospitalList
  );
  const vaccinesList = useSelector((store) => store.vaccineReducer.vaccineList);
  const hospitalVaccineList = useSelector(
    (store) => store.hospitalVaccineReducer.hospitalVaccinesList
  );
  const appointmentsList = useSelector(
    (store) => store.appointmentReducer.appointmentsList
  );

  const [ageBarChart, setAgeBarChart] = useState({});
  const [genderPieChart, setGenderPieChart] = useState({});
  const [diseasePieChart, setDiseasePieChart] = useState({});
  const [professionPieChart, setProfessionPieChart] = useState({});
  const [vaccinationPieChart, setVaccinationPieChart] = useState({});
  const [vaccinationCountBarChart, setVaccinationCountBarChart] = useState({});

  const [loading, setLoading] = useState(true); // wait for values to be initialized
  const dispatchToDB = useDispatch();

  useEffect(() => {
    dispatchToDB(GetHospitalsFromDB(accessToken));
    dispatchToDB(GetVaccinesFromDB(accessToken));
    dispatchToDB(GetAllHospitalVaccinesFromDB(accessToken));
    dispatchToDB(GetUsersFromDB(accessToken));
    dispatchToDB(GetAllAppointmentsFromDB(accessToken));
  }, [dispatchToDB, accessToken]);

  useEffect(() => {
    if (userList.length !== 0) {
      const ageData = {};
      const genderData = {};
      const diseaseData = {};
      const professionData = {};
      const vaccinatedData = {};

      const filteredUserList = userList.filter(
        (user) => user.userName !== 'ADMIN'
      );

      filteredUserList.forEach((user) => {
        // Age data
        if (ageData[user.age]) {
          ageData[user.age]++;
        } else {
          ageData[user.age] = 1;
        }

        // Gender data
        if (genderData[user.gender]) {
          genderData[user.gender]++;
        } else {
          genderData[user.gender] = 1;
        }

        // Disease data
        if (diseaseData[user.disease]) {
          diseaseData[user.disease]++;
        } else {
          diseaseData[user.disease] = 1;
        }

        // Profession data
        if (professionData[user.profession]) {
          professionData[user.profession]++;
        } else {
          professionData[user.profession] = 1;
        }

        // vaccinated data
        if (vaccinatedData[user.vaccinated]) {
          vaccinatedData[user.vaccinated]++;
        } else {
          vaccinatedData[user.vaccinated] = 1;
        }
      });

      setAgeBarChart({
        labels: Object.keys(ageData),
        datasets: [
          {
            label: 'Age Distribution',
            data: Object.values(ageData),
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      setGenderPieChart({
        labels: Object.keys(genderData),
        datasets: [
          {
            label: 'Gender Distribution',
            data: Object.values(genderData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      setDiseasePieChart({
        labels: Object.keys(diseaseData),
        datasets: [
          {
            label: 'Disease Count',
            data: Object.values(diseaseData),
            backgroundColor: [
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      setProfessionPieChart({
        labels: Object.keys(professionData),
        datasets: [
          {
            label: 'Profession Distribution',
            data: Object.values(professionData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      setVaccinationPieChart({
        labels: Object.keys(vaccinatedData),
        datasets: [
          {
            label: 'Vaccination Distribution',
            data: Object.values(vaccinatedData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      });

      // set appointments before the current date
      // Filter appointments before the current date
      // Generate past 7 days dates
      const today = new Date();
      const past7Days = [];
      const vaccinatedCountData = {};

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        past7Days.push(date.toISOString().split('T')[0]);
        vaccinatedCountData[date.toISOString().split('T')[0]] = 0;
      }
      console.log('looking at appointments list');
      appointmentsList.forEach((appointment) => {
        const aDate = appointment.appointmentDate.split('T')[0];
        console.log('Date ', aDate);
        // Check if aDate is in past7Days array
        if (
          past7Days.includes(aDate) &&
          appointment.completeStatus == 'COMPLETED'
        ) {
          // Increment count or update data as needed
          if (vaccinatedCountData[aDate]) {
            vaccinatedCountData[aDate]++;
          } else {
            vaccinatedCountData[aDate] = 1;
          }
        }
      });

      setVaccinationCountBarChart({
        labels: Object.keys(vaccinatedCountData).reverse(),
        datasets: [
          {
            label: 'Vaccination Count Distribution',
            data: Object.values(vaccinatedCountData).reverse(),
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      setLoading(false); // Set loading state to false once data is populated
    }
  }, [
    userList,
    vaccinesList,
    hospitalList,
    hospitalVaccineList,
    appointmentsList,
  ]);

  if (loading) {
    return <p>Loading...</p>; // Optionally show a loading indicator
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <div
            style={{
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
              marginBottom: '150px',
            }}
          >
            <Bar data={ageBarChart} />
          </div>
          <Carousel.Caption>
            <h5>Age Bar Chart</h5>
            <p>Statistics of Users</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
              marginBottom: '150px',
            }}
          >
            <Pie data={genderPieChart} />
          </div>
          <Carousel.Caption>
            <h5>Gender Pie Chart</h5>
            <p>Distribution among Users</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            style={{
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
              marginBottom: '150px',
            }}
          >
            <Pie data={diseasePieChart} />
          </div>
          <Carousel.Caption>
            <h5>Disease Pie Chart</h5>
            <p>Distribution of Disease amongst Users</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            style={{
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
              marginBottom: '150px',
            }}
          >
            <Pie data={professionPieChart} />
          </div>
          <Carousel.Caption>
            <h5>Profession Pie Chart</h5>
            <p>Distribution of Profession amongst Users</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            style={{
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
              marginBottom: '150px',
            }}
          >
            <Pie data={vaccinationPieChart} />
          </div>
          <Carousel.Caption>
            <h5>Vaccinated Pie Chart</h5>
            <p>Distribution of Vaccinated Users</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            style={{
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '100px',
              marginBottom: '150px',
            }}
          >
            <Bar data={vaccinationCountBarChart} />
          </div>
          <Carousel.Caption>
            <h5>Vaccination Count Chart</h5>
            <p>Statistics of last 7 days</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Report;
