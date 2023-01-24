from fastapi.testclient import TestClient
from main import app
from queries.blogs_q import BlogRepo
from auth import MyAuthenticator

client = TestClient(app)

expected_post_response = {
    "id": 1,
    "username": "Subject3",
    "post_date": "2023-01-23",
    "title": "Passing Test",
    "pic_url": "https://test.example",
    "description": "Testing 1 2 3"
}

test_acct = {
    "account": {
        "id": 3,
        "username": "Subject3",
        "user_type": "individual"
    }
}

class MockPostBlogsQueries:
    def post(self, new_blog):
        return expected_post_response

class MockAuth:
    def get_current_account_data(self):
        print("get_current_account_data")
        return test_acct


def test_post_blogs():
    req = {
        "username": "Subject3",
        "post_date": "2023-01-23",
        "title": "Passing Test",
        "pic_url": "https://test.example",
        "description": "Testing 1 2 3"
    }

    print("******************TEST*********************")

    app.dependency_overrides[BlogRepo] = MockPostBlogsQueries
    app.dependency_overrides[MyAuthenticator] = MockAuth

    response = client.post("/blogs", json=req)
    actual = response.json()

    assert response.status_code == 200
    assert actual == expected_post_response

    app.dependency_overrides = {}
