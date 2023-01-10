from pydantic import BaseModel
from datetime import date

class BlogIn(BaseModel):
    username: str
    post_date: date
    pic_url: str
    description: str
