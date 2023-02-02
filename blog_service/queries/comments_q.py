from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import Optional, List, Union

class CommentError(BaseModel):
    message: str

class CommentIn(BaseModel):
    username: str
    post_date: date
    description: str
    blog_id: int


class CommentOut(BaseModel):
    id: int
    username: str
    post_date: date
    description: str
    blog_id: int

class CommentRepo:
    def all_comments(self) -> Union[CommentError, List[CommentOut]]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            SELECT id
                            , username
                            , post_date
                            , description
                            , blog_id
                            FROM comments
                            ORDER BY post_date;
                            """
                        )

                        result = []
                        for record in db:
                            comment = CommentOut(
                                id=record[0],
                                username=record[1],
                                post_date=record[2],
                                description=record[3],
                                blog_id=record[4],
                            )
                            result.append(comment)
                        return result
            except Exception:
                return {"message": "Could not get all comments!"}

    def get_one(self, comment_id: int) -> Optional[CommentOut]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            SELECT id
                                , username
                                , post_date
                                , description
                                , blog_id
                            FROM comments
                            WHERE id = %s
                            """,
                            [comment_id],
                        )
                        record = result.fetchone()
                        if record is None:
                            return None
                        return self.record_to_comment_out(record)
            except Exception:
                return {"message": "Could not get comment!"}

    def record_to_comment_out(self, record):
        return CommentOut(
            id=record[0],
            username=record[1],
            post_date=record[2],
            description=record[3],
            blogs_id=record[4],
        )

    def create(self, comment: CommentIn) -> CommentOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO comments
                            (username
                            , post_date
                            , description
                            , blog_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comment.username,
                            comment.post_date,
                            comment.description,
                            comment.blog_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = comment.dict()
                    return CommentOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create new comment!"}

    def delete(self, comment_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM comments
                        WHERE id = %s
                        """,
                        [comment_id],
                    )
                    return True
        except Exception:
            return False

    def update(self, comment_id: int, comment: CommentIn) -> Union[CommentOut, CommentError]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE comments
                            Set username = %s
                            , post_date= %s
                            , description= %s
                            WHERE id = %s
                            """,
                            [
                                comment.username,
                                comment.post_date,
                                comment.description,
                                comment_id,
                            ],
                        )
                        old_data = comment.dict()
                        return CommentOut(id=comment_id, **old_data)
            except Exception:
                return {"message": "Could not update comment!"}
