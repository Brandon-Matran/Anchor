from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.blogs_q import (
    BlogError,
    BlogIn,
    BlogRepo,
    BlogOut
    # BlogList
)

router = APIRouter()

@router.post("/blogs", response_model=Union[BlogOut, BlogError])
def create_blog(
    blog: BlogIn,
    response: Response,
    repo: BlogRepo = Depends(),
    account: dict = Depends(get_current_user),
):
    print(account)
    return repo.create(blog)


@router.get("/blogs", response_model=Union[BlogError, List[BlogOut]])
def all_blogs(
    # blogs: BlogList,
    repo: BlogRepo = Depends(),
):
    return repo.all_blogs()

@router.delete("/blogs/{blog_id}", response_model=bool)
def delete_blog(blog_id: int, repo: BlogRepo = Depends()) -> bool:
    return repo.delete(blog_id)


@router.put("/blogs/{blog_id}", response_model=Union[BlogOut, BlogError])
def update_blog(
    blog_id: int,
    blog:BlogIn,
    repo: BlogRepo = Depends(),
    ) ->Union[BlogOut, BlogError]:

    return repo.update(blog_id,blog)


@router.get("/blogs/{blog_id}", response_model=Optional[BlogOut])
def get_one_blog(
    blog_id: int,
    response: Response,
    repo: BlogRepo = Depends(),
) -> BlogOut:
    blog = repo.get_one(blog_id)
    if blog is None:
        response.status_code = 404
    return blog
