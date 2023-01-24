from fastapi import FastAPI
from routers import listings
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()
app.include_router(listings.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("https://maxbs.gitlab.io", "http://localhost:3000",)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
