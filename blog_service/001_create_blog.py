steps = [
    [
        ## Create the table
        """
        CREATE TABLE blogs (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(1000) NOT NULL,
            description TEXT NOT NULL,
            picture_url TEXT NOT NULL
            
        );
        """,
        ## Drop the table
        """
        DROP TABLE blogs;
        """
    ]
]
