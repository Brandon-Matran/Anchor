from fastapi.testclient import TestClient
from main import app
from queries.listings import ListingRepository


client = TestClient(app)

expected_get_response = {
    "id": 1,
    "username": "test",
    "title": "test",
    "company_name": "test",
    "job_position": "test",
    "apply_url": "test",
    "deadline": "2023-01-25",
    "created": "2023-01-21",
}


class MockListingsQueries:
    def all_listings(self):
        return [expected_get_response]


def test_get_all_listings():
    req_body = {
        "username": "test",
        "title": "test",
        "company_name": "test",
        "job_position": "test",
        "apply_url": "test",
        "deadline": "2023-01-25",
        "created": "2023-01-21",
    }
    app.dependency_overrides[ListingRepository] = MockListingsQueries
    response = client.get("/listings", json=req_body)
    actual = response.json()
    assert response.status_code == 200
    assert actual == [expected_get_response]
    app.dependency_overrides = {}
