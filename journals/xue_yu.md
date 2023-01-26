## instructions:

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

## 01/26/2023
Completed:
 - codes cleaned up
 - work on readme
Plan:
 -

## 01/25/2023
Completed:
  - help Allen with the my blogs page,
		to make the delete and update functions work nicely.
Plan:
 - clean up codes

## 01/24/2023
Completed:
	- updated the gitlab ci file to make sure the unit tests for
		blog and listing end points work.
	- fixed all the current pipeline fails.

## 01/23/2023
Team Completed:
The front ends almost done.

Plan:
Two more unit tests needed.
Working on deployment.
Merge story branches to main.

Blocker:
 - Guidance on how to merge correctly.

## 01/22/2023
Completed:
 - unit test get one listing works

problem to fix:
unit test update blog error 'invalid token'

plan:
 - run flake8 to fix codes
 - learn ci/cd

## 01/19/2023
Completed:
 - write unit test for update blog
 - update blog front end working

## 01/18/2023
Completed:
 - Update Job Listings back end with ‘username’ - Xue
 - add ’get_one_listing” to Job Listings back end - Xue

plan:
 - continue to work on font end (update blog)
 - write unit test

## 01/17/2023
Completed:
 - Merged all feature branches to main again and updated all feature branches.
 - Everyone now work on the front end.
 - initial set up the caprover.

Plan:
 - continue to work on font end (update blog)

## 01/13/2023

Completed:
- continue to work on front end.
- done part of feature merge to main

## 01/12/2023
Completed:
 - Our backend endpoints and authentication/authorization are basically all set.
	plan:
 - continue to work on front end pages
 - start writing unit tests
 - learn about ci/cd

Plan:
 - get a SIGNING_KEY(done)

Questions need to figure out:
 - update does not show what is already stored in database
 - we currently only authorize posting and editing things by user type.
  We want to only allow who posted the blog to edit it.
  I think we can do it at the front end.

## 01/11/2023

Completed:

- merged all current feature branches to main,
  Everyone can build docker based on main and do not need to rebuild docker
  when working on different branches.

- fixed signup page bug

## 01/10/2023
Completed:
 - added blog update function
 - modified merge leftovers: blogs missing "title" here and there, picture_url or pic_url
 - sign up front page all set up

plan:
 - add job listing delete function
 - start blog update front page

notes:
 - Currently, we have the create, update, and get list of blogs working.

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
