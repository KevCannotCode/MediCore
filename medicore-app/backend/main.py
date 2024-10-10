import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from app.controllers.appointment_controller import router as appointment_router
from app.controllers.account_controller import router as account_controller
from app.controllers.medical_record_controller import router as medical_record
from app.controllers.note_controller import router as notes

app = FastAPI()

# Include the router from the appointment controller
app.include_router(appointment_router)
app.include_router(account_controller)
app.include_router(medical_record)
app.include_router(notes)

@app.get("/")
def read_root():
    return {"Message": "Welcome to the medicore server!"}

@app.get("/home")
def read_home():
    return {"Hello": "World"}