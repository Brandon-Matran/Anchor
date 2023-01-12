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

@router.delete("/listings/{listing_id}", response_model=bool)
def delete_listing(
    listing_id: int,
    repo: ListingRepository = Depends(),
) -> bool:
    return repo.delete(listing_id)

@router.put("/listings/{listing_id}", response_model=ListingOut)
def update_listing(
    listing_id: int,
    listing: ListingIn,
    repo: ListingRepository = Depends(),
) -> ListingOut:
    return repo.update(listing_id, listing)
