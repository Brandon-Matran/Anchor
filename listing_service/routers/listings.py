from fastapi import APIRouter
from queries.listings import ListingIn

router = APIRouter()


@router.post("/listings")
def create_listing(listing: ListingIn):
    print('listing', listing)
    print('deadline', listing.deadline.month)
    return listing
