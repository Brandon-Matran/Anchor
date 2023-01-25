## Journals

- In your browser go to this link: https://gitlab.com/maxbs/anchor
- Fork the project
- Clone it with HTTPS
- open your terminal on your machine
- make sure you are in the directory you would like to work in
- type a command "git clone https://gitlab.com/maxbs/anchor.git"
- change your directory to the project's directory by typing a command "cd anchor/"
- type a command "code ." so your project opens in VSCode
- Our project has three microservices, namely, blogs, job_listings and accounts


- In order to test the backend CRUD codes for the blogs microservice:
    - go to http://localhost:8080/docs#/default
    - from there, depeding on the feature you would like to test click on it:
        - for instance POST, GET, DELETE or PUT methods

    - Let's start with Get all blogs:
        - click on GET /blogs with "all blogs" notation
        - press Try it out
        - press Execute and you should either see an empty list or your blogs if you have previously created any
    - Next one is POST, meaning create a blog:
        - click on POST method
        - Try it out: you will see "fastapi_token" line and this table:
            {
            "username": "string",
            "post_date": "2023-01-24",
            "title": "string",
            "pic_url": "string",
            "description": "string"
            }
        - in each row, after the semicolon, write your values, after putting in your login account token into the token field for authentication as an "Individual" user type:
            {
            "username": "John99",
            "post_date": "2023-01-24",
            "title": "Software News",
            "pic_url": "https://s.yimg.com/os/creatr-uploaded-images/2022-11/bf2328a0-59f7-11ed-bbff-605e7e0e3149",
            "description": "Today twitter has laid off multiple thousand if its employees"
            }
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
    




Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.
