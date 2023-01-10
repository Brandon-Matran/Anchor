from fastapi import FastAPI
from routers import job_listings


app = FastAPI()
app.include_router(job_listings.router)