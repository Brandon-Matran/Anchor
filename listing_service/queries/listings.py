from pydantic import BaseModel
from datetime import date


class ListingIn(BaseModel):
    title: str
    company_name: str
    job_position: str
    apply_url: str
    deadline: date
    created: date
