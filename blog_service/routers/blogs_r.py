from fastapi import APIRouter
from queries.blogs_q import BlogIn

router = APIRouter()

@router.post("/blogs")
def create_blog(blog: BlogIn):
    print(blog)
    return blog
