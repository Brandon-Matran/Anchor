import { Navigate } from "react-router";
import { useToken } from "./Authentication";

function Logout(props) {
  const [token, login, logout, signup] = useToken();

  if (!token) {
    return <Navigate to="/login" />
  }
  return (
    <button onClick={() => logout()} class="btn btn-primary" type="submit">
      Logout
    </button>
  );
}

export default Logout;
