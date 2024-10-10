from pydantic import BaseModel
from datetime import datetime

class Note(BaseModel):
    timestamp: datetime
    note: str