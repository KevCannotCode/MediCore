from fastapi import APIRouter
from app.models.appointment import Appointment

router = APIRouter()

@router.get("/appointments")
def get_appointments():
    return {"message": "Here are your appointments!"}