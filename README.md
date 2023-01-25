# Anchor - A Software Engineering Community

Have you ever wanted to be a part of something bigger than yourself? Welcome to Anchor, home of the fastest growing software engineering community on planet Earth.

 ---
 Anchor Team: MAXBS
 - Murad Khudiev
 - Allen Chen
 - Xue Yu
 - Brandon Matran
 - Steven Duong

---
# How to Run Application
- In your browser go to this link: [https://gitlab.com/maxbs/anchor](https://gitlab.com/maxbs/anchor)
- Fork the project
- Clone it with HTTPS
- Open your CLI on your machine
- Make sure you are in the directory you would like to work in
- Type a command "git clone [https://gitlab.com/maxbs/anchor.git](https://gitlab.com/maxbs/anchor.git)"
- Change your directory to the project's directory by typing a command "cd anchor/"
- Type a command "code ." so your project opens in VSCode
- In your terminal type docker volume create
- Our project has three microservices, namely, blogs, job_listings and accounts

---

## API Design

---

- In order to test the backend CRUD codes for the accounts microservice:
    - go to [Accounts API](http://localhost:8100/docs)
    - from there, choose the method you would like to test:
        - POST, GET, DELETE
    - GET All Accounts:
        - Click on Get /api/accounts
        - Press Try it out
    - POST:
        - Click on Post /api/accounts Create Account

        Input:
        ```
            {
            "username": "string",
            "password": "string",
            "user_type": "string"
            }
        ```
        Output:
        ```
            {
            "access_token": "string",
            "token_type": "Bearer",
            "account": {
                "id": "string",
                "username": "string",
                "user_type": "string"
            }
            }
        ```
        Creating a successful account will yield an access token that allows the user other permissions based on user type.
        A user_type of "individual" will be allowed to post blogs, while a "company" will be able to post blogs and job listings.
    - DELETE:
        - If successfully logged in and an access token was returned. If you wanted to test out delete. This would be your output
      ```
      {
        true
      }
      ```

---

- In order to test the backend CRUD codes for the blogs microservice:
    - go to [http://localhost:8080/docs#/default](http://localhost:8080/docs)
    - from there, depeding on the feature you would like to test click on it:
        - for instance POST, GET, DELETE or PUT methods

    - Let's start with Get all blogs:
        - click on GET /blogs with "all blogs" notation
        - press Try it out
        - press Execute and you should either see an empty list or your blogs if you have previously created any
    - Next one is POST, meaning create a blog:
        - click on POST method
        - Try it out: you will see "fastapi_token" line and this table:
        ```
            {
            "username": "string",
            "post_date": "2023-01-24",
            "title": "string",
            "pic_url": "string",
            "description": "string"
            }
        ```
        - In each row, after the semicolon, write your values, after putting in your login account token into the token field for authentication as an "Individual" user type:
        ```
            {
            "username": "John99",
            "post_date": "2023-01-24",
            "title": "Software News",
            "pic_url": "[https://s.yimg.com/os/creatr-uploaded-images/2022-11/bf2328a0-59f7-11ed-bbff-605e7e0e3149](https://s.yimg.com/os/creatr-uploaded-images/2022-11/bf2328a0-59f7-11ed-bbff-605e7e0e3149)",
            "description": "Today twitter has laid off multiple thousand if its employees"
            }
        ```
        - press Execute and you should see your created object with an id number attached to it
    - If you would like to get a specific blog, we shift to GET method for Get One Blog part
        - click Try it out and input the blog id
        - you should see the blog that was posted under that id number
    - Next we have update blog under the PUT method:
        - Try it out
        - input the id number and your token in respective fields
        - select the field you would like to update and in the table below change that value
        - once you Execute you should see your full updated blog
    - Lastly for the CRUD method, we have delete
        - Try it out
        - Input blog_id and press execute
        - This should delete the blog and give you a True response

---

- In order to test the backend CRUD codes for the blogs microservice:
    - Go to [JOB LISTING API](http://localhost:8090/docs)
    - From there, choose the method you would like to test:
        - POST, GET, DELETE, PUT

    - GET All Job Listings:
        - Click on GET /listings with "All Listings" notation
        - press Try it out
        - This should return your list of Job Listings

    - POST
        - Click on POST /listings Create Listing

        INPUT:
        ```
        {
        "username": "string",
        "title": "string",
        "company_name": "string",
        "job_position": "string",
        "apply_url": "string",
        "deadline": "2023-01-25",
        "created": "2023-01-25"
        }
        ```
        OUTPUT:
        ```
        {
        "id": 0,
        "username": "string",
        "title": "string",
        "company_name": "string",
        "job_position": "string",
        "apply_url": "string",
        "deadline": "2023-01-25",
        "created": "2023-01-25"
        }
        ```
        Creating a successful job listing will save the attributes in the input field and assign a unique id to that job listing
        
    - GET Specific Job Listing:
        - Click on GET /listings/{listing_id} Get One Listing
        - Enter ID of job listing into the listing_id field

        OUTPUT:
        ```
        {
        "id": 0,
        "username": "string",
        "title": "string",
        "company_name": "string",
        "job_position": "string",
        "apply_url": "string",
        "deadline": "2023-01-25",
        "created": "2023-01-25"
        }
        ```
    - PUT Specific Job Listing
        - Click on PUT /listings/{listing_id} Update Listing
        - Enter ID of job listing into the listing_id field

        INPUT:
        ```
        {
        "username": "string",
        "title": "string",
        "company_name": "string",
        "job_position": "string",
        "apply_url": "string",
        "deadline": "2023-01-25",
        "created": "2023-01-25"
        }
        ```
        OUTPUT:
        ```
        {
        "id": 0,
        "username": "string",
        "title": "string",
        "company_name": "string",
        "job_position": "string",
        "apply_url": "string",
        "deadline": "2023-01-25",
        "created": "2023-01-25"
        }
        ```
    - DELETE Specific Job Listing
        - Click on DELETE /listings/{listing_id} Delete Listing
        - Enter ID of job listing into the listing_id field

        OUTPUT:
        ```
        {
            true
        }
        ```

---
# Diagrams:
![Diagrams] (ghi\public\Images\MAXBS_Anchor.png)
![Diagrams] (ghi\public\Images\MAXBS_Anchor2.png)


---
# Backend Endpoints:
## Default Ports
blogs:8080
listings:8090
accounts:8100

  ## Blogs
| HTTP Requests | URLs |
| ----------- | ----------- |
|   GET List of Blogs|  http://localhost:8080/blogs|
|   GET Specific Blog | http://localhost:8080/blogs/:id|
|   POST Blog|  http://localhost:8080/blogs|
|   PUT Blog|  http://localhost:8080/blogs/:id|
|   DELETE Blog  |  http://localhost:8080/blogs/:id|

## Job Listings
| HTTP Requests | URLs |
| ----------- | ----------- |
|   GET List of Jobs |  http://localhost:8090/listings|
|   GET Specific Job Listing | http://localhost:8090/listings/:id|
|   POST Job Listing |  http://localhost:8090/listings|
|   PUT Job Listing |  http://localhost:8090/listings/:id|
|   DELETE Job Listing  |  http://localhost:8090/listings/:id|

## Accounts
| HTTP Requests | URLs |
| ----------- | ----------- |
|   GET List of Accounts |  http://localhost:8100/api/accounts|
|   GET Specific Account| http://localhost:8100/api/accounts/:id|
|   POST Account|  http://localhost:8100/api/accounts|
|   Get Protected Account|  http://localhost:8100/api/protected|

## Token
| HTTP Requests | URLs |
| ----------- | ----------- |
|   Get Token|  http://localhost:8100/token|
|   Post Token|  http://localhost:8100/token|
|   DELETE Token|  http://localhost:8100/token|



---
### Frontend Endpoints:



REACT:

http://localhost:3000



---
### Microservices:
---


###  Accounts -

As an account user, there are only 3 requirements that need to be met. A username, password, and your choice of user type.

There are currently two user types available: Individual and Company.

An individual user can post, edit, and delete blogs that they authored. Individual users can get blogs from other users and also browse job listings.

As a company user, I can post, edit, and delete job listings to prospective employees and also have all the blogs functions that are available as an individual user.


---
### Blogs -

The 3 most recent blogs will be displayed on the main page.

Created a form to post blogs. In the form for blogs, we have 3 fields that are required.
Title, description, and pic url. Post date and username will automatically be applied.

When you click on "my blogs" the user can view all the blogs they posted.

---
### Jobs -

As a company user, you can post job listings so people can apply.

In the job listings form, the required fields are:
Title, Company Name, Job Position, Apply URL, and a deadline date.

Username and created timestamp will automatically be applied on click of "post job."

When you click on "my listings" the user can view all the job listings they posted.
