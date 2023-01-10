### instructions:

docker volume create anchor-postgres-data
docker volume create pg-admin
docker compose build
docker compose up

when you create a ConnectionPool to use to connect to the database, use code like this:
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

Use in your API calls rather than hard-coded URLs like this:
const url = `${process.env.REACT_APP_FASTAPI_SERVICE}/api/boots`;
const response = await fetch(url);

remove:
docker container prune
docker volume remove postgres-data

## 01/09/2023

Completed:

- added signup front page

Plan:

- make sure signup front page works
- discuss: email and user_type add to account service

## 01/06/2023

Completed:

- done debugging, all containers and pg-admin is working.

Plan:

- create all feature branches and some story sub-branches

## 01/05/2023

Completed:

- finished the basic project setup and made a go-through with group
- assigned points and works to each member together
- added pgAdmin in yaml

Plan:

- try pg-admin at http://localhost:8082
- maybe start coding
- discuss workflow: when to use main, when to use other branches? Such as adding journal?

Issues:

- ghi container not working because of a "debug" thing in gih/package.json

## 01/04/2023

Completed:

- validated pipeline
- created feature issues together
- added story issues to each feature together
- project setup following instructions:
  - created account, blog and listing services folders and added required basic files. added contents to docker-compose.yaml

Plan:

- assign points and works to each member
- go over setup process

## 01/03/2023

- Started working on FastAPI endpoints with teammates.
  - api-design.md
- Plan for work assignments: Maybe after listing all features and points.
