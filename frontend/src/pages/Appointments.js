import React from 'react';
import '../styles/Appointments.css'; // Import the CSS file for styling
import CreateAppointment from "../Components/CreateAppointment";
import AppointmentList from "../Components/AppointmentList";

  const Appointments = () => {
    return (
      <div>
          {/* <CreateAppointment/> */}
          <AppointmentList/>
      </div> 
    );
  };
export default Appointments;
