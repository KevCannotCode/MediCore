from fastapi import APIRouter
from app.models.medical_record import MedicalRecord

router = APIRouter()

@router.get("/medical-records")
def get_medical_records():
    return {"message": "Here are your medical records!"}