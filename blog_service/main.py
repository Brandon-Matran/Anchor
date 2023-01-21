import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import blogs_r
<<<<<<< HEAD


=======
>>>>>>> 93d26ce33560db229eaace42e3fb9e3cd0ea7572


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blogs_r.router)
