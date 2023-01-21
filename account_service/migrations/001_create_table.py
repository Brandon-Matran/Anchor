steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(1000) UNIQUE NOT NULL,
            hashed_password TEXT NOT NULL,
            user_type varchar(20) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ]
]
