import os
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts,
    ):
        pass

    def get_account_getter(
        self,
        accounts,
    ):
        return accounts

    def get_hashed_password(self, account):
        return account["hashed_password"]

    def get_account_data_for_cookie(self, account):
        return account["username"], account


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
