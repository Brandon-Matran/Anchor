from fastapi import APIRouter, Depends, Response
from queries.job_listings import BlogList, Error, BlogRepository
from typing import Union, List

router = APIRouter()

@router.get("/job_listings", response_model=Union[Error, List[BlogList]])
def get_all(
    blogs: BlogList,
    repo: BlogRepository = Depends(),
):
    return repo.get_all(blogs)
    