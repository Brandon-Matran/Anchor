from fastapi import APIRouter, Depends, Response
from queries.blogs import BlogList, Error, BlogRepository
from typing import Union, List

router = APIRouter()

@router.get("/blogs", response_model=Union[Error, List[BlogList]])
def all_blogs(
    blogs: BlogList,
    repo: BlogRepository = Depends(),
):
    return repo.all_blogs(blogs)
    
