import {useEffect, useState} from "react"
import React from "react"


function CreateBlogsForm() {
    const [username, setUserName] = useState('')
    const post_date = new Date().toLocaleString() + ''
    const [title, setTitle] = useState('')
    const [pic_url, setPicURL] = useState('')
    const [description, setDescription] = setState('')
    const [submitted, setSubmitted] = useState(false)

    // useEffect(() => {
    //     const loginURL = 'http://localhost:8100/api/accounts'
    //     fetch(loginURL)
    //     .then(response => {
    //         if(response.ok) {
    //             let data = response.json()
    //             return data
    //         }
    //         throw new Error ("BAD RESPONSE!")
    //     })
    //     .then(data => {setUserName(data.username)})
    //     .catch((err) => console.log(err))
    // }, [])

    const handleTitleChange = (event) => {
        const value = event.target.value
        setName(value);
    }

    const handlePicURLChange = (event) => {
        const value = event.target.value
        setName(value);
    }

    const handleDsptChange = (event) => {
        const value = event.target.value
        setName(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newBlog = {
            "username": username,
            "post_date": post_date,
            "title": title,
            "pic_url": pic_url,
            "description": description
        }

        const blogURL = `${REACT_APP_BLOG_SERVICE}/blogs`
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newBlog),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(blogURL, fetchConfig)
            .then(response => response.json())
            .then(() => {
                setTitle('')
                setPicURL('')
                setDescription('')
                setSubmitted(true)
            })
            .catch(e => console.error('ERROR: ', e))
    }

    let messageClasses = "alert alert-success d-none mb-0"
    if(submitted === true){
        messageClasses = "alert alert-success mb-0"
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Blog</h1>
                    <form onSubmit={handleSubmit} id="create-blog-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleTitleChange} placeholder="Title" required
                            type="text" name ="title" id="title"
                            className="form-control" value={title}/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePicURLChange} placeholder="Picture URL" required
                            type="text" name ="pic_url" id="pic_url"
                            className="form-control" value={pic_url}/>
                            <label htmlFor="pic_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea onChange={handleDsptChange} className="form-control"
                            name="description" id="description" rows="3" value={description} ></textarea>
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
