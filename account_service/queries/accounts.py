from pydantic import BaseModel

class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str
