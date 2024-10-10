from fastapi import APIRouter
from app.models.account import Account

router = APIRouter()

@router.get("/my-account")
def get_account():
    return {"message": "Here are your account!"}