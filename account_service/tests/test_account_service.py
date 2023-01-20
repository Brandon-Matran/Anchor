from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
# from routers.accounts import get_authenticator
from jwtdown_fastapi.authentication import Token


client = TestClient(app)

expected_post_response = {
    "id": "1",
    "username": "test",
    "user_type": "individual",
}

expected_get_response = {
    "id": 1,
    "username": "test",
    "hashed_password": "test",
    "user_type": "individual",
}

# expected_create_response = {
#     "access_token": "asfivuabwoiurbaw3iruabwvknsd",
#     "token_type": "Bearer",
#     "account": {"id": "1", "username": "test", "user_type": "individual"},
# }


class MockAccountQueries:
    def get(self, username):
        pass

    # def create(self, new_account, new_pass):
    #     return expected_post_response

    def get_all(self):
        return [expected_post_response]


class MockAuthenticator:
    def hash_password(self, password):
        return "jaosifpa8u3aw-98fawf"

    async def login(self, response, request, form, repo):
        return Token(access_token="asfivuabwoiurbaw3iruabwvknsd")


def mock_get_authenticator():
    return MockAuthenticator()


def test_get_accounts():

    req_body = {
        "username": "test",
        "password": "test",
        "user_type": "individual",
    }

    # Arrange
    app.dependency_overrides[AccountQueries] = MockAccountQueries

    # Act
    response = client.get("/api/accounts", json=req_body)
    print(response)
    actual = response.json()

    # Assert
    assert response.status_code == 200
    assert actual == [expected_post_response]

    # cleanup
    app.dependency_overrides = {}


# def test_create_accounts():

#     req_body = {
#         "username": "test",
#         "password": "test",
#         "user_type": "individual",
#     }

#     # Arrange
#     app.dependency_overrides[AccountQueries] = MockAccountQueries
#     app.dependency_overrides[get_authenticator] = mock_get_authenticator

#     # Act
#     response = client.post("/api/accounts", json=req_body)
#     actual = response.json()

#     # Assert
#     assert response.status_code == 200
#     assert actual == expected_create_response

#     # cleanup
#     app.dependency_overrides = {}
