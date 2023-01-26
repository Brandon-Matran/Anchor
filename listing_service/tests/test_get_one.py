from fastapi.testclient import TestClient
from main import app
from queries.listings import ListingRepository


client = TestClient(app)
expected_response = {
    "id": 1,
    "username": "string",
    "title": "string",
    "company_name": "string",
    "job_position": "string",
    "apply_url": "string",
    "deadline": "2023-01-23",
    "created": "2023-01-23",
}


class MockQueries:
    def get_one(self, listing_id=1):
        return expected_response


def test_get_one_listing():
    req = {"id": 1}

    app.dependency_overrides[ListingRepository] = MockQueries
    response = client.get("/listings/1", json=req)
    actual = response.json()
    assert response.status_code == 200
    assert actual == expected_response
    app.dependency_overrides = {}
