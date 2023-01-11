import {useEffect, useState} from "react"
import React from "react"


function CreateBlogsForm() {
    const [username, setUserName] = useState('')
    const post_date = new Date().toLocaleString() + ''
    const [pic_url, setPicURL] = useState('')
    const [description, setDescription] = setState('')

    useEffect(() => {
        const loginURL = 'http://localhost:8100/api/accounts'
    })

}
