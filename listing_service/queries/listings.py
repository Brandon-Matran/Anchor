from pydantic import BaseModel
from datetime import date
from queries.pool import pool


class Error(BaseModel):
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
    def create(self, listing: ListingIn) -> ListingOut:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statemnet
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
                # Return new data
                old_data = listing.dict()
                return {"message": "error!"}
                return ListingOut(id=id, **old_data)
