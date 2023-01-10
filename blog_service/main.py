from fastapi import FastAPI
from routers import blogs_r

app = FastAPI()
app.include_router(blogs_r.router)
