# Allen's Day to Day

## 01/24/2023
Completed:
- Finished unit test
- Added redirect after submit to createblogsform
- Added some bootstrap to GetOneBlog

Work in Progress:
- Need to finish added delete and update buttons to MyBlogs

Notes:
Update Murad on doing the same for MyListings

## 01/23/2023
Completed:
- Completed Update Listings Front End

Work In Progress:
- Finish unit test

Notes:
running into an issue with post unit test

## 01/20/2023
Completed:
- Completed MyBlogs page

Work In Progress:
- Update Listings Front End

Notes:
Should be able to finish update listings front end over the weekend and begin unit testing on Monday

## 01/19/2023
Completed:
- Resolved token issue; can now parse token to get user data
- Completed Create Blogs

Work in Progress:
- Finish MyBlogs page

Notes:
- Ideally finish front end by tomorrow

## 01/18/2023
Completed:
- Made small progress towards parsing token

Work in Progress:
- resolve setting state to JWT with useEffect
- start unit test

Notes:
- Need to coordinate with team on deployment

## 01/17/2023
Completed:
- assigned to work on MyBlogs, which should just a filtered version of Blogs page
- Xue updated listings back end with get_one_listing endpoint
- Capsrover set up complete

Work in Progress:
- still stuck on getting the user data from tokens
- set up async function, but cannot await the useAuthContext()

Notes:
- We need to start setting up our deployment, unit testing should be conducted as soon as possible

## 01/17/2023
Completed:
- merged to main

Work in Progress:
- Xue found a token parser online; need to get token data
- Need to implement MyListing and MyBlogs front end

Notes:
- all back end APIs are working

## 01/13/2023

Completed:
- set auth.py and token_auth.py
- blogs back end complete

Work in Progress:
- need to figure out how to get user data from token on the front end
- we will merge all subbranches to main on Tue.

Notes:
- No need to set up relational endpoints to other data tables

## 01/12/2023
Completed:
- confirmed you can use token obj to access username data

Work in Progrss:
- need to figure out and write token auth for blogs
- need to figure out how to access data points in other tables in postgres

Note:
- discuss CI/CD with team. Hopefully we will be ready to test all features by next week.

## 01/11/2023
Completed:
- completed blogs back end and merged all subbranches to FEATURE/blogs

Work in Progress:
- Blogs front end; still needs to figure out how to grab username on the front end

Note:
- Waiting on listings back end to compelete, then I will start listings front end for update API.

## 01/10/2023

Completed:

- completed create and delete backend
- merged to FEATURE/blogs

Work in Progress:

- complete front end and merge to FEATURE/blogs branch

Notes:
Discussed fetching data from account microservice with team. Decided we will fetch account data from the frontend then post the account data with blog data to the blogs table. We decided not to use Redux.

## 01/09/2023

Completed:

- set up Migrations for Blogs table
- wrote basic lines for blogs queries and routers

Work in Progress:

- figure out how to pull/fetch data from registered user from account microservice
- write lines for delete blogs

Blockers:

- Find out how to pull/fetch data from other microservices

## 01/06/2023

Completed:

- set up project and pgadmin
- resolved docker container issue
- set up subbranch Allen/Create_Delete_Blogs

Work in Progress:

- begin coding and work on creaet blogs

Blockers:

- Need to learn more about FastAPI

## 01/05/2023

Completed:

- finalized features and issues
- finalized wireframe
- assigned points and members to issues
- set up docker yaml for PostreSQL

Work in Progress:

- set up project
- set up pgAdmin
- code our first endpoint

Notes:
Added dropdown as a story. Steven will work on it, but it will be a group collaboration. Need to bridge knowledge gap and make sure we are all on the same page before week's end.

## 01/04/2023

Completed:

- added features/issues for sign up/log in, blogs CRUD, job listings CRUD
- updated api-design with blog "title" and job listings update and delete

Work in Progress:

- still need to figure out which db to use
- assign points and members to issues
- Discuss implementation of drop down feature and issues
- Discuss implementation of 'my Blogs' page and 'my Jobs Listing' page
- Ask instructors to review features and issues. Assign duties tomorrow

Notes:
Xue will work on Docker. Will discuss as a team tomorrow. Hope to have one endpoint modeled be Fri end.

## 01/03/2023

Completed:

- created MAXBS group
  - added project members and HR instructors
- resolved git pipline issue (hopefully); account validated
- forked Project Gamma and renamed it 'Anchor'
- basic api-design md created
- installed black (lint)
- basic wireframe drawn out, but modifications are sure to follow

Work in Progress:

- create features based on the 4 MVPs:
  - Login/Sign Up
  - Blogs
  - Job Listings for SWE
  - Job Listings for Company
- create issues for each feature and assigning members to issues
- discuss changes to the MVP
- decide on which db to use (PostreSQL or MongoDB):
  - I'd like to use PostreSQL because it's SQL and a relational DB

Feature preference:

1. Blogs
2. Forms
3. Job Postings
4. Log In/Sign Up

Note:
We are still at the beginning stages of the project. Need to discuss features and issues with the team tomorrow. Once everyone knows what they're working on, we need to organize the 'Board'. We also need to discuss pair coding and debugging sessions. I suggest we set up a 3rd column for 'issues' that needs debugging and setup timeframes for each issue. Maybe a priority scale can help organize the workflow once we start coding.
