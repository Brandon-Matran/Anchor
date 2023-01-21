from fastapi.testclient import TestClient
from main import app
from queries.blogs_q import BlogRepo
from routers.blogs_r import all_blogs


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
        # "id":
        "username": "test",
        "post_date": "2023-01-21",
        "title": "test",
        "pic_url": "test",
        "description": "test",
    }
    
#     expected_get_response = {
#     "id": 1,
#     "username": "test",
#     "post_date": "2023-01-21",
#     "title": "test",
#     "pic_url": "test",
#     "description": "test",
# }
    
    # arrange
    app.dependency_overrides[BlogRepo] = MockBlogQueries
    

    # Act
    response = client.get("/blogs", json=req_body)
    print(response)
    actual = response.json()

    # Assert
    assert response.status_code == 200
    assert actual == [expected_get_response]

    # cleanup
    app.dependency_overrides = {}

