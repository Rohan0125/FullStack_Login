import React, { useEffect } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jsonwebtoken";
const UserPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const userInfo = {
    name: "rohan",
    email: "r@r.com",
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          // Redirect to login page if there's no token (user not logged in)
          navigate("/login");
          return;
        }
        // Decode the token to get expiration date
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

        if (decodedToken.exp < currentTime) {
          // Token is expired, redirect to login page
          navigate("/login");
          return;
        }

        // Fetch user information from the backend API
        const response = await axios.get("/api/userInfo", {
          headers: {
            Authorization: token,
          },
        });
        // setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Handle error, show an alert, etc.
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <Container
      style={{
        textAlign: "center",
      }}
    >
      <h2>User playlist</h2>
      <>
        <Row className="m-5">
          <Col>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/QqPebsdEQnY?si=EVY6Kh4OKMfUPeqW"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </Col>
          <Col>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/4fQeaM62mOY?si=Kn_czHHJa2V3fzAD"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </Col>
        </Row>

        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </>
    </Container>
  );
};

export default UserPage;
