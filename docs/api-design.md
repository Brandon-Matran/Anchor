
# Anchor


### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string
  * email: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### Sign Up

* Endpoint path: /signup
* Endpoint method: POST

* Request body:
    ```json
    {
        "username": string,
        "password": string,
        "email": string
    }
    ```

* Response: Successful account creation or failure
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```


### Get Blog

* Endpoint path: /blog/<id>
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: Get a specific blog
* Response shape (JSON):
    ```json
    {
        "blog": [
            {
                "picture_url": string,
                "description": string,
                "date/time": datetime,
                "user": {
                    "name": string
                }
            }
        ]
    }
    ```

### Create a Blog

* Endpoint path: /blogs
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body (form):
    ```json
    {
        "description": string,
        "picture_url": string
    }
    ```

* Response: Blog successfully created or error message
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Get a List of Blogs

* Endpoint path: /blogs
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token


* Response: A list of blogs sorted by most recent date and time
* Response shape (JSON):
    ```json
    {
        "id": int,
        "description": string,
        "picture_url": string,
        "user": {
            "name": string
        }
    }
    ```

### Update Blog

* Endpoint path: /blog/<id>
* Endpoint method: PUT


* Headers:
  * Authorization: Bearer token

* Request body (form):
    ```json
    {
        "description": string,
        "picture_url": string
    }
    ```

* Response: Successful blog update or error
* Response shape (JSON):
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Get Job Listings

* Endpoint path: /jobs
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token


* Response: Get a list of all jobs
* Response shape (JSON):
    ```json
    {
        "company_name" : string,
        "job_position": string,
        "apply_url": string,
        "deadline": datetime,
        "created": datetime
    }
    ```

### Create Job Listing

* Endpoint path: /jobs
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body (form):
      ```json
    {
        "company_name" : string,
        "job_position": string,
        "apply_url": string,
        "deadline": datetime
    }
    ```
* Response: Successful creation of job or error
* Response shape (JSON):
    ```json
    {
        "company_name" : string,
        "job_position": string,
        "apply_url": string,
        "deadline": datetime,
        "created": datetime.now()
    }
    ```
