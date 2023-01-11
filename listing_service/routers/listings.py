from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.listings import (
    ListingError,
    ListingIn,
    ListingRepository,
    ListingOut,
)

router = APIRouter()


@router.post("/listings", response_model=Union[ListingOut, ListingError])
def create_listing(
    listing: ListingIn,
    response: Response,
    repo: ListingRepository = Depends()
):
    return repo.create(listing)
