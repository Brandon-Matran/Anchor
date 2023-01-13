from fastapi import APIRouter, Depends, Response, HTTPException, status
from typing import Union

# from token_auth import get_current_user
from auth import authenticator
from queries.listings import (
    ListingError,
    ListingIn,
    ListingRepository,
    ListingOut,
)

router = APIRouter()

# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )


@router.post("/listings", response_model=Union[ListingOut, ListingError])
def create_listing(
    listing: ListingIn,
    response: Response,
    repo: ListingRepository = Depends(),
    # account: dict = Depends(get_current_user),
    account: dict = Depends(authenticator.get_current_account_data),
):
    # if "company" not in account.user_type:
    #     raise not_authorized
    # return repo.create(listing)
    if account["user_type"] == "company":
        return repo.create(listing)
    else:
        raise HTTPException(
            status_code=401, detail="Only company user can post job listing"
        )


@router.delete("/listings/{listing_id}", response_model=bool)
def delete_listing(
    listing_id: int,
    repo: ListingRepository = Depends(),
    # account: dict = Depends(get_current_user),
    account: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account["user_type"] == "company":
        return repo.delete(listing_id)
    else:
        raise HTTPException(
            status_code=401, detail="Only company user can delete job listing"
        )
