from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class MedicalRecord(BaseModel):
    patient_id: str
    doctor_id: str
    visit_date: datetime
    diagnosis: Optional[str]
    treatments: List[str]
    medications: List[str]
    allergies: Optional[List[str]]
    vital_signs: dict
    lab_results: List[dict]
    imaging: Optional[List[dict]]
    prescriptions: List[dict]
    billing: dict
    consent_signed: bool