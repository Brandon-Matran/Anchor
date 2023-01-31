from fastapi.testclient import TestClient
from main import app
from queries.blogs_q import BlogRepo


client = TestClient(app)


expected_get_response = {
    "id": 1,
    "username": "test",
    "post_date": "2023-01-21",
    "title": "test",
    "pic_url": "test",
    "description": "test",
}


class MockBlogQueries:
    def all_blogs(self):
        return [expected_get_response]


def test_get_all_blogs():

    req_body = {
        "username": "test",
        "post_date": "2023-01-21",
        "title": "test",
        "pic_url": "test",
        "description": "test",
    }
    app.dependency_overrides[BlogRepo] = MockBlogQueries
    response = client.get("/blogs", json=req_body)
    actual = response.json()

    assert response.status_code == 200
    assert actual == [expected_get_response]

    app.dependency_overrides = {}
