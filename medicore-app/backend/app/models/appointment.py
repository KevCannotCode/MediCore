from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Appointment(BaseModel):
    appointment_id: str
    doctor_id: str
    patient_id: str
    date: datetime
    reason: Optional[str] = None