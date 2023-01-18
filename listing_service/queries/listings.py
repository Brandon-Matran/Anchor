from pydantic import BaseModel
from typing import Union, List, Optional
from datetime import date
from queries.pool import pool


class ListingError(BaseModel):
    message: str


class ListingIn(BaseModel):
    username: str
    title: str
    company_name: str
    job_position: str
    apply_url: str
    deadline: date
    created: date


class ListingOut(BaseModel):
    id: int
    username: str
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
                        SELECT id,username, title, company_name, job_position, apply_url, deadline, created
                        FROM listings
                        ORDER BY created;
                        """
                )

                return [
                    ListingOut(
                        id=record[0],
                        username=record[1],
                        title=record[2],
                        company_name=record[3],
                        job_position=record[4],
                        apply_url=record[5],
                        deadline=record[6],
                        created=record[7],
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
                        (username, title, company_name, job_position, apply_url, deadline, created)
                        VALUES
                        (%s, %s, %s, %s, %s, %s,%s)
                        RETURNING id;
                        """,
                        [
                            listing.username,
                            listing.title,
                            listing.company_name,
                            listing.job_position,
                            listing.apply_url,
                            listing.deadline,
                            listing.created,
                        ],
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
                        [listing_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, id: int, listing: ListingIn) -> ListingOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE listings
                    SET username = %s
                    , title = %s
                    , company_name = %s
                    , job_position = %s
                    , apply_url = %s
                    , deadline = %s
                    , created = %s
                    WHERE id = %s
                    """,
                    [
                        listing.username,
                        listing.title,
                        listing.company_name,
                        listing.job_position,
                        listing.apply_url,
                        listing.deadline,
                        listing.created,
                        id,
                    ],
                )

                old_data = listing.dict()
                return ListingOut(id=id, **old_data)

    def get_one(self, listing_id: int) -> Optional[ListingOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        ,username
                        , title
                        , company_name
                        , job_position
                        , apply_url
                        , deadline
                        , created
                        FROM listings
                        WHERE id = %s
                        """,
                        [listing_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_listing_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that blog"}

    def record_to_listing_out(self, record):
        return ListingOut(
            id=record[0],
            username=record[1],
            title=record[2],
            company_name=record[3],
            job_position=record[4],
            apply_url=record[5],
            deadline=record[6],
            created=record[7],
        )
