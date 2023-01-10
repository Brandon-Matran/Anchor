from queries.blogs_q import BlogIn
from fastapi import APIRouter, Depends, Response
from queries.blogs_q import BlogList, BlogError, BlogRepo
from typing import Union, List


router = APIRouter()

@router.post("/blogs")
def create_blog(blog: BlogIn):
    print(blog)
    return blog


@router.get("/blogs", response_model=Union[BlogError, List[BlogList]])
def all_blogs(
    blogs: BlogList,
    repo: BlogRepo = Depends(),
):
    return repo.all_blogs(blogs)
