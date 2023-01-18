from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
from authenticator import authenticator

client = TestClient(app)

expected_post_response = {
    "id": '1',
    "username": "test",
    "user_type": "individual"
    }

expected_get_response = {
    "id": 1,
    "username": "test",
    "hashed_password": 'test',
    "user_type": "individual"

}


class MockAccountQueries:
    def get(self, username):
        pass

    def create(self, new_account, new_pass):
        pass

    def get_all(self):
        return [expected_post_response]

def test_get_accounts():

    req_body = {
    "username": "test",
    "password": "test",
    "user_type": "individual"
    }

    #Arrange
    app.dependency_overrides[AccountQueries] = MockAccountQueries

    # Act
    response = client.get('/api/accounts', json=req_body)
    actual = response.json()


    #Assert
    assert response.status_code == 200
    assert actual == [expected_post_response]

    #cleanup
    app.dependency_overrides = {}
