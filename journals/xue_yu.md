## 01/03/2023
- Started working on FastAPI endpoints with teammates.
  - api-design.md
- Plan for work assignments: Maybe after listing all features and points.

## 01/04/2023
Completed:
    - validated pipeline
    - created feature issues together
    - added story issues to each feature together
    - project setup following instructions: created account, blog and listing services folders and added required basic files. added contents to docker-compose.yaml

Plan:
    - assign points and works to each member
    - go over setup process





### instructions:
docker volume create postgres-data
docker compose up

when you create a ConnectionPool to use to connect to the database, use code like this:
    pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

Use in your API calls rather than hard-coded URLs like this:
    const url = `${process.env.REACT_APP_FASTAPI_SERVICE}/api/boots`;
    const response = await fetch(url);

remove:
docker container prune
docker volume remove postgres-data
