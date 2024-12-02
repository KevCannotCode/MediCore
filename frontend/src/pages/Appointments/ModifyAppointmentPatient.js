import React, { useState, useEffect } from "react";
import "../../styles/appointment_styles.css"; // Add your styles here if needed
// import { all } from "../../../backend/Routes/AppointmentRouter";

const ModifyAppointment = () => {
  const [formData, setFormData] = useState({
    _id: "",
    time: "",
    doctorEmail: "",
    patientEmail: "",
    message: "",
    treatment: "",
    notes: "",
    allergies: "",
    conditions: "",
    medications: "",
    immunizations: "",
    procedures: "",
    medicalRecord: ""
  });

    // Extract appointmentId from the URL
    const getAppointmentIdFromUrl = () => {
      const pathname = window.location.pathname;
      const segments = pathname.split("/");
      const id = segments[segments.length - 1];
    
      // Validate the ID (optional)
      if (!id || id.length !== 24) { // Example: Check if ID is 24 characters long
        console.error("Invalid appointment ID:", id);
        return null;
      }
    
      return id;
    };

  // Fetch the appointment details
  const getAppointments = async () => {
    const appointmentId = getAppointmentIdFromUrl();

      if (!appointmentId) {
        alert("No appointment ID found in URL!");
        return;
      }
    
    try {
      const response = await fetch("http://localhost:8080/Appointments/getOneAppointment/"+ appointmentId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle non-200 responses
        const errorText = await response.text(); // Get error response as plain text
        console.error("Server error:", errorText);
        alert(`Error: ${response.status} - ${errorText}`);
        return;
      }

      const result = await response.json();
      const data = result.data[0];

      // Convert the date to the expected format for `datetime-local`
      const convertToDatetimeLocalFormat = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return offsetDate.toISOString().slice(0, 16); // `YYYY-MM-DDTHH:MM`
      };

      // Assuming result contains appointment details
      // Update formData state with the fetched data
      setFormData((prevData) => ({
        ...prevData,
        _id: data._id || "",
        doctorEmail: data.doctorEmail || "",
        patientEmail: data.patientEmail || "",
        time: convertToDatetimeLocalFormat(data.date) || "",
        reason_for_appointment: data.reason_for_appointment || "",
        treatment: data.treatment || "",
        notes: data.notes || "",
        allergies: data.allergies || "",
        conditions: data.conditions || "",
        medications: data.medications || "",
        immunizations: data.immunizations || "",
        procedures: data.procedures || ""
      }));
    } catch (error) {
      console.error("Error fetching appointment details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch appointment details when the component mounts
    getAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve JWT token from storage (e.g., localStorage)
    let token = localStorage.getItem("token"); // Replace with your storage method if different
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    try {
      const response = await fetch("http://localhost:8080/Appointments/patientUpdate/"+ formData._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Include JWT token in the Authorization header
        },
        body: JSON.stringify({
          doctorEmail: formData.doctorEmail,
          date: formData.time,
          reason_for_appointment: formData.reason_for_appointment
        }),
      });
  
      if (!response.ok) {
        // Handle non-200 responses
        const errorText = await response.text(); // Get error response as plain text
        console.error("Server error:", errorText);
        alert(`Error: ${response.status} - ${errorText}`);
        return;
      }
  
      const result = await response.json();
      alert(result[0].message); // Show success message
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
      <form 
    onSubmit={handleSubmit} 
    className="form-card"
    style={{maxHeight: "100vh", maxWidth: "100vh" , overflow: "auto"}} /* Add custom styles here */
  > 
    <div>
      <h2>Modify Your Appointment</h2>
      <text>Feel setup an appointment with your primary care provider!</text>
    </div>

    <div 
      className="form-group" /* Add custom styles here */
    >
      <label htmlFor="email">Doctor Email:</label>
      <input
        type="email"
        id="doctorEmail"
        name="doctorEmail"
        value={formData.doctorEmail}
        onChange={handleChange}
        className="form-input" /* Using className for styling the input field */
      />
    </div>
    
    <div 
      className="form-group"
    >
      <label htmlFor="email">Patient Email:</label>
      <input style={{backgroundColor: "grey"}}
        type="email"
        id="patientEmail"
        name="patientEmail"
        value={formData.patientEmail}
        onChange={handleChange}
        readOnly /* Prevent editing the patient's email */
        className="form-input" /* Using className for styling the input field */
      />
    </div>

    <div 
      className="form-group"
    >
      <label htmlFor="time">Date:</label>
      <input 
        type="datetime-local"
        id="time"
        name="time"
        min="2024-25-07T00:00"
        max="2030-12-14T00:00"
        value={formData.time}
        onChange={handleChange}
        className="form-input" /* Same styling for this input */
      />
    </div>

    <div 
      className="form-group"
    >
      <label htmlFor="reason_for_appointment">Reason For Appointment:</label>
      <textarea 
        id="reason_for_appointment"
        name="reason_for_appointment"
        value={formData.reason_for_appointment}
        onChange={handleChange}
        className="form-input" /* Reusing the form-input class for consistency */
      />
    </div>


    <div className="form-group">
      <label htmlFor="treatment">Treatment:</label>
      <textarea style={{backgroundColor: "grey"}}
        type="text"
        id="treatment"
        name="treatment"
        value={formData.treatment}
        onChange={handleChange}
        readOnly /* Prevent editing the procedures */
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="notes">Notes:</label>
      <textarea style={{backgroundColor: "grey"}}
        type="text"
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="form-input"
        readOnly /* Prevent editing the procedures */
      />
    </div>

    <div className="form-group">
      <label htmlFor="allergies">Allergies:</label>
      <textarea style={{backgroundColor: "grey"}}
        type="text"
        id="allergies"
        name="allergies"
        value={formData.allergies}
        onChange={handleChange}
        readOnly /* Prevent editing the procedures */
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="conditions">Conditions:</label>
      <textarea style={{backgroundColor: "grey"}}
        type="text"
        id="conditions"
        name="conditions"
        value={formData.conditions}
        onChange={handleChange}
        className="form-input"
        readOnly /* Prevent editing the procedures */
      />
    </div>

    <div className="form-group"> 
      <label htmlFor="medications">Medications:</label>
      <textarea style={{backgroundColor: "grey"}}
        type="text"
        id="medications"
        name="medications"
        value={formData.medications}
        onChange={handleChange}
        className="form-input"
        readOnly /* Prevent editing the procedures */
      />
    </div>

    <div className="form-group">
      <label htmlFor="immunizations">Immunizations:</label>
      <textarea style={{backgroundColor: "grey"}}
        type="text"
        id="immunizations"
        name="immunizations"
        value={formData.immunizations}
        onChange={handleChange}
        readOnly /* Prevent editing the procedures */
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="procedures">Procedures:</label>
      <textarea style={{backgroundColor: "grey"}}
        type="text"
        id="procedures"
        name="procedures"
        value={formData.procedures}
        onChange={handleChange}
        readOnly /* Prevent editing the procedures */
        className="form-input"
      />
    </div>

    <button 
      type="submit"
      className="submit-button" /* Unique class for styling the submit button */
    >
      Modify Appointment
    </button>
  </form>
  );
};

export default ModifyAppointment;
