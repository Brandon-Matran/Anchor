from fastapi.testclient import TestClient
from fastapi import Depends
from main import app
from queries.blogs_q import BlogRepo
from auth import authenticator

# from routers import blogs_r

client = TestClient(app)

expected_update_response = {
    "id": 1,
    "username": "1st_test",
    "post_date": "2023-01-20",
    "title": "test",
    "pic_url": "test",
    "description": "test"
}


class MockBlogUpdateQueries:
    def update(self, blog_id=1,new_blog=None):
        return expected_update_response


def test_update_blog():
    # arrange
    req = {
        "username": "1st_test",
        "post_date": "2023-01-20",
        "title": "test",
        "pic_url": "test",
        "description": "test"
    }

    app.dependency_overrides[BlogRepo] = MockBlogUpdateQueries

    # account: dict = Depends(authenticator.get_current_account_data)
    # print(account)

    # act

    response = client.put("/blogs/1", json=req)

    actual = response.json()
    print("aaa.................")
    print(actual)
    # Assert
    assert response.status_code == 200
    assert actual == expected_update_response

    # cleanup
    app.dependency_overrides = {}
