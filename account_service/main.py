from authenticator import authenticator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts

app = FastAPI()

origins = [
    "CORS_HOST,"
    "http://localhost:3000",
    "http://localhost:8100",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)
app.include_router(accounts.router)
