"use client";
import '../../styles/Appointments.css';

import React, { useState } from "react";
import { Input } from "../../frontend-components/ui/input"; // ShadCN Input component

interface EditableCellProps {
  value: any;
  type?: string;
  onChange: (newValue: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ value, type = "text", onChange }) => {
  const [editingValue, setEditingValue] = useState(value);

  const handleBlur = () => {
    onChange(editingValue); // Notify parent of the updated value
  };

  return (
    <Input style={{ padding: "0.5rem" }}
      type={type}
      value={editingValue}
      onChange={(e) => setEditingValue(e.target.value)}
      onBlur={handleBlur}
      className="w-full"
    />
  );
};

export default EditableCell;
