import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          // Redirect to login page if there's no token (user not logged in)
          history.push("/login");
          return;
        }

        const response = await axios.get("/api/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Handle error, show an alert, etc.
      }
    };

    fetchUserInfo();
  }, [history]);

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("accessToken");
    // Redirect to login page
    history.push("/login");
  };

  return (
    <Container>
      <h2>User Information</h2>
      {userInfo ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {/* Add more fields as needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userInfo.name}</td>
                <td>{userInfo.email}</td>
                {/* Display more fields as needed */}
              </tr>
            </tbody>
          </Table>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </Container>
  );
};

export default UserPage;
