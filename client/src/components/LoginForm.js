import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post("/api/login", formData);
      console.log(response.data);
      if (response.data.success) {
        // Save JWT token to local storage
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        // Redirect to the user page or dashboard
        navigate("/user");
      } else {
        console.log(response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 ">
        <Col md={4}>
          <Card>
            <Card.Img
              style={{ height: "10rem" }}
              variant="top"
              src="https://img.freepik.com/free-vector/creative-waves-blue-background-dynamic-shapes-composition-vector-illustration_1142-14318.jpg?w=996&t=st=1713042316~exp=1713042916~hmac=3800ce02c4fb694ced7c691852dda6dfab4176780dc2fb092aef55bfd9f9836e"
            />
            <Card.Body className="d-flex flex-column align-items-center ">
              <h2 className="mb-3">Login Form</h2>
              <Form onSubmit={handleSubmit} className="d-grid gap-3 mt-2">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-1"
                >
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FloatingLabel>
                <div className="d-grid gap-1 mt-2">
                  <Button variant="primary" type="submit" size="lg">
                    Login
                  </Button>
                  <br />
                  <Link to="/" className="ml-3">
                    Don't have an account? Register
                  </Link>
                </div>
              </Form>
              <p style={{ color: "red" }}>{message}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
