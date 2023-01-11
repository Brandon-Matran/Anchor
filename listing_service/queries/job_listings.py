from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date, time
from queries.pool import pool


class Error(BaseModel):
    message: str


class JobListings(BaseModel):
    id: int
    title: str
    company_name: str
    job_position: str
    apply_url: Optional[str]
    deadline: date; time
    created: date
    
    
class JobListingsRepository():
    def all_listings(self) -> Union[Error, List[JobListings]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, title, company_name, job_position, apply_url, deadline, created
                        FROM ###
                        ORDER BY created;
                        """
                    )
                    
                    return [
                            JobListings(
                                id=record[0],
                                title=record[1],
                                company_name=record[2],
                                job_position=record[3],
                                apply_url=record[4],
                                deadline=record[5],
                                created=record[6],
                            ) 
                            for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Failed to display Job Listings"}