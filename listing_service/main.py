from fastapi import FastAPI
from routers import listings


app = FastAPI()
app.include_router(listings.router)
