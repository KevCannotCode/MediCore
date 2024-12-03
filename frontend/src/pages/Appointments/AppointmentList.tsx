import React, { useState, useEffect } from "react";
import { AppointmentEntry, columns } from "../../components/Appointments/columns"
import { DataTable } from "../../components/Appointments/data-table"

import '../../styles/Appointments.css';

const getAppointments = async (): Promise<AppointmentEntry[]> => {
    // Fetch data from your API here.
    let token = localStorage.getItem("token"); // Replace with your storage method if different
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7).toString();
    }

    const res = await fetch("http://localhost:8080/Appointments/getAllAppointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }), // Include JWT token in the Authorization header if it exists
      }
    });
    const data = await res.json();
    console.log(data.data);
    return data.data;

    // return [
    //   { id: "test-1", 
    //     doctor: "Dr. John Doe", 
    //     reason_for_appointment: "Checkup",
    //     treatment: "None",
    //     date: new Date(),
    //     allergies: "None",
    //     conditions: "None",
    //     medications: "None",
    //     immunizations: "None",
    //     procedures: "None"},
    //   { id: "test-2",
    //     doctor: "Dr. Jane Doe",
    //     reason_for_appointment: "Checkup",
    //     treatment: "None",
    //     date: new Date(),
    //     allergies: "None",
    //     conditions: "None",
    //     medications: "None",
    //     immunizations: "None",
    //     procedures: "None"},
    //     { id: "test-3",
    //     doctor: "Dr. Jane Doe",
    //     reason_for_appointment: "Checkup",
    //     treatment: "None",
    //     date: new Date(),
    //     allergies: "None",
    //     conditions: "None",
    //     medications: "None",
    //     immunizations: "None",
    //     procedures: "None"
    //     },
    //     { id: "test-1", 
    //       doctor: "Dr. John Doe", 
    //       reason_for_appointment: "Checkup",
    //       treatment: "None",
    //       date: new Date(),
    //       allergies: "None",
    //       conditions: "None",
    //       medications: "None",
    //       immunizations: "None",
    //       procedures: "None"},
    //     { id: "test-2",
    //       doctor: "Dr. Jane Doe",
    //       reason_for_appointment: "Checkup",
    //       treatment: "None",
    //       date: new Date(),
    //       allergies: "None",
    //       conditions: "None",
    //       medications: "None",
    //       immunizations: "None",
    //       procedures: "None"},
    //       { id: "test-3",
    //       doctor: "Dr. Jane Doe",
    //       reason_for_appointment: "Checkup",
    //       treatment: "None",
    //       date: new Date(),
    //       allergies: "None",
    //       conditions: "None",
    //       medications: "None",
    //       immunizations: "None",
    //       procedures: "None"
    //       },
    //       { id: "test-1", 
    //         doctor: "Dr. John Doe", 
    //         reason_for_appointment: "Checkup",
    //         treatment: "None",
    //         date: new Date(),
    //         allergies: "None",
    //         conditions: "None",
    //         medications: "None",
    //         immunizations: "None",
    //         procedures: "None"},
    //       { id: "test-2",
    //         doctor: "Dr. Jane Doe",
    //         reason_for_appointment: "Checkup",
    //         treatment: "None",
    //         date: new Date(),
    //         allergies: "None",
    //         conditions: "None",
    //         medications: "None",
    //         immunizations: "None",
    //         procedures: "None"},
    //         { id: "test-3",
    //         doctor: "Dr. Jane Doe",
    //         reason_for_appointment: "Checkup",
    //         treatment: "None",
    //         date: new Date(),
    //         allergies: "None",
    //         conditions: "None",
    //         medications: "None",
    //         immunizations: "None",
    //         procedures: "None"
    //         }
    //       ,
    //       { id: "test-1", 
    //         doctor: "Dr. John Doe", 
    //         reason_for_appointment: "Checkup",
    //         treatment: "None",
    //         date: new Date(),
    //         allergies: "None",
    //         conditions: "None",
    //         medications: "None",
    //         immunizations: "None",
    //         procedures: "None"},
    //       { id: "test-2",
    //         doctor: "Dr. Jane Doe",
    //         reason_for_appointment: "Checkup",
    //         treatment: "None",
    //         date: new Date(),
    //         allergies: "None",
    //         conditions: "None",
    //         medications: "None",
    //         immunizations: "None",
    //         procedures: "None"},
    //         { id: "test-3",
    //         doctor: "Dr. Jane Doe",
    //         reason_for_appointment: "Checkup",
    //         treatment: "None",
    //         date: new Date(),
    //         allergies: "None",
    //         conditions: "None",
    //         medications: "None",
    //         immunizations: "None",
    //         procedures: "None"
    //         }
    //   // Add more test data...
    // ];
  };

  const AppointmentList: React.FC = () => {
    const [data, setData] = useState<AppointmentEntry[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const appointments = await getAppointments();
        setData(appointments);
      };
      fetchData();
    }, []);

    // const handleSubmit = (updatedData: AppointmentEntry[]) => {
    //   console.log("Submitted data:", updatedData);
    //   // Perform API call to submit data here
    // };

  return (
    <section className="py-24" style={{maxHeight: "100vh", overflow: "auto"}} /* Add custom styles here */>
      <div className="flex-container">
      <h1 className="text-4xl font-bold">Appointments</h1>
      <div className="container mx-auto py-10 overflow-auto">
        <DataTable columns={columns} data={data} 
        // onSubmit={handleSubmit} 
        />
      </div>
      </div>
    </section>
  )
}

export default AppointmentList;