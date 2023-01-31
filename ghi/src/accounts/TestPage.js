import { useState } from "react";

const TestPage = () => {
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  async function getAccount() {
      const url = `http://localhost:8100/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();

        if (data?.account.user_type === "individual") {

          return true
        }
        else{
          return false
        }
      }
    }




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await getAccount() === true) {
      const url = `{http://localhost:8080/blogs}`;
      const fetchConfig = {
        method: "post",
        body: JSON.stringify({
          username: user,
          post_date: date,
          title: title,
          pic_url: pic,
          description: desc,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(url, fetchConfig)
        .then((response) => response.json())
        .then(() => {
          setUser("");
          setDate("");
          setTitle("");
          setPic("");
          setDesc("");
        });
    } else {
      alert("You are not allowed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                className="form-control"
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="post_date">Date</label>
              <input
                type="post_date"
                className="form-control"
                id="post_date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="title"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pic_url">Picture</label>
              <input
                type="pic_url"
                className="form-control"
                id="pic_url"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="description"
                className="form-control"
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
