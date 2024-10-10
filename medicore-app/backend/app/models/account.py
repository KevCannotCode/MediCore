from pydantic import BaseModel
from datetime import date

class Account(BaseModel):
    name: str
    password: str
    email: str
    date_of_birth: date