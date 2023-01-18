from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import Optional, List, Union

class AccountOut(BaseModel):
    id: str
    username: str
    user_type: str

class BlogError(BaseModel):
    message: str


# class BlogList(BaseModel):
#     id: int
#     username: str
#     post_date: date
#     title: str
#     description: str
#     pic_url: Optional[str]


class BlogIn(BaseModel):
    username: str
    post_date: date
    title: str
    pic_url: str
    description: str


class BlogOut(BaseModel):
    id: int
    username: str
    post_date: date
    title: str
    pic_url: str
    description: str


class BlogRepo:
    def all_blogs(self) -> Union[BlogError, List[BlogOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, username, post_date, title, pic_url,description
                        FROM blogs
                        ORDER BY post_date;
                        """
                    )
                    result = []
                    for record in db:
                        blog = BlogOut(
                            id=record[0],
                            username=record[1],
                            post_date=record[2],
                            title=record[3],
                            pic_url=record[4],
                            description=record[5],
                        )
                        result.append(blog)
                    return result

                    # return [
                    #     BlogList(
                    #         id=record[0],
                    #         username=record[1],
                    #         post_date=record[2],
                    #         title=record[3],
                    #         description=record[4],
                    #         pic_url=record[5],
                    #     )
                    #     for record in db
                    # ]
        except Exception as e:
            print(e)
            return {"message": "Could not retrieve the list of blogs"}

    def create(self, blog: BlogIn) -> BlogOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO blogs
                            (username, post_date, title, pic_url, description)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            blog.username,
                            blog.post_date,
                            blog.title,
                            blog.pic_url,
                            blog.description,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = blog.dict()
                    return BlogOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create new blog!"}

    def delete(self, blog_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM blogs
                        WHERE id = %s
                        """,
                        [blog_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, blog_id: int, blog: BlogIn) -> Union[BlogOut, BlogError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE blogs
                        Set username = %s
                        , post_date= %s
                        , title= %s
                        , description= %s
                        , pic_url= %s
                        WHERE id = %s
                        """,
                        [
                            blog.username,
                            blog.post_date,
                            blog.title,
                            blog.description,
                            blog.pic_url,
                            blog_id,
                        ],
                    )
                    old_data = blog.dict()
                    return BlogOut(id=blog_id, **old_data)
        except Exception:
            return {"message": "Could not update that blog!"}

    def get_one(self, blog_id: int) -> Optional[BlogOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , username
                            , post_date
                            , title
                            , pic_url
                            , description
                        FROM blogs
                        WHERE id = %s
                        """,
                        [blog_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_blog_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that blog"}

    def record_to_blog_out(self, record):
        return BlogOut(
            id=record[0],
            username=record[1],
            post_date=record[2],
            title=record[3],
            pic_url=record[4],
            description=record[5],
        )
