from fastapi import APIRouter, Depends, Response
from queries.job_listings import JobListings, Error, JobListingsRepository
from typing import Union, List

router = APIRouter()

@router.get("/job_listings", response_model=Union[Error, List[JobListings]])
def all_listings(
    job_listings: JobListings,
    repo: JobListingsRepository = Depends(),
):
    return repo.all_listings(job_listings)
    