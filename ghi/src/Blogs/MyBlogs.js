import { useEffect , useState} from "react";
import React from 'react';

function BlogColumn(props) {
    return (
      <div className="col">
        {props.list.map(data => {
          const conference = data.conference;
          return (
            <div key={conference.href} className="card mb-3 shadow">
              <img src={conference.location.picture_url} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{conference.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {conference.location.name}
                </h6>
                <p className="card-text">
                  {conference.description}
                </p>
              </div>
              <div className="card-footer">
                {new Date(conference.starts).toLocaleDateString()}
                -
                {new Date(conference.ends).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

function MyBlogs(props) {
    const [blogs, setBlogs] = useState([], [], []);

    useEffect(() => {
        const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`
        fetch(url)
        .then(response => {
            if (response.ok) {
                let data = response.json()
                return data
            }
            throw new Error ("BAD RESPONSE!")
        })
        .then(data => {setBlogs(data.blogs)})
    }, [])

    return (
        pass
    )

}
export default MyBlogs
