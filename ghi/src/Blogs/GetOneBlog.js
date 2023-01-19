import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function GetOneBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  useEffect(()=> {
    const url = `${process.env.REACT_APP_BLOG_SERVICE}/blogs/${id}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBlog(data);
        console.log(data)
      });


  }, []);
  return (
    <>
      {blog ? (
        <div>
          <p>{blog.id}</p>
          <p>{blog.username}</p>
          <p>{blog.title}</p>
          <p>{blog.description}</p>
          <p>{blog.post_date}</p>
          <p>{blog.pic_url}</p>
        </div>
      ) : null}
    </>
  )
}
