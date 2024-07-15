import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CountUp from 'react-countup';

const Home = () => {
  useEffect(() => {
    // Add animation class to each section when component mounts
    const sections = document.querySelectorAll('.animated-section');
    sections.forEach((section, index) => {
      if (index % 2 === 0) {
        section.classList.add('fadeInFromLeft');
      } else {
        section.classList.add('fadeInFromRight');
      }
    });
  }, []);

  const backgroundImg =
    'https://images.unsplash.com/photo-1512389055488-8d82cb26ba6c?q=80&w=1283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Rest of your content */}
      <section className="py-5 hero-section animated-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-4">Empowering Health Through Vaccination</h2>
              <p
                className="mb-4 "
                style={{ fontSize: 'large' }}
              >
                VaccineUP connects users with healthcare providers, enabling
                them to easily find and schedule vaccination appointments with
                trusted companies. Simplify your vaccination journey with
                VaccineUP.
              </p>
              <NavLink to="/registration">
                <Button
                  variant="primary"
                  size="lg"
                  style={{ marginBottom: '1rem' }}
                >
                  Get Started Today
                </Button>
              </NavLink>
            </Col>
            <Col
              md={6}
              className="text-center"
            >
              <img
                src="https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Healthcare Professionals"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-light-gray py-5 animated-section">
        <Container>
          <h2 className="text-center mb-4">Features</h2>
          <Row className="justify-content-center">
            <Col
              md={4}
              className="mb-4"
            >
              <Card className="h-100 shadow-lg border-0">
                <Card.Body className="d-flex flex-column align-items-center">
                  <i className="bi bi-journal-check h1 text-primary mb-3"></i>
                  <Card.Title className="text-center mb-3">
                    Manage Vaccination Records
                  </Card.Title>
                  <Card.Text className="text-center">
                    Easily store and access vaccination records for patients.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              md={4}
              className="mb-4"
            >
              <Card className="h-100 shadow-lg border-0">
                <Card.Body className="d-flex flex-column align-items-center">
                  <i className="bi bi-calendar-check h1 text-primary mb-3"></i>
                  <Card.Title className="text-center mb-3">
                    Schedule Appointments
                  </Card.Title>
                  <Card.Text className="text-center">
                    Seamlessly schedule vaccination appointments for patients.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              md={4}
              className="mb-4"
            >
              <Card className="h-100 shadow-lg border-0">
                <Card.Body className="d-flex flex-column align-items-center">
                  <i className="bi bi-geo-alt h1 text-primary mb-3"></i>
                  <Card.Title className="text-center mb-3">
                    Track Vaccine Distribution
                  </Card.Title>
                  <Card.Text className="text-center">
                    Monitor and manage vaccine distribution across locations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Fake Stats Section */}
      <section className="py-5 animated-section">
        <Container>
          <h2 className="text-center mb-4">Application Statistics</h2>
          <Row className="justify-content-center">
            <Col
              md={4}
              className="mb-4"
            >
              <Card className="h-100 shadow-lg border-0">
                <Card.Body className="d-flex flex-column align-items-center">
                  <i className="bi bi-people h1 text-primary mb-3"></i>
                  <Card.Title className="text-center mb-3">
                    Total Users
                  </Card.Title>
                  <Card.Text className="text-center">
                    <CountUp
                      end={10000}
                      duration={4}
                    />
                    +
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              md={4}
              className="mb-4"
            >
              <Card className="h-100 shadow-lg border-0">
                <Card.Body className="d-flex flex-column align-items-center">
                  <i className="bi bi-geo h1 text-primary mb-3"></i>
                  <Card.Title className="text-center mb-3">
                    Locations Covered
                  </Card.Title>
                  <Card.Text className="text-center">
                    <CountUp
                      end={50}
                      duration={4}
                    />
                    +
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              md={4}
              className="mb-4"
            >
              <Card className="h-100 shadow-lg border-0">
                <Card.Body className="d-flex flex-column align-items-center">
                  <i className="bi bi-bar-chart h1 text-primary mb-3"></i>
                  <Card.Title className="text-center mb-3">
                    Vaccinations Administered
                  </Card.Title>
                  <Card.Text className="text-center">
                    <CountUp
                      end={100000}
                      duration={4}
                    />
                    +
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
