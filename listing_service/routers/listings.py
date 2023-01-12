from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.listings import (
    ListingError,
    ListingIn,
    ListingRepository,
    ListingOut,
)

router = APIRouter()

@router.get("/listings", response_model=Union[List[ListingOut], ListingError])
def all_listings(
    repo: ListingRepository = Depends(),
):
    return repo.all_listings()


@router.post("/listings", response_model=Union[ListingOut, ListingError])
def create_listing(
    listing: ListingIn,
    response: Response,
    repo: ListingRepository = Depends()
):
    return repo.create(listing)

@router.delete("/listings/{listing_id}", response_model=bool)
def delete_listing(
    listing_id: int,
    repo: ListingRepository = Depends(),
) -> bool:
    return repo.delete(listing_id)
