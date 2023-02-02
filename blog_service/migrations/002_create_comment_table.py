steps = [
    [
        """
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) NOT NULL,
            post_date DATE NOT NULL,
            description TEXT,
            blog_id INTEGER REFERENCES blogs
        );
        """,
        """
        DROP TABLE comments;
        """,
    ]
]
