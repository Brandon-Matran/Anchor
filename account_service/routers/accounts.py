# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Optional
from pydantic import BaseModel
from typing import List

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    AccountQueries,
    DuplicateAccountError,
)

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

def get_authenticator():
    return authenticator

@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
    auth = Depends(get_authenticator)
):
    hashed_password = auth.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
        print("ACOUNT", account)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(
        username=info.username,
        password=info.password,
        user_type=info.user_type
        )
    print("FORM", form)
    token = await auth.login(response, request, form, repo)
    print("TOKEN", token)
    return AccountToken(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountQueries = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

@router.get("/api/protected", response_model=bool)
async def get_protected(
  account_data: dict = Depends(authenticator.get_current_account_data),
):
  return True

@router.get("/api/accounts/{id}", response_model=Optional[AccountOut])
def account_detail(
  id: int,
  response: Response,
  # repo: AccountQueries = Depends(authenticator.get_current_account_data),
  account_data: dict = Depends(authenticator.get_current_account_data),
  repo: AccountQueries = Depends(),
) -> AccountOutWithPassword:
  user = repo.get_by_id(id)
  if user is None:
    response.status_code= 404
  return user

@router.get("/api/accounts", response_model=List[AccountOut])
def get_all(
    repo: AccountQueries = Depends(),

):
    return repo.get_all()
