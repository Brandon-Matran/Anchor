steps = [
    [
        """
        CREATE TABLE blogs (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) NOT NULL,
            post_date DATE NOT NULL,
            title VARCHAR(500) NOT NULL,
            pic_url VARCHAR(1000) NOT NULL,
            description TEXT
        );
        """,
        """
        DROP TABLE blogs;
        """
    ]
]

