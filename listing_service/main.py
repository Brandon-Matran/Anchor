from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import listings


app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:8090",
    "https://maxbs.gitlab.io",

]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(listings.router)
