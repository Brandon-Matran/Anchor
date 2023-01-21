FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY main.py main.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY queries queries
COPY routers routers
COPY authenticator.py authenticator.py

# If you're using a relational database with migrations,
# uncomment the following line
COPY migrations migrations
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
RUN python -m pip install -r requirements.txt
WORKDIR /app
# CMD uvicorn main:app --host 0.0.0.0 --port 8000
# CMD uvicorn main:app --host 0.0.0.0

# If you're using a relational database and want migrations
# to be run automatically, delete the previous CMD line and
# uncomment this CMD line
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 8000
