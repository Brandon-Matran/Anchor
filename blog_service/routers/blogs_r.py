from fastapi import APIRouter, Depends, Response, HTTPException, status
from auth import authenticator
from typing import Union, List, Optional
from queries.blogs_q import (
    BlogError,
    BlogIn,
    BlogRepo,
    BlogOut,
)

router = APIRouter()


@router.post("/blogs", response_model=Union[BlogOut, BlogError])
def create_blog(
    blog: BlogIn,
    response: Response,
    repo: BlogRepo = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if account["user_type"] == 'individual' or account["user_type"] == 'company':
        return repo.create(blog)
    else:
        raise HTTPException(status_code=401, detail="Only registered users are allowed to post new blog")


@router.get("/blogs", response_model=Union[List[BlogOut], BlogError])
def all_blogs(
    repo: BlogRepo = Depends(),
):
    return repo.all_blogs()


@router.delete("/blogs/{blog_id}", response_model=bool)
def delete_blog(
    blog_id: int,
    repo: BlogRepo = Depends(),
    account: dict = Depends(authenticator.get_current_account_data)
    ) -> bool:
    if account["user_type"] == 'individual' or account["user_type"] == 'company':
        return repo.delete(blog_id)
    else:
        raise HTTPException(status_code=401, detail="Only registered users are allowed to delete blog")


@router.put("/blogs/{blog_id}", response_model=Union[BlogOut, BlogError])
def update_blog(
    blog_id: int,
    blog: BlogIn,
    repo: BlogRepo = Depends(),
    account: dict = Depends(authenticator.get_current_account_data)
    ) ->Union[BlogOut, BlogError]:
    if account["user_type"] == 'individual' or account["user_type"] == 'company':
        return repo.update(blog_id,blog)
    else:
        raise HTTPException(status_code=401, detail="Only registered users are allowed to update blog")



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
