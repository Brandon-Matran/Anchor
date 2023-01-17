from fastapi import FastAPI
from routers import listings
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()
app.include_router(listings.router)

origins = [
    "http://localhost:3000",
    "http://localhost:8090",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


