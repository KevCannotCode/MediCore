from fastapi import APIRouter
from app.models.note import Note

router = APIRouter()

@router.get("/notes")
def get_notes():
    return {"message": "You ping the note API!"}