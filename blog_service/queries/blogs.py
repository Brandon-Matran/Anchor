from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool





class Error(BaseModel):
    message: str



class BlogList(BaseModel):
    id: int
    username: str
    post_date: date
    title: str
    description: str
    picture_url: Optional[str]
    
    
    
class BlogRepository():
    def all_blogs(self) -> Union[Error, List[BlogList]]:
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
                    # result = []
                    # for record in db:
                    #     blog = BlogList(
                    #         id=record[0],
                    #         username=record[1],
                    #         post_date=record[2],
                    #         title=record[1],
                    #         description=record[2],
                    #         picture_url=record[3],
                    #     )
                    #     result.append(blog)
                    # return result
                
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