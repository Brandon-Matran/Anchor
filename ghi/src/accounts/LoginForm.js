import { useState} from 'react';



function LoginForm() {
  const

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async e => {
    e.preventDefault();
    const token = getToken({
      username,
      password

    });
    console.log(token)

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


export default LoginForm;
