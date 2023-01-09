import { useEffect, useState} from 'react';
import PropTypes from 'prop-types';


// function getToken(credentials) {
//   const url = "http://localhost:8100/token";
//   fetch("http://localhost:8100/token", {
//     credentials: 'include',
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => {
//     console.log(data)
//     data.json()})
// }

async function getToken() {
  const url = "http://localhost:8100/token";
  try{
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
    }
  } catch (e) {}
  return false;
}

function LoginForm({setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   async function getToken() {
  //     const response = await fetch("http://localhost:8100/token");
  //     const data = await response.json();
  //     console.log(data)
  //     setToken(token)
  //   }
  // }, []);


  const handleSubmit = async e => {
    e.preventDefault();
    const token = getToken({
      username,
      password

    });

    setToken(token);
    console.log(token);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            onChange={e=>setUsername(e.target.value)}
            value={username}
            className="form-control"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            onChange={e=>setPassword(e.target.value)}
            value={password}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default LoginForm;
