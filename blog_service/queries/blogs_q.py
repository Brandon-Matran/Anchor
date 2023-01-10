from pydantic import BaseModel
from datetime import date
from queries.pool import pool

class BlogError(BaseModel):
    message: str

class BlogIn(BaseModel):
    username: str
    post_date: date
    pic_url: str
    description: str

class BlogOut(BaseModel):
    id: int
    username: str
    post_date: date
    pic_url: str
    description: str


class BlogRepo:
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
