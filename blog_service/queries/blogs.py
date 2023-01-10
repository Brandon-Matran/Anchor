from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool




class Error(BaseModel):
    message: str



class BlogList(BaseModel):
    id: int
    title: str
    description: str
    picture_url: Optional[str]
    
    
    
class BlogRepository():
    def all_blogs(self) -> Union[Error, List[BlogList]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute()
        except Exception:
            return {"message": "Error retrieving the list of blogs"}