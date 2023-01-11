steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE listings (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(1000) NOT NULL,
            company_name VARCHAR(1000) NOT NULL,
            job_position VARCHAR(1000) NOT NULL,
            apply_url TEXT NOT NULL,
            deadline DATE NOT NULL,
            created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE listings;
        """
    ],
]
