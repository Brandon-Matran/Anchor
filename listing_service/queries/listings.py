from pydantic import BaseModel
from typing import Union, List, Optional
from datetime import date
from queries.pool import pool


class ListingError(BaseModel):
    message: str


class ListingIn(BaseModel):
    title: str
    company_name: str
    job_position: str
    apply_url: str
    deadline: date
    created: date


class ListingOut(BaseModel):
    id: int
    title: str
    company_name: str
    job_position: str
    apply_url: str
    deadline: date
    created: date


class ListingRepository:
    def all_listings(self) -> Union[ListingError, List[ListingOut]]:
        # try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, title, company_name, job_position, apply_url, deadline, created
                        FROM listings
                        ORDER BY created;
                        """
                    )
                    
                    return [
                            ListingOut(
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
        # except Exception as e:
        #     print(e)
        #     return {"message": "Failed to display Job Listings"}

    def create(self, listing: ListingIn) -> ListingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO listings
                        (title, company_name, job_position, apply_url, deadline, created)
                        VALUES
                        (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            listing.title,
                            listing.company_name,
                            listing.job_position,
                            listing.apply_url,
                            listing.deadline,
                            listing.created
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = listing.dict()
                    return ListingOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create new job listing!"}

    def delete(self, listing_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM listings
                        WHERE id = %s
                        """,
                        [listing_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
        
