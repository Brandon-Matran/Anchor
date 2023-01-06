## 1/5/23

Today I worked on:

-Finishing up the issues and features with the team.

The team finished up the features and issues today. We assigned each team member to tasks totalling up to 13 points per the grading rubric. I am in charge of Log In (Front End/Back End), Log Out(Front End/Back End), And Updating a Blog (Back End).

## 1/4/23

Today I worked on:

-The issues and features regarding Project Anchor with my team.

The team worked together on creating Features and identifying the issues that would have to be done in order to get each feature to work for the MVP.

For design decisions, we decided that tomorrow we will go over a My Jobs Page and My Blogs page.

I learned how to create issues and features using GitLab today.

## 1/3/23

Today, I worked on:

- Creating the API-Design Markdown with my team.

My team and I wrote in the API-Design.md readme about the our API endpoints and the methods
we would use to create our MVP using FASTAPI.  In the API-Design, we, together as a group came up with the names of the endpoints as well as the Request shape, Response, and Response shape for the Log In, Log out, Sign Up, Get a Blog, Get all Blogs, Create a Blog, Update Blog, Get Job Listings, and Create Job Listings.

As far as design descisions, we decided to keep our initial layout detailed in Excalidraw.

Today, I learned how to create Issues within the GitLab Group Project. I also learned how to create and assign roles to group members. Additionally, I had a quick refresher on how to merge and pull from the main repo.

Tomorrow, I want to finish the discussion over the feature and issues regarding our MVP and have our tasks assigned to each member so that we have a clearer understanding of how each person will contribute to the project.

As far as issues/features go I think we could break it up into the following:

## Log In

```
As a user
I want to be able to login
So that I can have access to read blogs, create blogs, and look at job listings
```

## Feature 1

```
Given a valid filled form by the user
When they click the "Log In" button
Then a token is generated if the account is valid and used
to log the user in
And the user is redirected to the Logged In Main Page

```


## Description

...

## Sign Up

```
As a new visitor
I want to be able to sign up
So that I can gain access to a list of blogs, create a blog, and see all job listings
```

## Feature 2

```
Given a valid form filled out by the new user
When the user fills out the form and then clicks sign up
Then the user will see a successful account creation message
And be able to access a user page which has blogs and job listings

```


## Create a Blog

```
As a user
I want to be able to create a blog
So that I can help other users with coding related issues
```

## Feature 3

```
Given a valid form is filled for create a blog
When a user clicks the submit blog button
Then they will see a successful blog created message
And be redirected to their blog
```

## Update a Blog

```
As a user
I want to be able to update my blog
So that I can change the content within my blog if corrections are needed
```

## Feature 4

```
Given a user correctly fills out a valid form for Update a blog
When the user clicks the submit update button
Then the user will be able to see a successful blog updated message
And be redirected to their blog

```


## Delete a blog

```
As a user
I want to be able to delete a blog
So that I can delete my content if I no longer want to share or if my content is no longer valid
```

## Feature 5

```
Given a user wants to delete a blog
When the user clicks the delete blog
Then the user is asked if they really want to delete their blog
And if the user clicks Yes then the blog is deleted and a successful delete blog message is shown

```

## View Job Listings

```
As a user
I want to be able to view job listings
So that I can apply to jobs that fit my experience and interests
```


## Feature 6

```
Given a user wants to view job listings
When the user clicks the job listings button within the dropdown menu
Then the user is directed to all the job listings available
And the user is able to click the apply button and be directed to the companies page

```

## Create a Job

```
As a company user
I want to be able to post a job listing
So that an applicant can apply to the position I posted
```

## Feature 7

```
Given a company wants to inform users that they have a job listing
When a company user clicks the create a job button
Then they will be directed to a form that allows them to create a job
And upon successful create a job form filled they will see their job listing put on the job listing page
...
```