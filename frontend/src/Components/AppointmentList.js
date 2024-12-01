import React from 'react';
import '../styles/Appointments.css'; // Import the CSS file for styling

const appointmentsData = [
  { doctor: "Dr So and so", date: "11/12/2024 3-4pm", diagnosis: "Diabetes Diagnosis" },
  { doctor: "Dr So and so", date: "11/12/2024 3-4pm", diagnosis: "Diabetes Diagnosis" },
];

function AppointmentList(){
    return (
        <div className="appointments-container mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
    
          {/* Appointment Section */}
          <section className="appointments-section">
            <h1>Appointments</h1>
    
            <div className="appointment-group">
              <h2>Upcoming</h2>
              <div className="appointment-card">
                {appointmentsData.map((appointment, index) => (
                  <div className="appointment-item" key={index}>
                    <div className="appointment-details">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.date}</p>
                      <p>{appointment.diagnosis}</p>
                    </div>
                    <div className="appointment-actions">
                      <button className="edit-button">Edit</button>
                      <button className="cancel-button">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
            <div className="appointment-group">
              <h2>Past</h2>
              <div className="appointment-card">
                {appointmentsData.map((appointment, index) => (
                  <div className="appointment-item" key={index}>
                    <div className="appointment-details">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.date}</p>
                      <p>{appointment.diagnosis}</p>
                    </div>
                    <div className="appointment-actions">
                      <button className="edit-button">Edit</button>
                      <button className="cancel-button">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      );
  };

export default AppointmentList;
