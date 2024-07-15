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
import { Tabs, Tab, Container } from 'react-bootstrap';

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

  const backgroundImg =
    'https://images.unsplash.com/photo-1670502394307-fd0781f280e5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <div
          className="p-4 hospital-container"
          style={{ maxWidth: '900px', width: '100%' }}
        >
          <h1 className="text-center">User Statistics</h1>
          <Tabs
            defaultActiveKey="group1"
            className="mb-3 justify-content-center"
          >
            <Tab
              eventKey="group1"
              title="User Charts"
            >
              <Carousel>
                <Carousel.Item>
                  <div className="mt-4">
                    <h2 className="text-center">Age Distribution</h2>
                    <Bar data={ageBarChart} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="mt-4">
                    <h2 className="text-center">Gender Distribution</h2>
                    <Pie data={genderPieChart} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="mt-4">
                    <h2 className="text-center">Profession Distribution</h2>
                    <Pie data={professionPieChart} />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Tab>
            <Tab
              eventKey="group2"
              title="Vaccine Charts"
            >
              <Carousel>
                <Carousel.Item>
                  <div className="mt-4">
                    <h2 className="text-center">Disease Distribution</h2>
                    <Pie data={diseasePieChart} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="mt-4">
                    <h2 className="text-center">Vaccinated Distribution</h2>
                    <Pie data={vaccinationPieChart} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="mt-4">
                    <h2 className="text-center">
                      Vaccinated Count Distribution
                    </h2>
                    <Bar data={vaccinationCountBarChart} />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default Report;
