import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from './Authentication.js';



function LoginForm() {
  const navigate = useNavigate();
  const [token, login] = useToken();




  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async e => {
    login(username, password)
    e.preventDefault();
    // navigate("/test")
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
