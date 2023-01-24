from fastapi import FastAPI
from routers import listings
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()
app.include_router(listings.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("http://localhost:3000", "https://maxbs.gitlab.io")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
