import {useEffect, useState} from "react"
import { useAuthContext } from "../accounts/Authentication"
import { useNavigate } from "react-router-dom";

function CreateBlogsForm(props) {

    const [username, setUserName] = useState('')
    let today = new Date()
    let post_date = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate()
    const [title, setTitle] = useState('')
    const [pic_url, setPicURL] = useState('')
    const [description, setDescription] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const { token } = useAuthContext()

    function parseJwt(data) {
        const base64Url = data.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const info = JSON.parse(window.atob(base64));
        setUserName(info.account.username);
    }


    useEffect(() => {
        {
          if (token) {
            parseJwt(token);
          }
        }
      }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      username: username,
      post_date: post_date,
      title: title,
      pic_url: pic_url,
      description: description,
    };

    const blogURL = `${process.env.REACT_APP_BLOG_SERVICE}/blogs`
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(newBlog),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    }

    fetch(blogURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setTitle("");
        setPicURL("");
        setDescription("");
        setSubmitted(true);
      })
      .then(navigate("/blogs/myblogs"))
      .catch((e) => console.error("ERROR: ", e));
  };

  let messageClasses = "alert alert-success d-none mb-0";
  if (submitted === true) {
    messageClasses = "alert alert-success mb-0";
  }

    return (
      <section
      className="vh-100"
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black shadow p-4 mt-4">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Create a New Blog
                  </p>
                  <form onSubmit={handleSubmit} id="create-blog-form">
                    <div className="form-floating mb-3">
                      <input
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="title"
                        placeholder="Blog Title"
                        className="form-control"
                      />
                      <label className="form-label">Title</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        value={pic_url}
                        onChange={(e) => setPicURL(e.target.value)}
                        type="url"
                        placeholder="Enter a Picture URL"
                        className="form-control"
                      ></input>
                      <label className="form-label">Picture URL</label>
                    </div>

                    <div className="form-floating mb-3">
                      <textarea
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="Write a Blog"
                        id="blogDescription"
                        rows="3"
                        style={{height: 300}}
                      ></textarea>
                      <label className="form-label">Description</label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-primary center"
                    >
                      Post New Blog
                    </button>
                  </form>
                </div>
                <br />
                <div className={messageClasses} id="success-message">
                  Success! New Blog Posted!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );

}

export default CreateBlogsForm;
