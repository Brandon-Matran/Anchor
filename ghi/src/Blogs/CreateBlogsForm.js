import {useEffect, useState} from "react"
import React from "react"


function CreateBlogsForm() {
    const [username, setUserName] = useState('')
    const post_date = new Date().toLocaleString() + ''
    const [pic_url, setPicURL] = useState('')
    const [description, setDescription] = setState('')

    useEffect(() => {
        const loginURL = 'http://localhost:8100/api/accounts'
        fetch(loginURL)
        .then(response => {
            if(response.ok) {
                let data = response.json()
                return data
            }
            throw new Error ("BAD RESPONSE!")
        })
        .then(data => {setUserName(data.username)})
        .catch((err) => console.log(err))
    }, [])

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Blog</h1>
                    <form onSubmit={handleSubmit} id="create-blog-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} placeholder="Name" required
                            type="text" name ="name" id="name"
                            className="form-control" value={name}/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleAddressChange} placeholder="Address" required
                            type="text" name ="address" id="address"
                            className="form-control" value={address}/>
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePhoneNumberChange} placeholder="Phone Number" required
                            type="number" name ="phone_number" id="phone_number"
                            className="form-control" value={phone_number}/>
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div><br/>
                <div className={messageClasses} id="success-message">
                    Success! New Sales Customer Added!
                </div>
            </div>
        </div>
    );

}
