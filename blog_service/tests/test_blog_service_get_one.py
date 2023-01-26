from fastapi.testclient import TestClient
from main import app
from queries.blogs_q import BlogRepo


client = TestClient(app)

expected_response = {
    "id": 1,
    "username": "string",
    "post_date": "2023-01-23",
    "title": "string",
    "pic_url": "string",
    "description": "string",
}


class MockQueries:
    def get_one(self, blog_id=2):
        return expected_response


def test_get_one_blog():
    req = {
        "id": 1,
        "username": "string",
        "post_date": "2023-01-23",
        "title": "string",
        "pic_url": "string",
        "description": "string",
    }
    app.dependency_overrides[BlogRepo] = MockQueries

    response = client.get("/blogs/1", json=req)
    actual = response.json()

    assert response.status_code == 200
    assert actual == expected_response

    app.dependency_overrides = {}
