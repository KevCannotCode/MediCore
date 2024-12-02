"use client"

import '../../styles/Appointments.css';

import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "../../frontend-components/ui/button"

import { Input } from "../../frontend-components/ui/input"; // Import ShadCN Input

import EditableCell from "./EditableCell";

import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../frontend-components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AppointmentEntry = {
  _id: string
  date: Date
  reason_for_appointment: string,
  treatment: string,
  notes: string,
  allergies: string,
  conditions: string,
  medications: string,
  immunizations: string,
  procedures: string,
  doctorName: string,
  patientName: string,
}

export const columns: ColumnDef<AppointmentEntry>[] = [
  {
    accessorKey: "_id",
    header: "Appointment ID",
  },
  {
    accessorKey: "patientName",
    header: "Patient",
    // cell: ({ row }) => <EditableCell value={row.original.patient} onChange={(val) => (row.original.patient = val)} />,
  },
  {
    accessorKey: "doctorName",
    header: "Doctor",
    // cell: ({ row }) => <EditableCell value={row.original.doctor} onChange={(val) => (row.original.doctor = val)} />,
  },
  {
    accessorKey: "reason_for_appointment",
    header: "Reason for Appointment",
    // cell: ({ row }) => <EditableCell value={row.original.reason_for_appointment} onChange={(val) => (row.original.reason_for_appointment = val)} />,
  },
  // {
  //   accessorKey: "treatment",
  //   header: "Treatment",
  //   cell: ({ row }) => <EditableCell value={row.original.treatment} onChange={(val) => (row.original.treatment = val)} />,
  // },
  {
    accessorKey: "date",
    header: "Date",
    // cell: ({ row }) => (
    //   <EditableCell
    //     type="date"
    //     value={row.original.date}
    //     onChange={(val) => (row.original.date = new Date(val))}
    //   />
    // ),
  },
  // {
  //   accessorKey: "allergies",
  //   header: "Allergies",
  //   cell: ({ row }) => <EditableCell value={row.original.allergies} onChange={(val) => (row.original.allergies = val)} />,
  // },
  // {
  //   accessorKey: "conditions",
  //   header: "Conditions",
  //   cell: ({ row }) => <EditableCell value={row.original.conditions} onChange={(val) => (row.original.conditions = val)} />,
  // },
  // {
  //   accessorKey: "medications",
  //   header: "Medications",
  //   cell: ({ row }) => <EditableCell value={row.original.medications} onChange={(val) => (row.original.medications = val)} />,
  // },
  // {
  //   accessorKey: "immunizations",
  //   header: "Immunizations",
  //   cell: ({ row }) => <EditableCell value={row.original.immunizations} onChange={(val) => (row.original.immunizations = val)} />,
  // },
  // {
  //   accessorKey: "procedures",
  //   header: "Procedures",
  //   cell: ({ row }) => <EditableCell value={row.original.procedures} onChange={(val) => (row.original.procedures = val)} />,
  // },
  {
    header: "Edit",
    id: "edit",
    cell: ({ row }) => {
      // Use the wrapper component for navigation
      return <EditButton id={row.original._id} />;
    },
  },
];

// A reusable wrapper component for navigation
const EditButton: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Role check.
    let token = localStorage.getItem("token"); // Replace with your storage method if different
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7).toString();
    }

    const res = await fetch("http://localhost:8080/auth/verifyDoctor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }), // Include JWT token in the Authorization header if it exists
      }
    });
    const response = await res.json();
    console.log(response.message);

    if (response.message === "User is a doctor") {
      navigate(`/doctorUpdateAppointment/${id}`); // Corrected URL
    } else {
      navigate(`/modifyAppointment/${id}`); // Corrected URL
    }
  };

  return (
    <Button onClick={handleSubmit} className="bg-blue-500 text-white">
      More
    </Button>
  );
};
