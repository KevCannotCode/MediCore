import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';
import './PatientDashboard.css'; // Import CSS styles

function PatientDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patient/profile', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const result = await response.json();
      setUser(result.user);
    } catch (err) {
      handleError('Failed to fetch user details');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="dashboard-title">Patient Dashboard</h2>
        <ul className="sidebar-menu">
          <li onClick={() => navigate('/login')}>Logout</li>
        </ul>
      </aside>
      <main className="content">
        <div className="profile-section">
          <h3 className="section-title">Profile</h3>
          <div className="user-info">
            {user && (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default PatientDashboard;
