from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.blogs_q import (
    BlogError,
    BlogIn,
    BlogRepo,
    BlogOut,
)

router = APIRouter()

@router.post("/blogs", response_model=Union[BlogOut, BlogError])
def create_blog(blog: BlogIn, response: Response, repo: BlogRepo = Depends()):
    return repo.create(blog)

@router.delete("/blogs/{blog_id}", response_model=bool)
def delete_blog(blog_id: int, repo: BlogRepo = Depends()) -> bool:
    return repo.delete(blog_id)
