import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);
      console.log(response.data.success);
      if (response.data.success) {
        setMessage("Registration successful!");
        // Save user information to local storage
        localStorage.setItem("userToken", JSON.stringify(response.data.token));

        // Redirect to the user page or dashboard
        navigate("/login");
      } else {
        console.log(response.data.message);
        setMessage(
          response.data.message + ", Try different username or emailID"
        );
      }
    } catch (error) {
      console.error(error);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={4}>
          <Card>
            <Card.Img
              style={{ height: "10rem" }}
              variant="top"
              src="https://img.freepik.com/free-vector/creative-waves-blue-background-dynamic-shapes-composition-vector-illustration_1142-14318.jpg?w=996&t=st=1713042316~exp=1713042916~hmac=3800ce02c4fb694ced7c691852dda6dfab4176780dc2fb092aef55bfd9f9836e"
            />
            <Card.Body className="d-flex flex-column align-items-center">
              <h2 className="mb-3">Registration Form</h2>
              <Form onSubmit={handleSubmit} className="d-grid gap-4 mt-2">
                <Form.Group controlId="name">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </Form.Group>
                <Form.Group controlId="dob">
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
                <Link to="/login" className="ml-3">
                  Already have an account? Login
                </Link>
              </Form>
              <p style={{ color: "red" }}>{message}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
