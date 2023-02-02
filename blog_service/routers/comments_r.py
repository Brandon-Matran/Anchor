from fastapi import APIRouter, Depends, Response, HTTPException
from auth import authenticator
from typing import Union, List, Optional
from queries.comments_q import (
    CommentError,
    CommentIn,
    CommentRepo,
    CommentOut,
)


router = APIRouter()


@router.post("/comments", response_model=Union[CommentOut, CommentError])
def create_comment(
    comment: CommentIn,
    response: Response,
    repo: CommentRepo = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    if (account["user_type"] == "individual"
        or account["user_type"] == "company"):
        return repo.create(comment)
    else:
        raise HTTPException(
            status_code=401,
            detail="Only registered users are allowed to post comments",
        )

@router.get("/comments", response_model=Union[List[CommentOut], CommentError])
def all_comments(
    repo: CommentRepo = Depends(),
):
    return repo.all_comments()

@router.delete("/comments/{comment_id}", response_model=bool)
def delete_comment(
    comment_id: int,
    repo: CommentRepo = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if (
            account["user_type"] == "individual"
            or account["user_type"] == "company"
        ):
            return repo.delete(comment_id)
    else:
        raise HTTPException(
            status_code=401,
            detail="Only registered users are allowed to delete comment",
        )

@router.put("/comments/{comment_id}", response_model=Union[CommentOut, CommentError])
def update_comment(
    comment_id: int,
    comment: CommentIn,
    repo: CommentRepo = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
) -> Union[CommentOut, CommentError]:
    if (
        account["user_type"] == "individual"
        or account["user_type"] == "company"
    ):
        return repo.update(comment_id, comment)
    else:
        raise HTTPException(
            status_code=401,
            detail="Only registered users are allowed to update comment",
        )

@router.get("/comments/{comment_id}", response_model=Optional[CommentOut])
def get_one_comment(
    comment_id: int,
    response: Response,
    repo: CommentRepo = Depends(),
) -> CommentOut:
    comment = repo.get_one(comment_id)
    if comment is None:
        response.status_code = 404
    return comment
