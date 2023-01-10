from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool





class Error(BaseModel):
    message: str


title, company_name, job_position, apply_url, deadline, created
class JobListing(BaseModel):
    pass