from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import Optional, List, Union

class BlogError(BaseModel):
    message: str

class BlogList(BaseModel):
    id: int
    username: str
    post_date: date
    title: str
    description: str
    picture_url: Optional[str]

class BlogIn(BaseModel):
    username: str
    post_date: date
    pic_url: str
    description: str

class BlogOut(BaseModel):
    id: int
    username: str
    post_date: date
    title: str
    description: str
    # picture_url: Optional[str]


class BlogRepo:
    def all_blogs(self) -> Union[BlogError, List[BlogList]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, username, post_date, title, description, picture_url
                        FROM blogs
                        ORDER BY post_date;
                        """
                    )
                    return [
                        BlogList(
                            id=record[0],
                            username=record[1],
                            post_date=record[2],
                            title=record[3],
                            description=record[4],
                            picture_url=record[5],
                        ) 
                        for record in db
                    ]
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
                            (username, post_date, pic_url, description)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            blog.username,
                            blog.post_date,
                            blog.pic_url,
                            blog.description
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = blog.dict()
                    return BlogOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create new blog!"}

