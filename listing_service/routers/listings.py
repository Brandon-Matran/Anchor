from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.listings import (
    Error,
    ListingIn,
    ListingRepository,
    ListingOut,
)

router = APIRouter()


@router.post("/listings", response_model=Union[ListingOut, Error])
def create_listing(
    listing: ListingIn,
    response: Response,
    repo: ListingRepository = Depends()
):
    response.status_code = 400
    return repo.create(listing)
