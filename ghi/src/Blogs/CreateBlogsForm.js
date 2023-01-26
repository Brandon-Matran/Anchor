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
    const [Jwt, setJwt] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate()

    const token = useAuthContext()

    function parseJwt(data) {
        const base64Url = data.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const info = JSON.parse(window.atob(base64));
        setUserName(info.account.username);
    }

    useEffect(() => {
        fetch(token)
        .then(response => {if ((typeof response.token) !== "object") {
            setJwt(token.token);
            if (Jwt !== null) {
                parseJwt(Jwt);
            }
        }})

    }, [token, Jwt])

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
                "Authorization": `Bearer ${Jwt}`
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
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Blog</h1>
                    <form onSubmit={handleSubmit} id="create-blog-form">
                        <div className="form-floating mb-3">
                            <input onChange = {e => setTitle(e.target.value)} placeholder="Write a Blog Title" required
                            type="text" name ="title" id="title"
                            className="form-control" value={title}/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                                <input onChange = {e => setPicURL(e.target.value)} placeholder="Enter a Picture Url"
                                required type="url" name="pic_url"  id="pic_url"
                                className="form-control" value={pic_url}/>
                                <label htmlFor="pic_url">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea onChange={e => setDescription(e.target.value)} className="form-control"
                            id="description" rows="3" value={description} ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div><br/>
                <div className={messageClasses} id="success-message">
                    Success! New Blog Posted!
                </div>
            </div>
        </div>
    );

}

export default CreateBlogsForm;
