from pydantic import BaseModel
from .pool import pool


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    username: str
    password: str

class AccountOut(BaseModel):
    id: str
    username: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, hashed_password
                    FROM accounts
                    WHERE username = %s
                """,
                    [username],
                )

                record = cur.fetchone()
                print("RECORD", record)
                return AccountOutWithPassword(id=record[0], username=record[1], hashed_password=record[2])



    def create(self, account: AccountIn, hashed_password: str) -> AccountOutWithPassword:

        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO accounts (
                        username,
                        hashed_password

                    )
                    VALUES (%s, %s)
                    RETURNING id
                    """,
                    [
                        account.username,
                        hashed_password

                    ]

                )
                id = result.fetchone()[0]
                print(id)
                old_data = account.dict()
                print("OLD DATA", old_data)
                return AccountOutWithPassword(id=id, hashed_password=hashed_password, **old_data)
